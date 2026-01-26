import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { text: string; quizId: number }) {
    try {
      return await this.prisma.question.create({
        data: {
          text: data.text,
          quizId: data.quizId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prisma.question.findMany({
      include: { quiz: true },
    });
  }

  findByQuiz(quizId: number) {
    return this.prisma.question.findMany({
      where: { quizId },
    });
  }
}
