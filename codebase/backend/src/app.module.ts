import { Module } from '@nestjs/common';
import { ConfigModule,  ConfigService } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/user.module.js';
import { RestaurantModule } from './restaurants/restaurant.module.js';
import { CategoriesModule } from './categories/category.module.js';
import { ProductsModule } from './products/product.module.js';
import { AuthModule } from './auth/auth.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal:true,
        }),
        MongooseModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(configService:ConfigService)=>({
                uri:configService.get<string>('MONGO_URI'),
            }),
        }),
        UsersModule,
        RestaurantModule,
        CategoriesModule,
        ProductsModule,
        AuthModule
    ],
    controllers:[AppController],
    providers:[AppService],
})
export class AppModule {}
