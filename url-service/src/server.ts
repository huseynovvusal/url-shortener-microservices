import { logger } from '@huseynovvusal/url-shortener-shared';
import appConfig from '@config/app.config';
import app from '@url-service/app';
import { connectDatabase } from './helpers/connect-db';
import { Server } from 'node:http';
import { container } from './di/container';

const PORT = appConfig.port;

let server: Server;

const startServer = async () => {
  try {
    await connectDatabase();

    await container.producers.analyticsProducer
      .connect(appConfig.rabbitMqUrl)
      .catch(logger.error);

    await container.services.redisService.connect();

    server = app.listen(PORT, () => {
      logger.info(`URL Service is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

const shutdown = async () => {
  logger.info('Shutting down server...');

  await container.services.redisService.disconnect();
  await container.producers.analyticsProducer.close();

  server.close(async () => {
    logger.info('Server shut down successfully');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
