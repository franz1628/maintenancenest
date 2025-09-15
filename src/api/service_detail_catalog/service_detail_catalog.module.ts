import { Module } from '@nestjs/common';
import { ServiceDetailCatalogService } from './service_detail_catalog.service';
import { ServiceDetailCatalogController } from './service_detail_catalog.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ServiceDetailCatalogController],
  providers: [ServiceDetailCatalogService, PrismaService],
})
export class ServiceDetailCatalogModule {}
