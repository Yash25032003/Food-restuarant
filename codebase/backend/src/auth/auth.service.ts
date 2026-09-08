import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { UsersModule } from "../users/user.module.js";
import { Model } from "mongoose"
import { User, Userdocument } from "../users/user.schema.js";
import mongoose from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dto/signup.dto.js";
import * as bcrypt from 'bcrypt'
import { LoginDto } from "./dto/login.dto.js";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModal: Model<Userdocument>,
        private jwtService: JwtService
    ) { }

    async signup(signupDto: SignupDto) {
        const { name, email, password, role, phone } = signupDto;
        // 1. Check if user exist or not
        const Existinguser = await this.userModal.findOne({ email });
        if (Existinguser) {
            throw new ConflictException('User with this email already exists');
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //3. Store the user in DB/Create a user
        const user = await this.userModal.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone
        })
        //4. Return JWT token
        const token = this.generateToken(user._id.toString(), user.email, user.role);

        return {
            message: "User registered successfully",
            access_token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // 1. Find user in DB
        const user = await this.userModal.findOne({ email })
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // 2. compare the password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw new UnauthorizedException('Invalid email or password');
        }
        // JWT token generation
        const token = this.generateToken(user._id.toString(), user.email, user.role);

        return {
            message: "Login successfully",
            access_token: token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        }
    }

    private generateToken(userId:string , email:string , role:string):string{
        return this.jwtService.sign({
            sub:userId, email, role,
        })
    }
}