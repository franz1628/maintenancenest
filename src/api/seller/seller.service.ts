import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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

  async findAll() {
    return this.prisma.seller.findMany({
      include: { document_type: true },
    });
  }

  async findOne(id: number) {
    const model = await this.prisma.seller.findUnique({ where: { id }, include: { document_type: true } });

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
    
        if(update.password === '') {
          delete update.password;
        }
    
        if (update.password) {
          const passwordHash = await bcrypt.hash(update.password, 10);
          update.password = passwordHash;
        }

        return this.prisma.seller.update({ where: { id }, data: { ...update, birth_date: new Date(update?.birth_date || '') }  });
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
