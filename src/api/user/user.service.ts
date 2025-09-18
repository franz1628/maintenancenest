import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

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
    return this.prisma.user.create({ data: { ...create, birth_date: new Date(create.birth_date) } });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const model = await this.prisma.user.findUnique({ where: { id } });

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
