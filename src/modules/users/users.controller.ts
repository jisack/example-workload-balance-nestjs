import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  InternalServerErrorException,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { JwtAuthGuard } from '../authentication/guards/auth-jwt.guard';
import { UserEntity } from './user.serialize';
import { MatchersService } from '../matchers/matchers.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private matchersService: MatchersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async get(): Promise<UserEntity[]> {
    try {
      const users = await this.usersService.findAll();
      return users.map(user => {
        return new UserEntity(user);
      });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id') id: string): Promise<UserEntity> {
    try {
      const user = await this.usersService.findById(id);
      return new UserEntity(user);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      const existUser = await this.usersService.findByUsername(
        createUserDto.username,
      );
      if (existUser) {
        return new BadRequestException('That username is already taken.');
      }
      await this.usersService.create(createUserDto);
      await this.matchersService.matchWork();
      return {
        message: 'create success!',
      };
    } catch (err) {
      console.log('err', err);
      return new InternalServerErrorException(err);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  // Return should have message interface
  async delete(@Param('id') id: string): Promise<any> {
    this.usersService.delete(id);
    return {
      message: 'delete success!',
    };
  }
}
