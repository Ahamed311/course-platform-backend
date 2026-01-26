import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ModulesModule } from './modules/modules.module';
import { CoursesModule } from './courses/courses.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionsModule } from './questions/questions.module';
import { OptionsModule } from './options/options.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ModulesModule,
    CoursesModule,
    QuizModule,
    QuestionsModule,
    OptionsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
