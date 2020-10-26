import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.interface';
import { LoginUserDto } from './login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.usersService.findByUsername(loginUserDto.username);
    if (!user) {
      return null;
    }
    const isPasswordMatch = compare(loginUserDto.password, user.password);
    if (isPasswordMatch) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
