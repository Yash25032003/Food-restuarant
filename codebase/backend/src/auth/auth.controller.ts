import { AuthService } from "./auth.service.js"
import { Controller , Post , Body, UseGuards, Get } from "@nestjs/common"
import { SignupDto } from "./dto/signup.dto.js"
import { LoginDto } from "./dto/login.dto.js"
import { JwtAuthGuard } from "./guard/jwt-auth.guard.js"
import { GetUser } from "./decorators/get-user.decorator.js"


@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}

    @Post('signup')
    async Signup(@Body() signupDto: SignupDto){
        return this.authService.signup(signupDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto)
    }

    // protected test route
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@GetUser() user: any){
        return {
            message: 'You have accessed a protected route!',
            user,
        };
    }
}