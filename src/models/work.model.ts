import { Schema } from 'mongoose';

export const WorkSchema = new Schema({
  name: String,
  status: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  is_done: {
    type: Boolean,
    default: false,
  },
  start_date: {
    type: Date,
    default: new Date(),
  },
  end_date: {
    type: Date,
    default: null,
  },
});
