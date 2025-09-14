import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MecanicService } from './mecanic.service';
import { CreateMecanicDto } from './dto/create-mecanic.dto';
import { UpdateMecanicDto } from './dto/update-mecanic.dto';

@Controller('mecanic')
export class MecanicController {
  constructor(private readonly mecanicService: MecanicService) {}

  @Post()
  create(@Body() createMecanicDto: CreateMecanicDto) {
    return this.mecanicService.create(createMecanicDto);
  }

  @Get()
  findAll() {
    return this.mecanicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mecanicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMecanicDto: UpdateMecanicDto) {
    return this.mecanicService.update(+id, updateMecanicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mecanicService.remove(+id);
  }
}
