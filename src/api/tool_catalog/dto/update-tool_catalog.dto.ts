import { PartialType } from '@nestjs/swagger';
import { CreateToolCatalogDto } from './create-tool_catalog.dto';

export class UpdateToolCatalogDto extends PartialType(CreateToolCatalogDto) {}
