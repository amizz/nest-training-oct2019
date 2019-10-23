import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
require('dotenv').config();

async function bootstrap() {
  console.log(process.env.DB)
  const app = await NestFactory.create < NestExpressApplication > (
    AppModule,
    new ExpressAdapter()
  );
  await app.listen(3000);
}
bootstrap();
