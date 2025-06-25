import env from '@analytics-service/config/env';

const dbConfig = {
  url: env.DATABASE_URL,
};

export type DbConfig = typeof dbConfig;

export default dbConfig;
