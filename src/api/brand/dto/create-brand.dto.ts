import { IsInt, IsString, min, MinLength, minLength } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    description?: string;

    @IsString()
    logo?: string = '';

    @IsString()
    photo?: string = '';

    @IsInt()
    state?: number = 1;
}
