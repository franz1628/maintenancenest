import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProblemDetailsFilter } from './common/filters/problem-details.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Vehicle Maintenance API')
    .setDescription('API for managing vehicles and their maintenance records')
    .setVersion('1.0')
    .addTag('vehicles')
    .addTag('maintenance')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
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

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });
  
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
