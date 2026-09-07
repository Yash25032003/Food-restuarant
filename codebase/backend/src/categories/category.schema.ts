import { Prop, Schema , SchemaFactory } from "@nestjs/mongoose";
import mongoose , {Document} from "mongoose";

export type CategoryDocument = Category & Document;

@Schema({timestamps:true})
export class Category {
    @Prop({ required: true, trim: true })
    name: string;

    // Foreign Key: Multi-tenant filtering
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true })
    restaurantId: mongoose.Schema.Types.ObjectId;

    @Prop({ default: true })
    isActive: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category)