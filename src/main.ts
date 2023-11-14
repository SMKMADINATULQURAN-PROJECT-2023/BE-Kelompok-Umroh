import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AdminSeeder } from './seeds/admin.seed';
import { RoleActionSeeder } from './seeds/role_action.seed';
import { DzikirPagiSeeder } from './seeds/dzikirPagi.seed';
import { DzikirPetangSeeder } from './seeds/dzikirPetang.seed';
import * as dotenv from 'dotenv';
import { MenuSeeder } from './seeds/menu.seed';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Inisialisasi dan jalankan seeder di sini
  const menuSeeder = app.get(MenuSeeder);
  await menuSeeder.create();
  const roleActionSeeder = app.get(RoleActionSeeder);
  await roleActionSeeder.create();
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
    console.table([{ HOST: `${process.env.BASE_CLIENT_URL}` }]);
  });
}
bootstrap();
