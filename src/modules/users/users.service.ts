import { Injectable, Inject } from '@nestjs/common';
import { User, UpdateUser } from './user.interface';
import { CreateUserDto } from './create-user.dto';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  // Maybe can used as a global and use type as a generic type for example Promise<T>
  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await genSalt(Number(process.env.SALT_ROUNDS));
    createUserDto.password = await hash(createUserDto.password, salt);
    return this.userModel.create(createUserDto);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel
      .findOne({ username })
      .lean<User>()
      .exec();
  }

  async findOne(query?: any, sort?: any): Promise<User> {
    return this.userModel
      .findOne(query)
      .sort(sort)
      .lean<User>()
      .exec();
  }

  async findAll(query?: any): Promise<User[]> {
    return this.userModel
      .find(query || {})
      .lean<User>()
      .exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel
      .findById(id)
      .lean<User>()
      .exec();
  }

  async update(id: string, payload?: UpdateUser): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, payload);
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
