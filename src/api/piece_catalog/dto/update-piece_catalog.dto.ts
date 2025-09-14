import { PartialType } from '@nestjs/swagger';
import { CreatePieceCatalogDto } from './create-piece_catalog.dto';

export class UpdatePieceCatalogDto extends PartialType(CreatePieceCatalogDto) {}
