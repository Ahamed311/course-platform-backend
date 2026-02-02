import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDebugInfo() {
    try {
      const userCount = await this.prisma.user.count();
      const moduleCount = await this.prisma.module.count();
      const courseCount = await this.prisma.course.count();
      const quizCount = await this.prisma.quiz.count();

      // Récupérer quelques utilisateurs pour debug
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
        },
        take: 5,
      });

      return {
        database: {
          connected: true,
          users: userCount,
          modules: moduleCount,
          courses: courseCount,
          quizzes: quizCount,
        },
        sampleUsers: users,
        environment: {
          nodeEnv: process.env.NODE_ENV,
          port: process.env.PORT,
          hasJwtSecret: !!process.env.JWT_SECRET,
          corsOrigins: process.env.CORS_ORIGINS,
        },
      };
    } catch (error) {
      return {
        database: {
          connected: false,
          error: error.message,
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          port: process.env.PORT,
          hasJwtSecret: !!process.env.JWT_SECRET,
        },
      };
    }
  }
}
