import { IsDate, IsEmail, isEmail, IsIn, IsInt, IsPhoneNumber, IsString, MinLength } from "class-validator";

/*
creame un json de ejemplo
con datos ficticios
para crear un usuario
conforme al dto CreateUserDto
{
  "name": "John",
  "last_name": "Doe",
  "second_last_name": "Smith",
  "password": "SecurePass",
  "email": "john.doe@example.com"
  "birth_date": "1990-01-01",
  "phone": "123-456-7890",
  "number_document": "A12345678",
  "id_type_document": 1
}


*/
export class CreateUserDto {
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
    @IsString()
    birth_date: Date;
    @IsString()
    phone?: string;
    @IsString()
    @MinLength(5)
    number_document: string;
    @IsInt()
    id_type_document: number;
    @IsInt()
    state?: number

}
