import { IsDecimal, IsInt, IsString } from "class-validator";

export class CreateServiceDetailDto {
    @IsInt()
    id_service: number;
    @IsInt()
    id_service_detail_catalog: number;
    @IsInt()
    id_mecanic?: number;
    @IsInt()
    quantity: number;
    @IsDecimal()
    price: number;
    @IsDecimal()
    total: number;
    @IsString()
    photo?: string;
    @IsString()
    observations?: string;
    @IsInt()
    status?: number;
    @IsInt()
    state?: number;
}
