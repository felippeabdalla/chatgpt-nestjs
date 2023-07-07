import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '../infrastructure/filters/http-exception.filter';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('./chave-privada.key'),
      cert: fs.readFileSync('./certificado.crt'),
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '1mb' }));

  app.use(function (req, res, next) {
    res.setHeader(
      'Content-Security-Policy',
      `frame-src 'none'; object-src 'none'; script-src 'self'; style-src 'self';`,
    );
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload',
    );
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Permissions-Policy', '');
    next();
  });

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Chatgpt - API')
    .setDescription('Chatgpt - API')
    .setExternalDoc('Download JSON', '/docs-json')
    .addBearerAuth(
      {
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'app',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('/docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  process.on('uncaughtException', function () {});

  await app.listen(5000, '0.0.0.0', () => {});
}

bootstrap().catch((err) => console.error(err));
