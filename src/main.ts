import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AdminSeeder } from './seeds/admin.seed';
import { RoleActionSeeder } from './seeds/role_action.seed';
import { DoaSeeder } from './seeds/doa.seed';
import { DzikirPagiSeeder } from './seeds/dzikirPagi.seed';
import { DzikirPetangSeeder } from './seeds/dzikirPetang.seed';
import * as admin from 'firebase-admin';
import * as serviceAccount from './utils/json/serviceAccount.json';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
  const app = await NestFactory.create(AppModule);
  // Inisialisasi dan jalankan seeder di sini

  const roleActionSeeder = app.get(RoleActionSeeder);
  await roleActionSeeder.create();
  const adminSeeder = app.get(AdminSeeder);
  await adminSeeder.create();
  const doaSeeder = app.get(DoaSeeder);
  await doaSeeder.create();
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
  await app.listen(5002);
}
bootstrap();
