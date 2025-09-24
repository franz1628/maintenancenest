import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateServiceCatalogDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  description?: string;
  @IsNumber()
  price: number;
  @IsNumber()
  duration_minutes: number;
  @IsNumber()
  state?: number;
}
