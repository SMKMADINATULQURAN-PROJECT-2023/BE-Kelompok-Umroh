import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3308, //port default 3306 lihat xampp
  username: process.env.DB_USERNAME || 'root', // username default xampp root
  password: process.env.DB_PASSWORD || 'root', // password default xampp string kosong
  database: process.env.DB_DATABASE || 'rusman_project',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
