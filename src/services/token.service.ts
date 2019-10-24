import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";
import { TokenPayloadDto } from "../dto/tokenPayload.dto";
import * as jwt from "jsonwebtoken";
import {randomBytes} from "crypto";

@Injectable()
export class TokenService {
    constructor(@InjectModel('User') public userModel: Model<any>) {
    }

    async createAccessToken(tokenPayload: TokenPayloadDto): Promise < any > {
        return await jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d'
        })
    }

    async createRefreshToken(user): Promise < any > {
        // Generate
        // Refresh token
        // Check database valid
        let refreshToken = await randomBytes(16).toString('hex')
        
        let currentToken;
        if(!user.token) {
            currentToken = [refreshToken]
        } else {
            currentToken = user.token
            currentToken.push(refreshToken)
        }

        await this.userModel.updateOne({
            _id: user._id
        }, {
            token: currentToken
        })

        return refreshToken;
    }

    async accessTokenValidity(): Promise < any > {
    }
}
