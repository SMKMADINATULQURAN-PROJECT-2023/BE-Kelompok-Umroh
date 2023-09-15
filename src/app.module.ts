import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './app/auth/auth.module';
import { MailModule } from './app/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UniqueValidator } from './utils/validator/unique.validator';
import { UploadModule } from './app/upload/upload.module';
import { SiswaModule } from './app/siswa/siswa.module';
import { CatatanModule } from './app/catatan/catatan.module';
import { AdminSeeder } from './seeds/admin.seed';
import { RoleActionSeeder } from './seeds/role_action.seed';
import { LokasiZiarahModule } from './app/lokasi_ziarah/lokasi_ziarah.module';
import { GaleriModule } from './app/galeri/galeri.module';
import { DzikirPagiPetangModule } from './app/dzikir_pagi_petang/dzikir_pagi_petang.module';
import { DoaModule } from './app/doa/doa.module';
import { ArtikelModule } from './app/artikel/artikel.module';
import { TravelModule } from './app/travel/travel.module';
import { CloudinaryModule } from './app/cloudinary/cloudinary.module';
import { AdminModule } from './app/admin/admin.module';
import { Admin } from './app/admin/entities/admin.entity';
import { Role } from './app/role/entity/role.entity';
import { Action } from './app/action/entity/action.entity';
import { RoleModule } from './app/role/role.module';
import { ActionModule } from './app/action/action.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Admin, Role, Action]),
    AuthModule,
    MailModule,
    UploadModule,
    SiswaModule,
    CatatanModule,
    LokasiZiarahModule,
    GaleriModule,
    DzikirPagiPetangModule,
    DoaModule,
    UploadModule,
    GaleriModule,
    ArtikelModule,
    TravelModule,
    CloudinaryModule,
    AdminModule,
    RoleModule,
    ActionModule,
  ],
  controllers: [AppController],
  providers: [AppService, UniqueValidator, AdminSeeder, RoleActionSeeder],
})
export class AppModule {}
