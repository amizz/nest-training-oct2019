import { Controller, Get, Post, Body, Res, Req, HttpException } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { success, error } from "../../lib/response";
import { Response, Request } from 'express';
import { UserInterface } from '../user/user.interface';

@Controller('auth')
export class AuthController {
  constructor(
      private readonly userService: UserService,
      private readonly tokenService : TokenService
    ) {}

  @Post('register')
  async register(@Body() createUserDto: any) {
    this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Res() res : Response, @Req() req : Request): Promise<any[]> {
    /**
     * Find user
     */
    let user : UserInterface = await this.userService.findByEmail(req.body);

    if(!user) {
      throw new HttpException({
        status: 'FORBIDDEN',
        message: 'Wrong email/password'
      }, 401);
    }

    /**
     * Check password
     */
    let isPasswordCorrect = await this.userService.comparePassword(req.body.password, user.password)

    if(!isPasswordCorrect) {
      throw new HttpException({
        status: 'FORBIDDEN',
        message: 'Wrong email/password'
      }, 401);
    }

    //AccessToken
    let accessToken = await this.tokenService.createAccessToken({
      id: user._id,
      deviceCode: 'asdasd'
    });
    //RefreshToken
    let refreshToken = await this.tokenService.createRefreshToken(user);

    return success(res, {
      accessToken,
      refreshToken,
      data: {
        name: user.name,
        email: user.email
      }
    })
  }

  @Post('refresh')
  async refresh(@Res() res : Response, @Req() req : Request): Promise<any> {
    //Ambil refresh token

    //Check db

    //If incase ada 
    let accessToken = await this.tokenService.createAccessToken({
      id: '',
      deviceCode: 'asdasd'
    });

    return {
      status: 'OK',
      accessToken: accessToken
    }
  }

  @Post('revoke') //Revoke refesh token
  async revoke(@Res() res : Response, @Req() req : Request): Promise<any> {
  }

  @Post('/oauth/token')
  async oauth(@Res() res : Response, @Req() req : Request): Promise<any> {
    if(req.body.grant_type == 'device_code') {
      let device_code = req.body.device_code;
      let client_id = req.body.client_id;
      let client_secret = req.body.client_secret;

      /**
       * Check oauth in db
       */

       /**
        * Generate access and refresh token
        */
      let accessToken, refreshToken, expiresIn;

      
      return {
        token_type: 'Bearer',
        expires_in: expiresIn,
        access_token: accessToken,
        refresh_token: refreshToken
      }
    } else if(req.body.grant_type == 'refresh_token') {
      /**
       * grant_type with the value refresh_token
        refresh_token with the refresh token
        client_id with the the client’s ID
        client_secret with the client’s secret
        scope with a space-delimited list of requested scope permissions. This is optional; if not sent the original scopes will be used, otherwise you can request a reduced set of scopes.
      */

      return {
        token_type: 'Bearer',
        expires_in: '',
        access_token: '',
        refresh_token: ''
      }
    } else if(req.body.grant_type == 'token') {
      
    }
  }
}