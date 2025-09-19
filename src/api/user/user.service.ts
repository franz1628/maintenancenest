import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateUserDto) {
    const model = await this.findByEmailOrNumberDocument(create.email, create.number_document);
    if(model!=null){
      throw new ConflictException('Email or Number Document already in use');
    }
    const passwordHash = await bcrypt.hash(create.password, 10);
    create.password = passwordHash;
    return this.prisma.user.create({ data: { ...create, birth_date: new Date(create.birth_date) } });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { document_type: true },
    });
  }

  async findOne(id: number) {
    const model = await this.prisma.user.findUnique({ where: { id }, include: { document_type: true } });

    if (!model) {
      throw new NotFoundException('User not found');
    }
    return model;
  }

  async update(id: number, update: UpdateUserDto) {
    await this.findOne(id);

    if (update.email || update.number_document) {
      const model = await this.findByEmailOrNumberDocument(update.email, update.number_document);
      if (model && model.id !== id) {
        throw new ConflictException('Email or Number Document already in use');
      }
    }

    if (update.password) {
      const passwordHash = await bcrypt.hash(update.password, 10);
      update.password = passwordHash;
    }

    return this.prisma.user.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.update({ where: { id }, data: { state: 0 } });
  }

  async findByEmailOrNumberDocument(email?: string, number_document?: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { number_document }
        ]
      }
    });
  }
}
