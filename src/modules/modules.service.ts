// src/modules/modules.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; description?: string }) {
    return this.prisma.module.create({
      data: {
        title: data.title,
        description: data.description
      }
    });
  }

  async findAll() {
    return this.prisma.module.findMany({
      include: {
        courses: {
          include: {
            quizzes: true
          }
        },
        _count: {
          select: {
            courses: true
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.module.findUnique({
      where: { id },
      include: {
        courses: {
          include: {
            quizzes: true
          }
        }
      }
    });
  }

  async getModuleCourses(id: number) {
    return this.prisma.course.findMany({
      where: { moduleId: id },
      include: {
        quizzes: {
          include: {
            _count: {
              select: {
                questions: true
              }
            }
          }
        }
      }
    });
  }

  async getModuleStats(id: number) {
    const [
      module,
      coursesCount,
      quizCount,
      totalQuestions,
      quizResults,
      averageScore
    ] = await Promise.all([
      this.prisma.module.findUnique({
        where: { id },
        select: { title: true, description: true }
      }),
      this.prisma.course.count({
        where: { moduleId: id }
      }),
      this.prisma.quiz.count({
        where: {
          course: { moduleId: id }
        }
      }),
      this.prisma.question.count({
        where: {
          quiz: {
            course: { moduleId: id }
          }
        }
      }),
      this.prisma.quizResult.count({
        where: {
          quiz: {
            course: { moduleId: id }
          }
        }
      }),
      this.prisma.quizResult.aggregate({
        where: {
          quiz: {
            course: { moduleId: id }
          }
        },
        _avg: {
          score: true
        }
      })
    ]);

    return {
      module,
      stats: {
        courses: coursesCount,
        quiz: quizCount,
        questions: totalQuestions,
        attempts: quizResults,
        averageScore: Math.round((averageScore._avg?.score || 0) * 100) / 100
      }
    };
  }

  async update(id: number, data: { title?: string; description?: string }) {
    return this.prisma.module.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    // First delete related quiz results
    await this.prisma.quizResult.deleteMany({
      where: {
        quiz: {
          course: {
            moduleId: id
          }
        }
      }
    });

    // Delete options
    await this.prisma.option.deleteMany({
      where: {
        question: {
          quiz: {
            course: {
              moduleId: id
            }
          }
        }
      }
    });

    // Delete questions
    await this.prisma.question.deleteMany({
      where: {
        quiz: {
          course: {
            moduleId: id
          }
        }
      }
    });
    
    // Delete quiz
    await this.prisma.quiz.deleteMany({
      where: {
        course: {
          moduleId: id
        }
      }
    });
    
    // Delete courses
    await this.prisma.course.deleteMany({
      where: { moduleId: id }
    });

    // Finally delete the module
    return this.prisma.module.delete({
      where: { id }
    });
  }
}
