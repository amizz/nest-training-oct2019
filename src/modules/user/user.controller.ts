import { Controller, Get, Post, Body, Query, Param, Res } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { Response, Request } from "express";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: any) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async getUserQuery(@Query() createUserDto: any) {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserId(@Param() createUserDto: any) {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserExpress(@Res() req : Request) {
    return this.userService.findAll();
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.userService.findAll();
  }
}