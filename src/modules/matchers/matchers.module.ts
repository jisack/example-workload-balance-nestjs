import { Module, forwardRef } from '@nestjs/common';
import { MatchersService } from './matchers.service';
import { UsersModule } from '../users/users.module';
import { WorksModule } from '../works/works.module';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UsersModule),
    forwardRef(() => WorksModule),
  ],
  controllers: [],
  providers: [MatchersService],
  exports: [MatchersService],
})
export class MatchersModule {}
