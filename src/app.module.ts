import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './api/user/user.module';
import { BrandModule } from './api/brand/brand.module';

@Module({
  imports: [UserModule, BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
