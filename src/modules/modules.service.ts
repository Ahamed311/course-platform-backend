// src/modules/modules.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string }) {
  return this.prisma.module.create({
    data: {
      title: data.title
    }
  })
}


  async findAll() {
    return this.prisma.module.findMany();
  }
}
