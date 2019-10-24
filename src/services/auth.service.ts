import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";
import { TokenPayloadDto } from "../dto/tokenPayload.dto";
import * as jwt from "jsonwebtoken";
import { UserService } from "./user.service"

@Injectable()
export class AuthService {
    constructor() {
    }
}
