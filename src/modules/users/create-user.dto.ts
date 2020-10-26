import { IsString, IsInt } from 'class-validator';
export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  fullname: string;
  @IsString()
  password: string;
  @IsInt()
  age: number;
}
