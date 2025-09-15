import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceCatalogService } from './service_catalog.service';
import { CreateServiceCatalogDto } from './dto/create-service_catalog.dto';
import { UpdateServiceCatalogDto } from './dto/update-service_catalog.dto';

@Controller('service-catalog')
export class ServiceCatalogController {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {}

  @Post()
  create(@Body() createServiceCatalogDto: CreateServiceCatalogDto) {
    return this.serviceCatalogService.create(createServiceCatalogDto);
  }

  @Get()
  findAll() {
    return this.serviceCatalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceCatalogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceCatalogDto: UpdateServiceCatalogDto) {
    return this.serviceCatalogService.update(+id, updateServiceCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceCatalogService.remove(+id);
  }
}
