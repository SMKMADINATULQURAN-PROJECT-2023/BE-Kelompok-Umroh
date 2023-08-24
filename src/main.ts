import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AdminSeeder } from './seeds/admin.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Inisialisasi dan jalankan seeder di sini
  const adminSeeder = app.get(AdminSeeder);
  await adminSeeder.create();
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(5002);
}
bootstrap();
