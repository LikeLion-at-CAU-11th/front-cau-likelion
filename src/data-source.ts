import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import dotenv from 'dotenv';
import { FCMToken } from './entity/FCMToken';
import { Feed } from './entity/Feed';
dotenv.config();
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.USER_ID,
  password: process.env.PASSWORD,
  database: 'user',
  synchronize: true,
  charset: 'utf8mb4_unicode_ci',
  logging: false,
  entities: [User, FCMToken, Feed],
  migrations: [],
  subscribers: [],
});
