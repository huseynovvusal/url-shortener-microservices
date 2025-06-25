import dbConfig from '@url-service/config/db.config';
import mongoose from 'mongoose';
import { logger } from '@huseynovvusal/url-shortener-shared';

export const connectDatabase = async () => {
  return mongoose
    .connect(dbConfig.url)
    .then((value) =>
      logger.info(
        `MongoDB Connection Successful: ${value.connection.host}:${value.connection.port}/${value.connection.name}`
      )
    )
    .catch((error) => {
      logger.error('MongoDB Connection Error:', error);

      process.exit(1);
    });
};
