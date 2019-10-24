import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<any>) {}

  async create(createCatDto: any): Promise<any> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<any[]> {
    return await this.catModel.find().exec();
  }
}
