import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Restaurant, RestaurantSchema } from "./restaurant.schema.js";
import { RestaurantController } from "./restaurant.controller.js";
import { RestaurantService } from "./restaurant.service.js";
import { AuthModule } from "../auth/auth.module.js";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Restaurant.name, schema: RestaurantSchema }
        ]),
        AuthModule
    ],
    controllers: [RestaurantController],
    providers: [RestaurantService],
    exports: [RestaurantService, MongooseModule]
})
export class RestaurantModule {}