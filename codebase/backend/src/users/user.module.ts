import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema.js';

// Module is nest js decorator
@Module({
  imports: [
    // converting TS class schema into mongoose schema.
    // means now nest js can perform DB queries on this collection.
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class UsersModule {}