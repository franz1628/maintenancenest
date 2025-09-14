import { PartialType } from '@nestjs/swagger';
import { CreateMecanicDto } from './create-mecanic.dto';

export class UpdateMecanicDto extends PartialType(CreateMecanicDto) {}
