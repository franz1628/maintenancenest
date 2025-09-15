import { PartialType } from '@nestjs/swagger';
import { CreateTypeDocumentDto } from './create-type_document.dto';

export class UpdateTypeDocumentDto extends PartialType(CreateTypeDocumentDto) {}
