import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";
import { UserDto } from "../dto/user.dto";
import { UserInterface } from '../modules/user/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<any>) {}

  async create(createUserDto: any): Promise<any> {
    createUserDto.password = await bcrypt.hash(createUserDto.password || "", 10);
    const createdUser = new this.userModel(createUserDto);

    return await createdUser.save();
  }

  async update(id, updateUserData: any): Promise<any> {
    return await new this.userModel().createdUser.updateOne({
      _id: id
    }, updateUserData);
  }

  async findAll(): Promise<any[]> {
    return await this.userModel.find();
  }

  async findByEmail(createUserDto: UserDto): Promise<UserInterface> {
    return await this.userModel.findOne({
      email: createUserDto.email
    }).exec();
  }

  async findByParam(param : Object): Promise<UserInterface> {
    return await this.userModel.findOne(param).exec();
  }

  async comparePassword(reqPassword : string, dbPassword : string) {
    return await bcrypt.compare(reqPassword, dbPassword);
  }
}
