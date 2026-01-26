import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(@Body() dto: CreateQuizDto) {
    return this.quizService.create(dto);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get('course/:id')
  findByCourse(@Param('id') id: string) {
    return this.quizService.findByCourse(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(Number(id));
  }
  @Get(':id/results')
  getResults(@Param('id') id: string) {
    return this.quizService.getResults(Number(id));
  }

  @Get('results/user/:id')
  getResultsByUser(@Param('id') id: string) {
    return this.quizService.getResultsByUser(Number(id));
  }

  @Post(':id/submit')
  submit(@Param('id') id: string, @Body() dto: SubmitQuizDto) {
    return this.quizService.submit(Number(id), dto);
  }
}
