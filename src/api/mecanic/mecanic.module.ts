import { Module } from '@nestjs/common';
import { MecanicService } from './mecanic.service';
import { MecanicController } from './mecanic.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [MecanicController],
  providers: [MecanicService, PrismaService],
})
export class MecanicModule {}
