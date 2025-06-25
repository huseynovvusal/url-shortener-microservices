import { logger } from '@huseynovvusal/url-shortener-shared';
import appConfig from '@config/app.config';
import app from '@user-service/app';
import { closeConnections } from './di/container';

const PORT = appConfig.port;

const server = app.listen(PORT, () => {
  logger.info(`User Service is running on port ${PORT}`);
});

const shutdown = async () => {
  logger.info('Shutting down server...');
  server.close(async () => {
    await closeConnections();
    logger.info('Server shut down successfully');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
