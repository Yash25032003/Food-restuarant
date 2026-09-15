import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/user.schema.js";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy.js";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '7d' as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
  exports: [AuthService, JwtModule , JwtStrategy , PassportModule],
})
export class AuthModule { }