import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

export class CreateVehicleDto {
  @IsString()
  @MinLength(3)
  plate: string;
  @IsString()
  color?: string;
  @IsInt()
  id_user: number;
  @IsInt()
  id_model: number;
  @IsInt()
  kilometers?: number;
  @IsInt()
  state?: number;
}
