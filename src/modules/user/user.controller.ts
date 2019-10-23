import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from '../../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService : UserService
  ) {}

  @Get()
  getHello(@Req() req, @Res() res): string {
      return res.status(200).json({status: 'ok'})
  }

  @Get('all')
  async getAll(@Req() req, @Res() res): Promise<any> {
      try {
        let result = await this.userService.getUsers()

        return res.status(200).json({status: 'ok', data: result})        
      } catch (error) {
        throw error
      }
  }

  @Post('')
  setHello(@Req() req, @Res() res): string {
      return res.status(200).json({status: 'ok'})
  }
}
