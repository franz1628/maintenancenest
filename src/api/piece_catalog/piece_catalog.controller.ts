import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PieceCatalogService } from './piece_catalog.service';
import { CreatePieceCatalogDto } from './dto/create-piece_catalog.dto';
import { UpdatePieceCatalogDto } from './dto/update-piece_catalog.dto';

@Controller('piece-catalog')
export class PieceCatalogController {
  constructor(private readonly pieceCatalogService: PieceCatalogService) {}

  @Post()
  create(@Body() createPieceCatalogDto: CreatePieceCatalogDto) {
    return this.pieceCatalogService.create(createPieceCatalogDto);
  }

  @Get()
  findAll() {
    return this.pieceCatalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pieceCatalogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePieceCatalogDto: UpdatePieceCatalogDto) {
    return this.pieceCatalogService.update(+id, updatePieceCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pieceCatalogService.remove(+id);
  }
}
