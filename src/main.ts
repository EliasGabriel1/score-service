import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  const appName = configService.get('APP_NAME');

  app.setGlobalPrefix('api/v1');
  
  await app.listen(port);
  console.log(`🚀 ${appName} rodando em: http://localhost:${port}/api/v1`);
}
bootstrap();