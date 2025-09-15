import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceDetailService } from './service_detail.service';
import { CreateServiceDetailDto } from './dto/create-service_detail.dto';
import { UpdateServiceDetailDto } from './dto/update-service_detail.dto';

@Controller('service-detail')
export class ServiceDetailController {
  constructor(private readonly serviceDetailService: ServiceDetailService) {}

  @Post()
  create(@Body() createServiceDetailDto: CreateServiceDetailDto) {
    return this.serviceDetailService.create(createServiceDetailDto);
  }

  @Get()
  findAll() {
    return this.serviceDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDetailDto: UpdateServiceDetailDto) {
    return this.serviceDetailService.update(+id, updateServiceDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceDetailService.remove(+id);
  }
}
