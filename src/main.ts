import { ValidationError } from '@nestjs/class-validator';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import HttpExceptionFilter from './http/filters/http-exception.filter';
import ValidationFactory from './http/validation.factory';

const enableSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Candy Store Apis')
    .setDescription('Candy store api documentation')
    .setVersion('1.0')
    .addTag('Candy store')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);

  // global filters
  app.useGlobalFilters(new HttpExceptionFilter());
  // integrate global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) =>
        ValidationFactory.generate(errors),
    }),
  );

  // only enable if you are not in production
  // can be configured in ~/config/app.ts
  if (configService.get('app.swagger')) {
    enableSwagger(app);
  }
  await app.listen(configService.get('port'));
  console.log('Running application on: ' + configService.get('port'));
}

bootstrap().catch((err: any) => console.log(err));
