import { IsNotEmpty, IsString , IsEmail, MinLength, IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../../users/user.schema.js";

export class SignupDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail({} , {message:"Invailid email address format"})
    @IsNotEmpty()
    email:string;

    @IsString()
    @MinLength(6 , {message:"Password must be at least 6 characters long"})
    password: string;

    @IsEnum(UserRole, { message: 'Invalid role provided' })
    @IsOptional()
    role:UserRole;
    
    @IsString()
    @IsOptional()
    phone:string;
}