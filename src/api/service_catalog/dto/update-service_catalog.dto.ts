import { PartialType } from '@nestjs/swagger';
import { CreateServiceCatalogDto } from './create-service_catalog.dto';

export class UpdateServiceCatalogDto extends PartialType(CreateServiceCatalogDto) {}
