import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AdminSeeder } from './seeds/admin.seed';
import { RoleActionSeeder } from './seeds/role_action.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Inisialisasi dan jalankan seeder di sini
  try {
    const roleActionSeeder = app.get(RoleActionSeeder);
    await roleActionSeeder.create();
    const adminSeeder = app.get(AdminSeeder);
    await adminSeeder.create();
  } catch (error) {
    console.error('Seeder error:', error);
  }

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
