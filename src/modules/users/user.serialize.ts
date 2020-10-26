import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  @Expose({ name: 'id' })
  _id: string;
  username: string;
  fullname: string;
  @Exclude()
  password: string;
  @Exclude()
  __v: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
    this._id = this._id.toString();
  }
}
