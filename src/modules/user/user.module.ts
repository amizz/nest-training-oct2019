import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from '../../services/user.service';
import { UserSchema } from '../../schemas/user.schema';
import { CheckAuth } from '../../middlewares/checkAuth.middleware';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User',
    schema: UserSchema
  }])],

  controllers: [UserController],
  providers: [UserService],

  exports: [MongooseModule.forFeature([{
    name: 'User',
    schema: UserSchema
  }]), UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuth)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST }
      )
      .forRoutes(UserController);
  }
}