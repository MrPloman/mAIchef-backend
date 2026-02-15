import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3333', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres123',
  database: process.env.DB_DATABASE || 'maichef_db',
  autoLoadEntities: true, // ⬅️ Debe estar en true
  synchronize: true, // ⬅️ Debe estar en true para desarrollo
  logging: true, // ⬅️ Activa logs para ver qué pasa
});
