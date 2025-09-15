import { IsInt, IsString, MinLength } from "class-validator";

export class CreateTypeDocumentDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @MinLength(3)
  description?: string;
  @IsInt()
  state?: number;
}
