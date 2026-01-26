import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  create(@Body() dto: CreateModuleDto) {
    return this.modulesService.create(dto);
  }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }
}
