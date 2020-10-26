import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  readonly username: string;
  readonly fullname: string;
  readonly password: string;
  readonly age: number;
  readonly total_work: number;
  readonly is_free: boolean;
  readonly work_delay: number;
}

export interface UpdateUser {
  readonly username?: string;
  readonly fullname?: string;
  readonly password?: string;
  readonly age?: number;
  readonly total_work?: number;
  readonly is_free?: boolean;
  readonly work_delay?: number;
}
