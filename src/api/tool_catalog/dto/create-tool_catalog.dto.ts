import { IsInt, IsString, MinLength } from "class-validator";

export class CreateToolCatalogDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  description?: string;
  @IsString()
  photo?: string;
  @IsInt()
  state?: number;
}
