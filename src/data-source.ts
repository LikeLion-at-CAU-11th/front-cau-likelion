import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import dotenv from 'dotenv';
dotenv.config();
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.USER_ID,
  password: process.env.PASSWORD,
  database: 'user',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});