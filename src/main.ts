import fastifySecureSession from '@fastify/secure-session';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as handlebars from 'handlebars';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // 0. Register secure session plugin (must be before other plugins)
  await app.register(fastifySecureSession, {
    key: fs.readFileSync(path.join(__dirname, 'secret-key')),
    sessionName: 'session',
    cookieName: 'my-session-cookie',
    expiry: 24 * 60 * 60, // 1 day
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  });

  // 1. Register static assets plugin
  await app.register(fastifyStatic, {
    root: join(__dirname, 'public'),
    prefix: '/', // optional
  });

  // 2. Register Handlebars as the view engine
  await app.register(fastifyView, {
    engine: { handlebars },
    root: join(__dirname, 'views'),
    layout: join('layout.hbs'),
    includeViewExtension: true, // Allows omitting .hbs in @Render decorator
  });

  // 3. Setup Swagger/OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle('BE UI API')
    .setDescription('Backend UI API with authentication and dashboard')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('dashboard', 'Dashboard endpoints')
    .addCookieAuth('session', {
      type: 'apiKey',
      in: 'cookie',
      name: 'session',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'BE UI API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT ?? 8080;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

void bootstrap();
