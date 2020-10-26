import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  fullname: String,
  password: String,
  age: Number,
  total_work: {
    type: Number,
    default: 0,
  },
  is_free: {
    type: Boolean,
    default: true,
  },
  work_delay: {
    type: Number,
    default: 0,
  },
});
