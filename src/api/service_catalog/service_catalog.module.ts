import { Module } from '@nestjs/common';
import { ServiceCatalogService } from './service_catalog.service';
import { ServiceCatalogController } from './service_catalog.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ServiceCatalogController],
  providers: [ServiceCatalogService, PrismaService],
})
export class ServiceCatalogModule {}
