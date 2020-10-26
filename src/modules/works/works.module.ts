import { Module, forwardRef } from '@nestjs/common';
import { WorksController } from './works.controller';
import { WorksService } from './works.service';
import { UsersModule } from '../users/users.module';
import { WorksProviders } from './works.providers';
import { DatabaseModule } from '../../database/database.module';
import { MatchersModule } from '../matchers/matchers.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UsersModule),
    forwardRef(() => MatchersModule),
  ],
  controllers: [WorksController],
  providers: [WorksService, ...WorksProviders],
  exports: [WorksService],
})
export class WorksModule {}
