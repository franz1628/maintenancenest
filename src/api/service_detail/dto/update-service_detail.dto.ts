import { PartialType } from '@nestjs/swagger';
import { CreateServiceDetailDto } from './create-service_detail.dto';

export class UpdateServiceDetailDto extends PartialType(CreateServiceDetailDto) {}
