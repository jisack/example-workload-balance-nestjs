import { Injectable, Inject } from '@nestjs/common';
import { Work, UpdateWork } from './work.interface';
import { CreateWorkDto } from './create-work.dto';
import { Model } from 'mongoose';

@Injectable()
export class WorksService {
  constructor(@Inject('WORK_MODEL') private readonly workModel: Model<Work>) {}

  async create(createWork: CreateWorkDto): Promise<Work> {
    return this.workModel.create(createWork);
  }

  async findAll(): Promise<Work[]> {
    return this.workModel
      .find()
      .lean()
      .exec();
  }

  async findById(id: string): Promise<Work> {
    return this.workModel
      .findById(id)
      .lean()
      .exec();
  }

  async findOne(query?: any, sort?: any): Promise<Work> {
    return this.workModel
      .findOne(query)
      .sort(sort)
      .lean<Work>()
      .exec();
  }

  async update(id: string, payload?: UpdateWork): Promise<Work> {
    return this.workModel.findByIdAndUpdate(id, payload);
  }

  async delete(id: string): Promise<Work> {
    return this.workModel.findByIdAndDelete(id);
  }
}
