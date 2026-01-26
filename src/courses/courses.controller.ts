import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('module/:id')
  findByModule(@Param('id') id: string) {
    return this.coursesService.findByModule(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(Number(id));
  }
}
