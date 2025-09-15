import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceDetailCatalogService } from './service_detail_catalog.service';
import { CreateServiceDetailCatalogDto } from './dto/create-service_detail_catalog.dto';
import { UpdateServiceDetailCatalogDto } from './dto/update-service_detail_catalog.dto';

@Controller('service-detail-catalog')
export class ServiceDetailCatalogController {
  constructor(private readonly serviceDetailCatalogService: ServiceDetailCatalogService) {}

  @Post()
  create(@Body() createServiceDetailCatalogDto: CreateServiceDetailCatalogDto) {
    return this.serviceDetailCatalogService.create(createServiceDetailCatalogDto);
  }

  @Get()
  findAll() {
    return this.serviceDetailCatalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceDetailCatalogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDetailCatalogDto: UpdateServiceDetailCatalogDto) {
    return this.serviceDetailCatalogService.update(+id, updateServiceDetailCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceDetailCatalogService.remove(+id);
  }
}
