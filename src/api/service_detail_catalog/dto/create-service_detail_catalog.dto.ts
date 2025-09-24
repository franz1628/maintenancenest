import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateServiceDetailCatalogDto {
  @IsInt()
  id_service_catalog: number;
  @IsInt()
  id_piece_catalog?: number | null;
  @IsInt()
  id_tool_catalog?: number | null;
  @IsString()
  description?: string;
  @IsInt()
  duration_minutes?: number;
  @IsInt()
  state?: number;
}
