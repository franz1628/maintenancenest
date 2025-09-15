import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToolCatalogService } from './tool_catalog.service';
import { CreateToolCatalogDto } from './dto/create-tool_catalog.dto';
import { UpdateToolCatalogDto } from './dto/update-tool_catalog.dto';

@Controller('tool-catalog')
export class ToolCatalogController {
  constructor(private readonly toolCatalogService: ToolCatalogService) {}

  @Post()
  create(@Body() createToolCatalogDto: CreateToolCatalogDto) {
    return this.toolCatalogService.create(createToolCatalogDto);
  }

  @Get()
  findAll() {
    return this.toolCatalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolCatalogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToolCatalogDto: UpdateToolCatalogDto) {
    return this.toolCatalogService.update(+id, updateToolCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toolCatalogService.remove(+id);
  }
}
