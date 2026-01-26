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
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prisma.course.findMany({
      include: { module: true },
    });
  }

  findByModule(moduleId: number) {
    return this.prisma.course.findMany({
      where: { moduleId },
    });
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: { module: true },
    });
  }
}
