import { IsDate, IsDateString, IsDecimal, IsIn, IsInt, IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
  @IsInt()
  id_vehicle: number;
  @IsInt()
  id_user: number;
  @IsInt()
  id_service_catalog: number;
  @IsInt()
  id_seller: number;
  @IsDateString({ strict: false })
  date_service: string;
  @IsNumber()
  total: number;
  @IsString()
  status: string;
  @IsString()
  observations?: string;
  @IsInt()
  state?: number;
  @IsDateString({ strict: false })
  date_initial: string;
  @IsDateString({ strict: false })
  date_final: string;
}
