import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Restaurant , RestaurantSchema } from "./restaurant.schema.js";


@Module({
     // converting TS class schema into mongoose schema.
    // means now nest js can perform DB queries on this collection.
    imports:[
        MongooseModule.forFeature([
            {name : Restaurant.name , schema: RestaurantSchema}
        ]),
    ],
    exports:[MongooseModule]
})

export class RestaurantModule{}