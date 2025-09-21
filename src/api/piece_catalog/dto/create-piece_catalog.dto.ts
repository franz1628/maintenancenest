import { IsDecimal, IsInt, IsNumber, IsString, MinLength } from "class-validator";

export class CreatePieceCatalogDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  description?: string;
  @IsNumber()
  price: number;
  @IsInt()
  stock: number;
  @IsInt()
  state?: number;
}
