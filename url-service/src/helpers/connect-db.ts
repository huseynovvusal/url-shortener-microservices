import dbConfig from '@user-service/config/db.config';
import mongoose from 'mongoose';

export const connectDatabase = async () => {
  mongoose
    .connect(dbConfig.url)
    .then((value) =>
      console.log(`MongoDB Connection Successful: ${value.connection.host}`)
    )
    .catch((error) => {
      console.log('MongoDB Connection Error:', error);

      process.exit(1);
    });
};
