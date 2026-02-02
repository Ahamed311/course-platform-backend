import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      return await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          role: dto.role || 'STUDENT',
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
        },
      });
    } catch (e: unknown) {
      const msg = e && typeof e === 'object' && 'code' in e && (e as { code: string }).code === 'P2002'
        ? 'Email already exists'
        : 'Could not create user';
      throw new BadRequestException(msg);
    }
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(query?: any) {
    const { search, role, status, page = 1, limit = 10 } = query || {};
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (role) {
      where.role = role;
    }
    
    if (status !== undefined) {
      where.isActive = status === 'active';
    }

    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: {
              quizResults: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: {
            quizResults: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserQuizResults(id: number) {
    return this.prisma.quizResult.findMany({
      where: { userId: id },
      include: {
        quiz: {
          include: {
            course: {
              include: {
                module: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateUserStatus(id: number, isActive: boolean) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    });
  }

  async updateRole(id: number, role: string) {
    if (!['STUDENT', 'ADMIN'].includes(role)) {
      throw new BadRequestException('Invalid role');
    }

    return this.prisma.user.update({
      where: { id },
      data: { role: role as any },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    });
  }

  async update(id: number, updateData: any) {
    const { password, ...data } = updateData;
    
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async remove(id: number) {
    // First delete related quiz results
    await this.prisma.quizResult.deleteMany({
      where: { userId: id },
    });

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async resetUserProgress(id: number) {
    return this.prisma.quizResult.deleteMany({
      where: { userId: id },
    });
  }

  async getStats() {
    const [
      totalUsers,
      activeUsers,
      adminUsers,
      studentUsers,
      totalQuizResults,
      averageScore,
      recentUsers,
      topPerformers,
      moduleStats,
      dailyStats,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.user.count({ where: { role: 'ADMIN' } }),
      this.prisma.user.count({ where: { role: 'STUDENT' } }),
      this.prisma.quizResult.count(),
      this.prisma.quizResult.aggregate({ _avg: { score: true } }),
      this.prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          role: true,
        },
      }),
      this.prisma.quizResult.groupBy({
        by: ['userId'],
        _avg: { score: true },
        _count: { id: true },
        orderBy: { _avg: { score: 'desc' } },
        take: 5,
      }),
      this.prisma.quizResult.groupBy({
        by: ['quizId'],
        _count: { id: true },
        _avg: { score: true },
      }),
      this.prisma.user.groupBy({
        by: ['createdAt'],
        _count: { id: true },
        orderBy: { createdAt: 'desc' },
        take: 7,
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
        admins: adminUsers,
        students: studentUsers,
      },
      quiz: {
        totalResults: totalQuizResults,
        averageScore: Math.round((averageScore._avg.score || 0) * 100) / 100,
      },
      recent: {
        users: recentUsers,
      },
      performance: {
        topPerformers,
        moduleStats,
      },
      analytics: {
        dailyRegistrations: dailyStats,
      },
    };
  }

  async getDetailedStats() {
    const [
      usersByRole,
      usersByStatus,
      quizResultsByModule,
      averageScoreByModule,
      userActivity,
    ] = await Promise.all([
      this.prisma.user.groupBy({
        by: ['role'],
        _count: { id: true },
      }),
      this.prisma.user.groupBy({
        by: ['isActive'],
        _count: { id: true },
      }),
      this.prisma.quizResult.groupBy({
        by: ['quizId'],
        _count: { id: true },
      }),
      this.prisma.quizResult.groupBy({
        by: ['quizId'],
        _avg: { score: true },
      }),
      this.prisma.quizResult.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true },
          },
          quiz: {
            include: {
              course: {
                include: { module: true },
              },
            },
          },
        },
      }),
    ]);

    return {
      usersByRole,
      usersByStatus,
      quizResultsByModule,
      averageScoreByModule,
      userActivity,
    };
  }
}
