import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmailOrNumberDocument(createUserDto.email, createUserDto.number_document);
    if(user!=null){
      //un error que lleve al filter que no sea NotFoundException
      throw new ConflictException('Email or Number Document already in use');
    }
    return this.prisma.user.create({ data: { ...createUserDto, birth_date: new Date(createUserDto.birth_date) } });
  }

  findAll() {
    return this.prisma.user.findMany({
      where: { state: 1 }
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.email || updateUserDto.number_document) {
      const user = await this.findByEmailOrNumberDocument(updateUserDto.email, updateUserDto.number_document);
      if (user && user.id !== id) {
        throw new ConflictException('Email or Number Document already in use');
      }
    }

    return this.prisma.user.update({ where: { id }, data: updateUserDto });
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
