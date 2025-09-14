import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './api/user/user.module';
import { BrandModule } from './api/brand/brand.module';
import { ModelModule } from './api/model/model.module';
import { MecanicModule } from './api/mecanic/mecanic.module';

@Module({
  imports: [UserModule, BrandModule, ModelModule, MecanicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
