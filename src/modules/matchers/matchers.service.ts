import { Injectable, Inject, forwardRef } from '@nestjs/common';
// import { Work } from '../works/work.interface';
// import { User } from '../users/user.interface';
// import { Model } from 'mongoose';
import { WorksService } from '../works/works.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class MatchersService {
  constructor(
    // @Inject('WORK_MODEL') private readonly workModel: Model<Work>,
    // @Inject('USER_MODEL') private readonly userModel: Model<User>,
    @Inject(forwardRef(() => WorksService))
    private worksService: WorksService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async matchWork(): Promise<void> {
    const user = await this.usersService.findOne(
      { is_free: true },
      { total_work: 1 },
    );
    if (user) {
      const work = await this.worksService.findOne(
        { status: 'pending' },
        { start_date: 1 },
      );
      if (work) {
        await this.worksService.update(work._id, {
          user: user._id,
          status: 'start',
        });
        await this.usersService.update(user._id, {
          is_free: false,
          total_work: user.total_work + 1,
        });
      }
    }
  }
}
