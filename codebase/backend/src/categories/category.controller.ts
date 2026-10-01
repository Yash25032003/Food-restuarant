import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service.js";
import { UserRole } from "../users/user.schema.js";
import { CreateCategoryDto } from "./dto/create.category.dto.js";
import { GetUser } from "../auth/decorators/get-user.decorator.js";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard.js";
import { RolesGuard } from "../auth/guard/roles.guard.js";
import { Roles } from "../auth/decorators/roles.decorator.js";


@Controller('categories')

export class CategoryController{
    constructor(private readonly categoryService:CategoryService){}

    // create Category
    @Post()
    @UseGuards(JwtAuthGuard , RolesGuard)
    @Roles(UserRole.ADMIN , UserRole.OWNER)
    async create (
        @Body() createCategoryDto: CreateCategoryDto,
        @GetUser() user: {userId: string , role: string},
    ){
            return this.categoryService.create(createCategoryDto , user)
        }

    // get categories by rest ID (public for customer)
    async findByRestaurant(
        @Param('restaurantId')
        restaurantId: string,
    ){
        return this.categoryService.findByRestaurant(restaurantId)
    }

    //update category (owner ,admin)

    async update(
        
    )
}