import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          email: dto.email,
          password: dto.password,
          name: dto.name,
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

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { id: 'asc' },
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

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
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

  async getStats() {
    const totalUsers = await this.prisma.user.count();
    const activeUsers = await this.prisma.user.count({
      where: { isActive: true },
    });
    const adminUsers = await this.prisma.user.count({
      where: { role: 'ADMIN' },
    });
    const studentUsers = await this.prisma.user.count({
      where: { role: 'STUDENT' },
    });

    const totalQuizResults = await this.prisma.quizResult.count();
    const averageScore = await this.prisma.quizResult.aggregate({
      _avg: {
        score: true,
      },
    });

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
        averageScore: averageScore._avg.score || 0,
      },
    };
  }
}
