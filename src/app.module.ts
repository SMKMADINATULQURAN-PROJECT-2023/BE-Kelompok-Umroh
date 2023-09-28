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
import { AdminMiddleware } from './utils/middleware/admin.middleware';
import { JwtService } from '@nestjs/jwt';
import { AdminController } from './app/admin/admin.controller';
import { DoaController } from './app/doa/doa.controller';
import { LokasiZiarahController } from './app/lokasi_ziarah/lokasi_ziarah.controller';
import { ActionController } from './app/action/action.controller';
import { RoleController } from './app/role/role.controller';
import { ArtikelMiddleware } from './utils/middleware/artikel.middleware';
import { ArtikelController } from './app/artikel/artikel.controller';
import { DoaSeeder } from './seeds/doa.seed';
import { Doa } from './app/doa/entity/doa.entity';
import { PanduanModule } from './app/panduan/panduan.module';

import { DzikirPagiSeeder } from './seeds/dzikirPagi.seed';
import { DzikirPagi } from './app/dzikir_pagi_petang/entity/dzikir_pagi.entity';
import { DzikirPetang } from './app/dzikir_pagi_petang/entity/dzikir_petang.entity';
import { DzikirPetangSeeder } from './seeds/dzikirPetang.seed';
import { UserModule } from './app/user/user.module';

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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UniqueValidator,
    AdminSeeder,
    RoleActionSeeder,
    DoaSeeder,
    DzikirPagiSeeder,
    DzikirPetangSeeder,
    JwtService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude({ path: 'admin/login', method: RequestMethod.POST })
      .forRoutes(
        AdminController,
        ActionController,
        RoleController,
        DoaController,
        LokasiZiarahController,
      ); // Sesuaikan dengan rute yang ingin Anda proteksi.
    consumer.apply(ArtikelMiddleware).forRoutes(ArtikelController); // Sesuaikan dengan rute yang ingin Anda proteksi.
  }
}
