import { IsDate, IsDateString, IsDecimal, IsIn, IsInt, IsString } from "class-validator";

export class CreateServiceDto {
  @IsInt()
  id_vehicle: number;
  @IsInt()
  id_user: number;
  @IsInt()
  id_service_catalog: number;
  @IsInt()
  id_seller: number;
  @IsDateString()
  date_service: Date;
  @IsDecimal()
  total: number;
  @IsString()
  status: string;
  @IsString()
  observations?: string;
  @IsInt()
  state?: number;
  @IsDateString()
  date_initial?: Date;
  @IsDateString()
  date_final?: Date;
}
