import { HttpException } from '@nestjs/common';

export const TOKEN_INVALID_EXCEPTION = new HttpException({
    status: 'TOKEN_INVALID',
    message: 'Access Token Invalid'
  }, 444);