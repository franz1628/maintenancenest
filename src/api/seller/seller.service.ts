import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SellerService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateSellerDto) {
    const model = await this.findByEmailOrNumberDocument(create.email, create.number_document);
    if(model!=null){
      throw new ConflictException('Email or Number Document already in use');
    }
    return this.prisma.seller.create({ data: { ...create, birth_date: new Date(create.birth_date) } });
  }

  findAll() {
    return this.prisma.seller.findMany();
  }

  async findOne(id: number) {
    const model = await this.prisma.seller.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('User not found');
    }
    return model;
  }

  async update(id: number, update: UpdateSellerDto) {
    await this.findOne(id);

    if (update.email || update.number_document) {
      const model = await this.findByEmailOrNumberDocument(update.email, update.number_document);
      if (model && model.id !== id) {
        throw new ConflictException('Email or Number Document already in use');
      }
    }

    return this.prisma.seller.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.seller.update({ where: { id }, data: { state: 0 } });
  }

  async findByEmailOrNumberDocument(email?: string, number_document?: string) {
    return this.prisma.seller.findFirst({
      where: {
        OR: [
          { email },
          { number_document }
        ]
      }
    });
  }
}
