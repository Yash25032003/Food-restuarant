import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category.schema.js';    

@Module({
  imports: [
     // converting TS class schema into mongoose schema.
    // means now nest js can perform DB queries on this collection.
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class CategoriesModule {}