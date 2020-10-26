import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './login-user.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';


@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    try {
      const validateResult = await this.authService.validateUser(loginUserDto);
      if (!validateResult) {
        return new UnauthorizedException();
      }
      return this.authService.login(validateResult);
    } catch (err) {
      return new InternalServerErrorException();
    }
  }
}
