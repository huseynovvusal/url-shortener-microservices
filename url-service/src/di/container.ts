import appConfig from '@url-service/config/app.config';
import { createUrlController } from '@url-service/controllers/url.controller';
import { createAuthMiddleware } from '@url-service/middlewares/auth.middleware';
import { createAnalyticsProducer } from '@url-service/producers/analytics.producer';
import { createUrlRepository } from '@url-service/repositories/url.repository';
import { createUrlRouter } from '@url-service/routes/url.routes';
import { createAuthService } from '@url-service/services/auth.service';
import { createUrlService } from '@url-service/services/url.service';
import mongoose from 'mongoose';

// Repositories
const urlRepository = createUrlRepository();

// Services
const authService = createAuthService(appConfig);
const urlService = createUrlService(urlRepository, appConfig);

// Producers
const analyticsProducer = createAnalyticsProducer();

// Middlewares
const authMiddleware = createAuthMiddleware(authService);

// Controllers
const urlController = createUrlController(urlService, analyticsProducer);

// Routers
const urlRouter = createUrlRouter(urlController, authMiddleware);

export const container = {
  repositories: {
    urlRepository,
  },
  services: {
    authService,
    urlService,
  },
  controllers: {
    urlController,
  },
  routers: {
    urlRouter,
  },
  middlewares: {
    authMiddleware,
  },
  producers: {
    analyticsProducer,
  },
};

export const closeConnections = async () => {
  await mongoose.disconnect();
};
