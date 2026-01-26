import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.questionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get('quiz/:id')
findByQuiz(@Param('id') id: string) {
  return this.questionsService.findByQuiz(Number(id));
}

}
