import { Module } from '@nestjs/common';
import { TypeDocumentService } from './type_document.service';
import { TypeDocumentController } from './type_document.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TypeDocumentController],
  providers: [TypeDocumentService, PrismaService],
})
export class TypeDocumentModule {}
