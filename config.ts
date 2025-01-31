import dotenv from 'dotenv';
import Config from './interfaces/Config.js';

dotenv.config();

const config: Config = {
  port: process.env.PORT || '3000',
  databaseUri: process.env.DATABASE_URI || '',
};

export default config;
