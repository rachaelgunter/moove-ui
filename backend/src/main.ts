import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const originsString: string = configService.get('ALLOWED_ORIGINS');

  app.enableCors({
    origin: originsString.split(' '),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.get('SERVER_PORT') ?? 3000);
}
bootstrap();
