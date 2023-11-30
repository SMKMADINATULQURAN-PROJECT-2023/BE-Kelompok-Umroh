import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AdminSeeder } from './utils/seeds/admin.seed';
import { DzikirPagiSeeder } from './utils/seeds/dzikirPagi.seed';
import { DzikirPetangSeeder } from './utils/seeds/dzikirPetang.seed';
import * as dotenv from 'dotenv';
import { RolesMenuSeeder } from './utils/seeds/rolesMenu.seed';
import * as compression from 'compression';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());

  // Inisialisasi dan jalankan seeder di sini
  const rolesMenuSeeder = app.get(RolesMenuSeeder);
  await rolesMenuSeeder.create();

  const adminSeeder = app.get(AdminSeeder);
  await adminSeeder.create();

  const dzikirPagi = app.get(DzikirPagiSeeder);
  await dzikirPagi.create();

  const dzikirPetang = app.get(DzikirPetangSeeder);
  await dzikirPetang.create();

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
  await app.listen(process.env.PORT_API, () => {
    Logger.debug(
      `Server berjalan di http://localhost:${process.env.PORT_API}`,
      'Bootstrap',
    );
  });
}
bootstrap();
