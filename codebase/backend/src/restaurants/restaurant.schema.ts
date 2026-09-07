import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose , {Document} from 'mongoose'

export type RestaurantDocument = Restaurant & Document;

@Schema({timestamps:true})
export class Restaurant{
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({type:mongoose.Schema.Types.ObjectId , ref:'User' , required:true})
    ownerid:mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, trim: true })
    address: string;

    @Prop({ trim: true })
    phone: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
