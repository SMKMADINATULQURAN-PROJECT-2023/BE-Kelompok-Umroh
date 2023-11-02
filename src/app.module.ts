import { Delete } from '@nestjs/common/decorators';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { JwtService } from '@nestjs/jwt';
import { AdminController } from './app/admin/admin.controller';
import { Doa } from './app/doa/entity/doa.entity';
import { PanduanModule } from './app/panduan/panduan.module';
import { DzikirPagiSeeder } from './seeds/dzikirPagi.seed';
import { DzikirPagi } from './app/dzikir_pagi_petang/entity/dzikir_pagi.entity';
import { DzikirPetang } from './app/dzikir_pagi_petang/entity/dzikir_petang.entity';
import { DzikirPetangSeeder } from './seeds/dzikirPetang.seed';
import { UserModule } from './app/user/user.module';
import { KategoriDoa } from './app/doa/entity/category_doa.entity';
import { TrafficModule } from './app/traffic/traffic.module';
import { UserMiddleware } from './utils/middleware/user/user.middleware';
import { AdminMiddleware } from './utils/middleware/admin/admin.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([
      Admin,
      Role,
      Action,
      Doa,
      KategoriDoa,
      DzikirPagi,
      DzikirPetang,
    ]),
    AuthModule,
    MailModule,
    LokasiZiarahModule,
    DzikirPagiPetangModule,
    DoaModule,
    GaleriModule,
    ArtikelModule,
    TravelModule,
    CloudinaryModule,
    AdminModule,
    RoleModule,
    ActionModule,
    PanduanModule,
    UserModule,
    TrafficModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UniqueValidator,
    AdminSeeder,
    RoleActionSeeder,
    DzikirPagiSeeder,
    DzikirPetangSeeder,
    JwtService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes(
        { path: 'auth/profile', method: RequestMethod.GET },
        { path: 'auth/update-profile', method: RequestMethod.PUT },
        { path: 'user/refresh-token', method: RequestMethod.POST },
        { path: 'doa', method: RequestMethod.GET },
        { path: 'doa/kategori', method: RequestMethod.GET },
        { path: 'lokasi_ziarah', method: RequestMethod.GET },
        { path: 'lokasi_ziarah', method: RequestMethod.GET },
        { path: 'dzikir/pagi', method: RequestMethod.GET },
        { path: 'dzikir/petang', method: RequestMethod.GET },
        { path: 'panduan', method: RequestMethod.GET },
      );
    consumer
      .apply(AdminMiddleware)
      .exclude(
        { path: 'admin/login', method: RequestMethod.POST },
        { path: 'artikel', method: RequestMethod.GET },
        { path: 'doa', method: RequestMethod.GET },
        { path: 'doa/kategori', method: RequestMethod.GET },
        { path: 'lokasi_ziarah', method: RequestMethod.GET },
        { path: 'panduan', method: RequestMethod.GET },
      )
      .forRoutes(
        { path: 'auth/profile-admin', method: RequestMethod.GET },
        { path: 'auth/update-profile-admin', method: RequestMethod.PUT },
        AdminController,
        { path: 'artikel/create', method: RequestMethod.POST },
        { path: 'artikel/:id', method: RequestMethod.GET },
        { path: 'artikel/update/:id', method: RequestMethod.PUT },
        { path: 'artikel/delete/:id', method: RequestMethod.DELETE },
        { path: 'doa/create', method: RequestMethod.POST },
        { path: 'doa/:id', method: RequestMethod.GET },
        { path: 'doa/update/:id', method: RequestMethod.PUT },
        { path: 'doa/delete/:id', method: RequestMethod.DELETE },
        { path: 'doa/kategori/create', method: RequestMethod.POST },
        { path: 'doa/kategori/:id', method: RequestMethod.GET },
        { path: 'doa/kategori/update/:id', method: RequestMethod.PUT },
        { path: 'doa/kategori/delete/:id', method: RequestMethod.DELETE },
        { path: 'lokasi_ziarah/create', method: RequestMethod.POST },
        { path: 'lokasi_ziarah/:id', method: RequestMethod.GET },
        { path: 'lokasi_ziarah/update/:id', method: RequestMethod.PUT },
        { path: 'lokasi_ziarah/delete/:id', method: RequestMethod.DELETE },
        { path: 'panduan/create', method: RequestMethod.POST },
        { path: 'panduan/:id', method: RequestMethod.GET },
        { path: 'panduan/update/:id', method: RequestMethod.PUT },
        { path: 'panduan/delete/:id', method: RequestMethod.DELETE },
        { path: 'user', method: RequestMethod.GET },
        { path: 'user/:id', method: RequestMethod.GET },
      ); // Sesuaikan dengan rute yang ingin Anda proteksi.
  }
}
