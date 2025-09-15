import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDetailCatalogDto } from './dto/create-service_detail_catalog.dto';
import { UpdateServiceDetailCatalogDto } from './dto/update-service_detail_catalog.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ServiceDetailCatalogService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(create: CreateServiceDetailCatalogDto) {
    await this.validServiceCatalog(create.id_service_catalog);

    if(create.id_piece_catalog){
      await this.validPieceCatalog(create.id_piece_catalog);
    }

    if(create.id_tool_catalog){
      await this.validToolCatalog(create.id_tool_catalog);
    }

    return this.prisma.service_detail_catalog.create({ data: { ...create } });
  }

  findAll() {
    return this.prisma.service_detail_catalog.findMany({
      where: { state: 1 }
    });
  }

  async findOne(id: number) {
    const model = await this.prisma.service_detail_catalog.findUnique({ where: { id } });

    if (!model) {
      throw new NotFoundException('Service detail not found');
    }
    return model;
  }

  async update(id: number, update: UpdateServiceDetailCatalogDto) {
    await this.findOne(id);

    if(update.id_service_catalog){
      await this.validServiceCatalog(update.id_service_catalog);
    }

    if(update.id_piece_catalog){
      await this.validPieceCatalog(update.id_piece_catalog);
    }

    if(update.id_tool_catalog){
      await this.validToolCatalog(update.id_tool_catalog);
    }

    return this.prisma.service_detail_catalog.update({ where: { id }, data: update });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.service_detail_catalog.update({ where: { id }, data: { state: 0 } });
  }

  async validServiceCatalog(id_service_catalog: number) {
    const serviceCatalog = await this.prisma.service_catalog.findFirst({
      where: {
        id: id_service_catalog,
        state: 1
      }
    });
    if (!serviceCatalog) {
      throw new NotFoundException('Service catalog not found or inactive');
    }
  }

  async validPieceCatalog(id_piece_catalog: number) {
    const pieceCatalog = await this.prisma.piece_catalog.findFirst({
      where: {
        id: id_piece_catalog,
        state: 1
      }
    });
    if (!pieceCatalog) {
      throw new NotFoundException('Piece catalog not found or inactive');
    }
  }

  async validToolCatalog(id_tool_catalog: number) {
    const toolCatalog = await this.prisma.tool_catalog.findFirst({
      where: {
        id: id_tool_catalog,
        state: 1
      }
    });
    if (!toolCatalog) {
      throw new NotFoundException('Tool catalog not found or inactive');
    }
  } 

}
