import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaService } from 'prisma/prisma.service';
import { UploadService } from 'src/common/upload/upload.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, PrismaService, UploadService],
})
export class BrandModule {}
