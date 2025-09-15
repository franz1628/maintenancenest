import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDetailDto } from './dto/create-service_detail.dto';
import { UpdateServiceDetailDto } from './dto/update-service_detail.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ServiceDetailService {
constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateServiceDetailDto) {
    await this.validService(create.id_service);
    await this.validServiceDetailCatalog(create.id_service_detail_catalog);
    if(create.id_mecanic){
      await this.validMecanic(create.id_mecanic);
    }

    return this.prisma.service_detail.create({ data: { ...create } });
  }

  findAll() {
    return this.prisma.service_detail.findMany({
      where: { state: 1 }
    });
  }

  async findOne(id: number) {
    const model = await this.prisma.service_detail.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('Service detail not found');
    }
    return model;
  }

  async update(id: number, update: UpdateServiceDetailDto) {
    await this.findOne(id);

    if(update.id_service){
      await this.validService(update.id_service);
    }
    if(update.id_service_detail_catalog){
      await this.validServiceDetailCatalog(update.id_service_detail_catalog);
    }
    if(update.id_mecanic){
      await this.validMecanic(update.id_mecanic);
    }

    return this.prisma.service_detail.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.service_detail.update({ where: { id }, data: { state: 0 } });
  }

  async validService(id_service: number) {
    const service = await this.prisma.service.findFirst({
      where: {
        id: id_service,
        state: 1
      }
    });
    if (!service) {
      throw new NotFoundException('Service not found or inactive');
    }
  }

  async validServiceDetailCatalog(id_service_detail_catalog: number) {
    const serviceDetailCatalog = await this.prisma.service_detail.findFirst({
      where: {
        id: id_service_detail_catalog,
        state: 1
      }
    });
    if (!serviceDetailCatalog) {
      throw new NotFoundException('Service detail catalog not found or inactive');
    }
  }

  async validMecanic(id_mecanic: number) {
    const mecanic = await this.prisma.mecanic.findFirst({
      where: {
        id: id_mecanic,
        state: 1
      }
    });
    if (!mecanic) {
      throw new NotFoundException('Mecanic not found or inactive');
    }
  }

}
