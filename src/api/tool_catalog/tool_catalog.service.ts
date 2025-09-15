import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateToolCatalogDto } from './dto/create-tool_catalog.dto';
import { UpdateToolCatalogDto } from './dto/update-tool_catalog.dto';

@Injectable()
export class ToolCatalogService {
constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateToolCatalogDto) {
    const model = await this.findByName(create.name);
    if(model!=null){
      throw new ConflictException('Tool name already in use');
    }
    return this.prisma.tool_catalog.create({ data: { ...create } });
  }

  findAll() {
    return this.prisma.tool_catalog.findMany({
      where: { state: 1 }
    });
  }

  async findOne(id: number) {
    const model = await this.prisma.tool_catalog.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('Tool not found');
    }
    return model;
  }

  async update(id: number, update: UpdateToolCatalogDto) {
    await this.findOne(id);

    if (update.name) {
      const model = await this.findByName(update.name);
      if (model && model.id !== id) {
        throw new ConflictException('Tool name already in use');
      }
    }

    return this.prisma.tool_catalog.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.tool_catalog.update({ where: { id }, data: { state: 0 } });
  }

  async findByName(name?: string) {
    return this.prisma.tool_catalog.findFirst({
      where: {
        name
      }
    });
  }
}
