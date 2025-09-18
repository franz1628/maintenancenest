import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DocumentTypeService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateDocumentTypeDto) {
    const model = await this.findByName(create.name);
    if(model!=null){
      throw new ConflictException('Document type name already in use');
    }
    return this.prisma.document_type.create({ data: { ...create } });
  }

  findAll() {
    return this.prisma.document_type.findMany();
  }

  async findOne(id: number) {
    const model = await this.prisma.document_type.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('Document type not found');
    }
    return model;
  }

  async update(id: number, update: UpdateDocumentTypeDto) {
    await this.findOne(id);

    if (update.name) {
      const model = await this.findByName(update.name);
      if (model && model.id !== id) {
        throw new ConflictException('Document type name already in use');
      }
    }

    return this.prisma.document_type.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.document_type.update({ where: { id }, data: { state: 0 } });
  }

  async findByName(name?: string) {
    return this.prisma.document_type.findFirst({
      where: {
        name
      }
    });
  }
}
