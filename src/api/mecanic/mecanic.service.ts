import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMecanicDto } from './dto/create-mecanic.dto';
import { UpdateMecanicDto } from './dto/update-mecanic.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MecanicService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateMecanicDto) {
    const model = await this.findByEmailOrNumberDocument(create.email, create.number_document);
    if(model!=null){
      throw new ConflictException('Email or Number Document already in use');
    }
    return this.prisma.mecanic.create({ data: { ...create, birth_date: new Date(create.birth_date) } });
  }

  findAll() {
    return this.prisma.mecanic.findMany({
      where: { state: 1 }
    });
  }

  async findOne(id: number) {
    const model = await this.prisma.mecanic.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('Mecanic not found');
    }
    return model;
  }

  async update(id: number, update: UpdateMecanicDto) {
    await this.findOne(id);

    if (update.email || update.number_document) {
      const model = await this.findByEmailOrNumberDocument(update.email, update.number_document);
      if (model && model.id !== id) {
        throw new ConflictException('Email or Number Document already in use');
      }
    }

    return this.prisma.mecanic.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.mecanic.update({ where: { id }, data: { state: 0 } });
  }

  async findByEmailOrNumberDocument(email?: string, number_document?: string) {
    return this.prisma.mecanic.findFirst({
      where: {
        OR: [
          { email },
          { number_document }
        ]
      }
    });
  }
}
