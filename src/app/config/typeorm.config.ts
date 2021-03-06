import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import env from './env';
import { User } from '../user/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User],
  // TODO: production시 false로 바꿔야함
  // production 모드일때 false로 바뀌는 로직 필요
  synchronize: true,
  uuidExtension: 'pgcrypto' || 'uuid-ossp',
};
