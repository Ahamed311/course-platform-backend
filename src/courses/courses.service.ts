import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { title: string; content: string; moduleId: number }) {
    try {
      return await this.prisma.course.create({
        data: {
          title: data.title,
          content: data.content,
          moduleId: data.moduleId,
        },
        include: { module: true }
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prisma.course.findMany({
      include: { 
        module: true,
        quizzes: true
      },
    });
  }

  findByModule(moduleId: number) {
    return this.prisma.course.findMany({
      where: { moduleId },
      include: { 
        module: true,
        quizzes: true
      },
    });
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: { 
        module: true,
        quizzes: true
      },
    });
  }

  async update(id: number, data: { title?: string; content?: string; moduleId?: number }) {
    return this.prisma.course.update({
      where: { id },
      data,
      include: { module: true }
    });
  }

  async remove(id: number) {
    // First delete related quiz and their questions/options
    const quiz = await this.prisma.quiz.findMany({
      where: { courseId: id }
    });

    for (const q of quiz) {
      await this.prisma.option.deleteMany({
        where: {
          question: {
            quizId: q.id
          }
        }
      });
      
      await this.prisma.question.deleteMany({
        where: { quizId: q.id }
      });
    }

    await this.prisma.quiz.deleteMany({
      where: { courseId: id }
    });

    return this.prisma.course.delete({
      where: { id }
    });
  }
}
