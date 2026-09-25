import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateRestuarantDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsOptional()
    @IsString()
    phone?: string;
}