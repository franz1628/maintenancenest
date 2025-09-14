import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePieceCatalogDto } from './dto/create-piece_catalog.dto';
import { UpdatePieceCatalogDto } from './dto/update-piece_catalog.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PieceCatalogService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreatePieceCatalogDto) {
    const model = await this.findByName(create.name);
    if (model != null) {
      throw new ConflictException('Piece Catalog name already in use');
    }
    return this.prisma.piece_catalog.create({ data: { ...create } });
  }

  findAll() {
    return this.prisma.piece_catalog.findMany({
      where: { state: 1 }
    });
  }

  async findOne(id: number) {
    const model = await this.prisma.piece_catalog.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('Piece Catalog not found');
    }
    return model;
  }

  async update(id: number, update: UpdatePieceCatalogDto) {
    await this.findOne(id);

    if (update.name) {
      const model = await this.findByName(update.name);
      if (model && model.id !== id) {
        throw new ConflictException('Piece Catalog name already in use');
      }
    }

    return this.prisma.piece_catalog.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.piece_catalog.update({ where: { id }, data: { state: 0 } });
  }

  async findByName(name?: string) {
    return this.prisma.piece_catalog.findFirst({
      where: {
        name,
      },
    });
  }
}
