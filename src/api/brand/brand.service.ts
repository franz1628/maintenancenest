import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateBrandDto) {
      const model = await this.findByName(create.name);
      if(model!=null){
        throw new ConflictException('Brand name already in use');
      }
      return this.prisma.brand.create({ data: { ...create } });
  }

  findAll() {
    return this.prisma.brand.findMany({
      where: { state: 1 }
    });
  }

  async findOne(id: number) {
    const model = await this.prisma.brand.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('Brand not found');
    }
    return model;
  }

  async update(id: number, update: UpdateBrandDto) {
    await this.findOne(id);

    if (update.name) {
      const model = await this.findByName(update.name);
      if (model && model.id !== id) {
        throw new ConflictException('Brand name already in use');
      }
    }

    return this.prisma.brand.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.brand.update({ where: { id }, data: { state: 0 } });
  }

  async findByName(name?: string) {
    return this.prisma.brand.findFirst({
      where: {
        name
      }
    });
  }
}
