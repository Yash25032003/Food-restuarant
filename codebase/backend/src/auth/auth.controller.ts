import { AuthService } from "./auth.service.js"
import { Controller , Post , Body } from "@nestjs/common"
import { SignupDto } from "./dto/signup.dto.js"
import { LoginDto } from "./dto/login.dto.js"


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
}