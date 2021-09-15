import * as dotenv from 'dotenv';
import getEnviroment from './get-enviroment';

dotenv.config();

const enviroment = {
  DB_HOST: getEnviroment('DB_HOST'),
  DB_PORT: getEnviroment('DB_PORT'),
  DB_USER: getEnviroment('DB_USER'),
  DB_PASSWORD: getEnviroment('DB_PASSWORD'),
  DB_NAME: process.env.NODE_ENV === 'test' ? 'test' : getEnviroment('DB_NAME'),
};

export default enviroment;
