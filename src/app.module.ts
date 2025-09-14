import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './api/user/user.module';
import { BrandModule } from './api/brand/brand.module';
import { ModelModule } from './api/model/model.module';
import { MecanicModule } from './api/mecanic/mecanic.module';
import { PieceCatalogModule } from './api/piece_catalog/piece_catalog.module';

@Module({
  imports: [UserModule, BrandModule, ModelModule, MecanicModule, PieceCatalogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
