import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://nodetrainer:ng9RWzHMqszEtM15@cluster0-nirbb.mongodb.net/training?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }), UserModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
