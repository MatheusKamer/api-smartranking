import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EmptyParametersValidation } from './pipes/empty-parameters-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe(), new EmptyParametersValidation());

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
