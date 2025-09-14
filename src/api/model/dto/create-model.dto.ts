import { IsInt, IsString, MinLength } from "class-validator";

export class CreateModelDto {
    @IsInt()
    id_brand: number;

    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MinLength(2)
    description?: string='';

    @IsInt()
    state?: number = 1;
}
