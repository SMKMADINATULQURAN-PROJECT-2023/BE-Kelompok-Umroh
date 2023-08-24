import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './app/auth/auth.module';
import { MailModule } from './app/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './app/upload/upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UniqueValidator } from './utils/validator/unique.validator';
import { UploadModule } from './app/upload/upload.module';
import { SiswaModule } from './app/siswa/siswa.module';
import { CatatanModule } from './app/catatan/catatan.module';
import { AdminSeeder } from './seeds/admin.seed';
import { Admin } from './app/auth/entity/admin.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Admin]),
    AuthModule,
    MailModule,
    UploadModule,
    SiswaModule,
    CatatanModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, UniqueValidator, AdminSeeder],
})
export class AppModule {}
