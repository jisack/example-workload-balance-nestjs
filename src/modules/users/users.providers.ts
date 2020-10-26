import { UserSchema } from '../../models/user.model';
import { Mongoose } from 'mongoose';

export const UsersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
