import { WorkSchema } from '../../models/work.model';
import { Mongoose } from 'mongoose';

export const WorksProviders = [
  {
    provide: 'WORK_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Work', WorkSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
