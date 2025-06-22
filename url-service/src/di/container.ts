import appConfig from '@url-service/config/app.config';
import { createUrlController } from '@url-service/controllers/url.controller';
import { connectDatabase } from '@url-service/helpers/connect-db';
import { createAuthMiddleware } from '@url-service/middlewares/auth.middleware';
import { createUrlRepository } from '@url-service/repositories/url.repository';
import { createUrlRouter } from '@url-service/routes/url.routes';
import { createAuthService } from '@url-service/services/auth.service';
import { createUrlService } from '@url-service/services/url.service';
import mongoose from 'mongoose';

connectDatabase();

// Repositories
const urlRepository = createUrlRepository();

// Services
const authService = createAuthService(appConfig);
const urlService = createUrlService(urlRepository, appConfig);

// Middlewares
const authMiddleware = createAuthMiddleware(authService);

// Controllers
const urlController = createUrlController(urlService);

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
};

export const closeConnections = async () => {
  await mongoose.disconnect();
};
