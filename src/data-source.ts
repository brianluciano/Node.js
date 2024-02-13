import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [
    process.env.NODE_ENV === 'dev'
      ? './src/entity/**/*.ts'
      : './build/entity/**/*.js'
  ],
  migrations: [
    process.env.NODE_ENV === 'dev'
      ? './src/migration/**/*.ts'
      : './build/migration/**/*.js'
  ],
  subscribers: [],
  migrationsTableName: 'migrations'
});
