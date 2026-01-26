import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  create(@Body() dto: CreateOptionDto) {
    return this.optionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.optionsService.findAll();
  }

  @Get('question/:id')
  findByQuestion(@Param('id') id: string) {
    return this.optionsService.findByQuestion(Number(id));
  }
}
