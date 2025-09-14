import { Module } from '@nestjs/common';
import { PieceCatalogService } from './piece_catalog.service';
import { PieceCatalogController } from './piece_catalog.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PieceCatalogController],
  providers: [PieceCatalogService, PrismaService],
})
export class PieceCatalogModule {}
