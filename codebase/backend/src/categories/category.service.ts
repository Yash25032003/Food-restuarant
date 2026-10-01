import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model , Types } from "mongoose";
import { Category, CategoryDocument } from "./category.schema.js";
import { Restaurant, RestaurantDocument } from "../restaurants/restaurant.schema.js";
import { CreatCategoryDto } from "./dto/create.category.dto.js";
import { UserRole } from "../users/user.schema.js";
import { UpdateCategoryDto } from "./dto/update-category-dto.js";
@Injectable()

export class CategoryService {
   constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  // create a category with ownership check

  async create (createCategoryDto: CreatCategoryDto,
    user: {userId: string , role: string}
  ){
    const restaurant = await this.restaurantModel.findById(createCategoryDto.restaurantId);
    if(!restaurant){
        throw new NotFoundException("Your Restaurant is not found");
    }
    // ownership check
    if(restaurant.ownerId.toString() !== user.userId && user.role !== UserRole.ADMIN){
        throw new ForbiddenException("You do not have permission to add categories to this restaurant")
    }

    // if we cam here means we have permission as well
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  //Get all categories for a specific restaurnt
  async findByRestaurant(restaurantId:string){
    return this.categoryModel.find({
        restaurantId: new Types.ObjectId(restaurantId) as any, 
        isActive: true
    }).exec();
  }

  // update category
  async update(id: string, updateCategoryDto: UpdateCategoryDto
    , user :{userId:string ,  role:string}
  ){
    const category = await this.categoryModel.findById(id);
    if(!category){
        throw new NotFoundException("Category not found")
    }

    const restaurant = await this.restaurantModel.findById(category.restaurantId);
      if (restaurant && restaurant.ownerId.toString() !== user.userId && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to update this category');
    }

    return this.categoryModel.findByIdAndUpdate(id , updateCategoryDto, {new: true}).exec();
  }

  async remove(id:string , user:{userId:string ,  role:string}){
    const category = await this.categoryModel.findById(id);
    if(!category){
        throw new NotFoundException("Category is not found");

    }

    const restaurant = await this.restaurantModel.findById(category.restaurantId);
    if (restaurant && restaurant.ownerId.toString() !== user.userId && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete this category');
    }

    return this.categoryModel.findByIdAndDelete(id).exec();
    
  }

}