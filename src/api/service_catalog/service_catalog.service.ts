import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateServiceCatalogDto } from './dto/create-service_catalog.dto';
import { UpdateServiceCatalogDto } from './dto/update-service_catalog.dto';

@Injectable()
export class ServiceCatalogService {
  constructor(private readonly prisma: PrismaService) {
      this.prisma = prisma;
    }
  
    async create(create: CreateServiceCatalogDto) {
      const model = await this.findByName(create.name);
      if(model!=null){
        throw new ConflictException('Service name already in use');
      }
      return this.prisma.service_catalog.create({ data: { ...create } });
    }
  
    findAll() {
      return this.prisma.service_catalog.findMany({
        where: { state: 1 }
      });
    }
  
    async findOne(id: number) {
      const model = await this.prisma.service_catalog.findUnique({ where: { id } });
  
      if (!model) {
        throw new NotFoundException('Service not found');
      }
      return model;
    }
  
    async update(id: number, update: UpdateServiceCatalogDto) {
      await this.findOne(id);
  
      if (update.name) {
        const model = await this.findByName(update.name);
        if (model && model.id !== id) {
          throw new ConflictException('Service name already in use');
        }
      }
  
      return this.prisma.service_catalog.update({ where: { id }, data: update });
    }
  
    async remove(id: number) {
      await this.findOne(id);
  
      return this.prisma.service_catalog.update({ where: { id }, data: { state: 0 } });
    }
  
    async findByName(name?: string) {
      return this.prisma.service_catalog.findFirst({
        where: {
          name
        }
      });
    }
}
