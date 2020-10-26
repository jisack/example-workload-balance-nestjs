import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  InternalServerErrorException,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Work } from './work.interface';
import { CreateWorkDto } from './create-work.dto';
import { WorksService } from './works.service';
import { UsersService } from '../users/users.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { JwtAuthGuard } from '../authentication/guards/auth-jwt.guard';
import { MatchersService } from '../matchers/matchers.service';

@Controller('works')
export class WorksController {
  constructor(
    private worksService: WorksService,
    private userService: UsersService,
    private matchersService: MatchersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async get(): Promise<Work[]> {
    try {
      return this.worksService.findAll();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id') id: string): Promise<Work> {
    try {
      return this.worksService.findById(id);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body(new ValidationPipe()) createWorkDto: CreateWorkDto) {
    try {
      const work = {
        _id: null,
        name: createWorkDto.name,
        user: null,
        status: 'pending',
        is_done: false,
        start_date: new Date(),
        end_date: null,
      };
      await this.worksService.create(work);
      await this.matchersService.matchWork();
      return {
        message: 'create success!',
      };
    } catch (err) {
      return new InternalServerErrorException(err);
    }
  }

  @Put(':id/done')
  @UseGuards(JwtAuthGuard)
  async setWorkDone(@Param('id') id: string) {
    try {
      const work = await this.worksService.findById(id);
      if (work) {
        await this.worksService.update(work._id, {
          end_date: new Date(),
          is_done: true,
          status: 'done',
        });
        await this.userService.update(work.user, {
          is_free: true,
        });
        await this.matchersService.matchWork();
        return {
          message: 'work done!',
        };
      } else {
        return new BadRequestException('Invalid work!');
      }
    } catch (err) {
      console.log('err ==>', err);
      return new InternalServerErrorException(err);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  // Return should have message interface
  async delete(@Param('id') id: string): Promise<any> {
    this.worksService.delete(id);
    return {
      message: 'delete success!',
    };
  }
}
