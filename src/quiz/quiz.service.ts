import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        courseId: dto.courseId,
      },
    });
  }

  async submit(quizId: number, dto: SubmitQuizDto) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      throw new BadRequestException('Quiz not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!dto.answers || dto.answers.length === 0) {
      throw new BadRequestException('At least one answer is required');
    }

    let score = 0;

    for (const answer of dto.answers) {
      const option = await this.prisma.option.findUnique({
        where: { id: answer.optionId },
      });

      if (option?.isCorrect) {
        score++;
      }
    }

    const result = await this.prisma.quizResult.upsert({
      where: {
        quizId_userId: {
          quizId: quizId,
          userId: dto.userId,
        },
      },
      update: {
        score,
        total: dto.answers.length,
      } as any,
      create: {
        quizId: quizId,
        userId: dto.userId,
        score,
        total: dto.answers.length,
      } as any,
    });

    // Calculer le pourcentage
    const percentage = (score / dto.answers.length) * 100;

    return {
      score,
      total: dto.answers.length,
      percentage,
      createdAt: result.createdAt,
    };
  }

  async getResults(quizId: number) {
    return this.prisma.quizResult.findMany({
      where: { quizId },
      orderBy: { id: 'desc' },
      include: {
        user: true,
      },
    });
  }

  async getResultsByUser(userId: number) {
    return this.prisma.quizResult.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
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
    });
  }

  findAll() {
    return this.prisma.quiz.findMany({
      include: { course: true },
    });
  }

  findByCourse(courseId: number) {
    return this.prisma.quiz.findMany({
      where: { courseId },
    });
  }

  findOne(id: number) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: {
              select: {
                id: true,
                text: true,
              },
            },
          },
        },
      },
    });
  }
}
