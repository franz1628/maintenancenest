import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ModelService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateModelDto) {
      const model = await this.findByNameAndBrand(create.name, create.id_brand);
      if(model!=null){
        throw new ConflictException('Model name already in use for this brand');
      }
      return this.prisma.model.create({ data: { ...create } });
  }

  findAll() {
     return this.prisma.model.findMany();
  }

  async findOne(id: number) {
    const model = await this.prisma.model.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('Model not found');
    }
    return model;
  }

  async update(id: number, update: UpdateModelDto) {
    await this.findOne(id);

    if (update.name) {
      const model = await this.findByNameAndBrand(update.name, update.id_brand);
      if (model && model.id !== id) {
        throw new ConflictException('Model name already in use for this brand');
      }
    }

    return this.prisma.model.update({ where: { id }, data: update });
  }
  
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.model.update({ where: { id }, data: { state: 0 } });
  }

  async findByNameAndBrand(name?: string, id_brand?: number) {
    return this.prisma.model.findFirst({
      where: {
        name,
        id_brand
      }
    });
  }
}
