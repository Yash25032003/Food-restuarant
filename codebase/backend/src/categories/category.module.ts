import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category.schema.js';    
import { Restaurant, RestaurantSchema } from '../restaurants/restaurant.schema.js';
import {CategoryService} from './category.service.js';
@Module({
  imports: [
     // converting TS class schema into mongoose schema.
    // means now nest js can perform DB queries on this collection.
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      {name : Restaurant.name , schema: RestaurantSchema}
    ]),
  ],
  providers:[CategoryService],
  exports: [CategoryService , MongooseModule],
})
export class CategoriesModule {}