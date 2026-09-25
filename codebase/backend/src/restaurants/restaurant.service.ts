import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { Restaurant, RestaurantDocument } from "./restaurant.schema.js";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRestuarantDto } from "./dto/create-restaurant.dto.js";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto.js";
import { UserRole } from "../users/user.schema.js";


@Injectable()
export class RestaurantService{
    constructor(
        @InjectModel(Restaurant.name)
         private restaurantModel:Model<RestaurantDocument>,
    ){}

    async create(createRestuarantDto: CreateRestuarantDto , ownerId:string ){
        const newRestaurant = new this.restaurantModel({
            ...createRestuarantDto,
            ownerId,
        })
        return newRestaurant.save();
    }

    async findAll(){
        return this.restaurantModel.find().populate('ownerId' ,'name email').exec();
    }

    async findOne(id: string) {
        const restaurant = await this.restaurantModel.findById(id).populate('ownerId', 'name email').exec();
        if (!restaurant) {
            throw new NotFoundException('No restaurant found');
        }
        return restaurant;
    }

    async update(id: string, updateRestaurantDto: UpdateRestaurantDto, user: { userId: string; role: string }) {
        const restaurant = await this.restaurantModel.findById(id);
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }

        if (restaurant.ownerId.toString() !== user.userId && user.role !== UserRole.ADMIN) {
            throw new ForbiddenException('You do not have permission to update this restaurant');
        }

        return this.restaurantModel.findByIdAndUpdate(id, updateRestaurantDto, { new: true }).exec();
    }

    async remove(id: string, user: { userId: string; role: string }) {
        const restaurant = await this.restaurantModel.findById(id);
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }

        if (restaurant.ownerId.toString() !== user.userId && user.role !== UserRole.ADMIN) {
            throw new ForbiddenException('You do not have permission to delete this restaurant');
        }

        return this.restaurantModel.findByIdAndDelete(id).exec();
    }
}
