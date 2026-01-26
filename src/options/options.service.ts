import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OptionsService {
  constructor(private prisma: PrismaService) {}

  create(data: { text: string; isCorrect: boolean; questionId: number }) {
    return this.prisma.option.create({ data });
  }

  findAll() {
    return this.prisma.option.findMany();
  }

  findByQuestion(questionId: number) {
    return this.prisma.option.findMany({
      where: { questionId },
    });
  }
  
}
