import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema.js';

@Module({
  imports: [
     // converting TS class schema into mongoose schema.
    // means now nest js can perform DB queries on this collection.
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ProductsModule {}