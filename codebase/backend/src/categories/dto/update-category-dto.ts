import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDto{
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsBoolean()
    isActive:boolean;
}