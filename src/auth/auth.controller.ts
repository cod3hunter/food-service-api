import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() authData: CreateUserDTO): Promise<IRESTResponse> {
    return this.authService.createUser(authData);
  }
  @Post('login')
  login(@Body() authData: LoginDTO): Promise<IRESTResponse> {
    return this.authService.login(authData);
  }
}
