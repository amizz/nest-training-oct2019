import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as oauth2orize from "oauth2orize";
import {randomBytes} from "crypto";

@Injectable()
export class oAuthService {
    server = oauth2orize.createServer();
    constructor(@InjectModel('oauth') private oauthModel: Model < any > ) {}

    /**
     * device_id
     * client_id
     * client_secret
     */
    
}
