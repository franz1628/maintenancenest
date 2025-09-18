import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDocumentDto } from './dto/create-type_document.dto';
import { UpdateTypeDocumentDto } from './dto/update-type_document.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TypeDocumentService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateTypeDocumentDto) {
    const model = await this.findByName(create.name);
    if(model!=null){
      throw new ConflictException('Type document name already in use');
    }
    return this.prisma.type_document.create({ data: { ...create } });
  }

  findAll() {
    return this.prisma.type_document.findMany();
  }

  async findOne(id: number) {
    const model = await this.prisma.type_document.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('Type document not found');
    }
    return model;
  }

  async update(id: number, update: UpdateTypeDocumentDto) {
    await this.findOne(id);

    if (update.name) {
      const model = await this.findByName(update.name);
      if (model && model.id !== id) {
        throw new ConflictException('Type document name already in use');
      }
    }

    return this.prisma.type_document.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.type_document.update({ where: { id }, data: { state: 0 } });
  }

  async findByName(name?: string) {
    return this.prisma.type_document.findFirst({
      where: {
        name
      }
    });
  }
}
