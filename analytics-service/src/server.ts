import { logger } from '@huseynovvusal/url-shortener-shared';
import appConfig from '@config/app.config';
import app from '@analytics-service/app';
import { connectDatabase } from './helpers/connect-db';
import { Server } from 'node:http';

const PORT = appConfig.port;

let server: Server;

const startServer = async () => {
  try {
    await connectDatabase();

    server = app.listen(PORT, () => {
      logger.info(`Analytics Service is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

const shutdown = async () => {
  logger.info('Shutting down server...');

  server.close(async () => {
    logger.info('Server shut down successfully');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
