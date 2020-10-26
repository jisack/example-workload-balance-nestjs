import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersProviders } from './users.providers';
import { DatabaseModule } from '../../database/database.module';
import { MatchersModule } from '../matchers/matchers.module';
import { WorksModule } from '../works/works.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => WorksModule),
    forwardRef(() => MatchersModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...UsersProviders],
  exports: [UsersService],
})
export class UsersModule {}
