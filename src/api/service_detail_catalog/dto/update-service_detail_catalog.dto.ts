import { PartialType } from '@nestjs/swagger';
import { CreateServiceDetailCatalogDto } from './create-service_detail_catalog.dto';

export class UpdateServiceDetailCatalogDto extends PartialType(CreateServiceDetailCatalogDto) {}
