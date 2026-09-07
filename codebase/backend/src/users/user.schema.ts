import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timestamp } from "rxjs";
export type Userdocument = User & Document

export enum UserRole{
    CUSTOMER = "customer",
    ADMIN = "admin",
    OWNER = "owner"
}
@Schema({timestamps:true})
export class User {
    @Prop({required:true , trim:true})
    name : string;

    @Prop({required:true , unique:true , lowercase:true , trim:true})
    email: string;

    @Prop({required:true})
    password: string;

    @Prop({
        type:String,
        enum: Object.values(UserRole),
        default: UserRole.CUSTOMER,
    })
    role: UserRole

    @Prop({ trim: true })
    phone?: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);