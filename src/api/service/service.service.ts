import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ServiceService {
constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateServiceDto) {
    await this.validVehicle(create.id_vehicle);
    await this.validUser(create.id_user);
    await this.validServiceCatalog(create.id_service_catalog);
    await this.validSeller(create.id_seller);
    
    return this.prisma.service_detail_catalog.create({ data: { ...create } });
  }

  findAll() {
    return this.prisma.service_detail_catalog.findMany({
      where: { state: 1 }
    });
  }

  async findOne(id: number) {
    const model = await this.prisma.service_detail_catalog.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('Service detail not found');
    }
    return model;
  }

  async update(id: number, update: UpdateServiceDto) {
    await this.findOne(id);

    if(update.id_vehicle){
      await this.validVehicle(update.id_vehicle);
    }

    if(update.id_user){
      await this.validUser(update.id_user);
    }

    if(update.id_service_catalog){
      await this.validServiceCatalog(update.id_service_catalog);
    }

    if(update.id_seller){
      await this.validSeller(update.id_seller);
    }
    return this.prisma.service_detail_catalog.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.service_detail_catalog.update({ where: { id }, data: { state: 0 } });
  }

  async validVehicle(id_vehicle: number) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: id_vehicle,
        state: 1
      }
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found or inactive');
    }
  }

  async validUser(id_user: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id_user,
        state: 1
      }
    });
    if (!user) {
      throw new NotFoundException('User not found or inactive');
    }
  }

  async validServiceCatalog(id_service_catalog: number) {
    const serviceCatalog = await this.prisma.service_catalog.findFirst({
      where: {
        id: id_service_catalog,
        state: 1
      }
    });
    if (!serviceCatalog) {
      throw new NotFoundException('Service catalog not found or inactive');
    }
  }

  async validSeller(id_seller: number) {
    const seller = await this.prisma.seller.findFirst({
      where: {
        id: id_seller,
        state: 1
      }
    });
    if (!seller) {
      throw new NotFoundException('Seller not found or inactive');
    }
  }

  

}
