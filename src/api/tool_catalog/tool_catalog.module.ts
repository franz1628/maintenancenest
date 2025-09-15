import { Module } from '@nestjs/common';
import { ToolCatalogService } from './tool_catalog.service';
import { ToolCatalogController } from './tool_catalog.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ToolCatalogController],
  providers: [ToolCatalogService, PrismaService],
})
export class ToolCatalogModule {}
