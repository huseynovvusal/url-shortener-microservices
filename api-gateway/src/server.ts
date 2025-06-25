import { logger } from '@huseynovvusal/url-shortener-shared';
import appConfig from '@config/app.config';
import app from '@api-gateway/app';
import { Server } from 'node:http';

const PORT = appConfig.port;

let server: Server;

const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      logger.info(`API Gateway is running on port ${PORT}`);
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
