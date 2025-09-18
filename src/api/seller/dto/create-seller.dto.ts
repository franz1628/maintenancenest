import { IsDateString, IsEmail, IsInt, IsString, MinLength } from "class-validator";
export class CreateSellerDto {
    @IsString()
    @MinLength(3)
    name: string;
    @IsString()
    @MinLength(3)
    last_name: string;
    @IsString()
    @MinLength(3)
    second_last_name?: string;
    @IsString()
    @MinLength(8)
    password: string;
    @IsString()
    @MinLength(5)
    @IsEmail()
    email: string;
    @IsDateString({ strict: false })
    birth_date: string;
    @IsString()
    phone?: string;
    @IsString()
    @MinLength(5)
    number_document: string;
    @IsInt()
    id_document_type: number;
    @IsInt()
    state?: number

}