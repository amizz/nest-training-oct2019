import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';

export interface User {
  email: String
  password: String
  name: String
}

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel : Model<User>) {

  }

  getHello(): string {
    return 'Hello World!';
  }

  async getUsers() : Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      console.log('--error--')
      console.error(error)
      throw Error("Cannot find users")
    }
  }
}
