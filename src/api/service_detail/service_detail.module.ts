import { Module } from '@nestjs/common';
import { ServiceDetailService } from './service_detail.service';
import { ServiceDetailController } from './service_detail.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ServiceDetailController],
  providers: [ServiceDetailService, PrismaService],
})
export class ServiceDetailModule {}
