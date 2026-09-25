import { IsNotEmpty, IsString } from "class-validator";

export class CreatCategoryDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    RestaurantId:string;
}
