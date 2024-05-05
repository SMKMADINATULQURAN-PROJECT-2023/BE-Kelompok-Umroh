import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST_TEST,
  port: parseInt(process.env.PORT), //port default 3306 lihat xampp
  username: process.env.DB_USERNAME_TEST, // username default xampp root
  password: process.env.DB_PASSWORD_TEST, // password default xampp string kosong
  database: process.env.DB_NAME_TEST,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
};
