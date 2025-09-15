import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './api/user/user.module';
import { BrandModule } from './api/brand/brand.module';
import { ModelModule } from './api/model/model.module';
import { MecanicModule } from './api/mecanic/mecanic.module';
import { PieceCatalogModule } from './api/piece_catalog/piece_catalog.module';
import { SellerModule } from './api/seller/seller.module';
import { ServiceCatalogModule } from './api/service_catalog/service_catalog.module';
import { ToolCatalogModule } from './api/tool_catalog/tool_catalog.module';
import { VehicleModule } from './api/vehicle/vehicle.module';
import { ServiceDetailCatalogModule } from './api/service_detail_catalog/service_detail_catalog.module';
import { TypeDocumentModule } from './api/type_document/type_document.module';

@Module({
  imports: [UserModule, BrandModule, ModelModule, MecanicModule, PieceCatalogModule, SellerModule, ServiceCatalogModule, ToolCatalogModule, VehicleModule, ServiceDetailCatalogModule, TypeDocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
