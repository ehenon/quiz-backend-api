import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fs from 'fs';
import { AppModule } from './app.module';
import createCustomLogger from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createCustomLogger(),
  });
  const configService = app.get(ConfigService);

  // Creating a Swagger spec document
  const config = new DocumentBuilder()
    .setTitle('Questions API OpenAPI specification')
    .setDescription('API used to [...]')
    .setVersion('0.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Uncomment/comment this line if you want to expose the Swagger UI or not
  SwaggerModule.setup('swagger-ui', app, document);

  // Save the swagger.json file in dist folder if the environment is set to local
  if (configService.get<string>('NODE_ENV') === 'local') {
    try {
      fs.writeFileSync('./dist/swagger.json', JSON.stringify(document));
    } catch (err) {
      new Logger().error('Error while generating the swagger.json file', err.stack, 'App bootstrap');
    }
  }

  await app.listen(configService.get<number>('PORT', 3000));
}

bootstrap();
