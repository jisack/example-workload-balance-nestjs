import { Document } from 'mongoose';

export interface Work extends Document {
  readonly _id: string;
  readonly name: string;
  readonly user: string;
  readonly status: string;
  readonly is_done: boolean;
  readonly start_date: Date;
  readonly end_date: Date;
}

export interface UpdateWork {
  readonly name?: string;
  readonly user?: string;
  readonly status?: string;
  readonly is_done?: boolean;
  readonly start_date?: Date;
  readonly end_date?: Date;
}
