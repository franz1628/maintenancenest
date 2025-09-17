import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProblemDetailsFilter } from './common/filters/problem-details.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Vehicle Maintenance API')
    .setDescription('API for managing vehicles and their maintenance records')
    .setVersion('1.0')
    .addTag('vehicles')
    .addTag('maintenance')
    .build();

  /* CORS */
  app.enableCors();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new ProblemDetailsFilter());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // delete properties that are not in the DTO
      forbidNonWhitelisted: true, // throw an error if extra properties are sent
      transform: true,           // transform types (e.g. string → number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
