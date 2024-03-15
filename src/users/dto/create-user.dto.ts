import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsNumber()
    age: number;
    @IsNotEmpty()
    @IsArray()
    hobbies: string[];
}
