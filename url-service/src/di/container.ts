import appConfig from '@user-service/config/app.config';
import { createUrlController } from '@user-service/controllers/url.controller';
import { connectDatabase } from '@user-service/helpers/connect-db';
import { createAuthMiddleware } from '@user-service/middlewares/auth.middleware';
import { createUrlRepository } from '@user-service/repositories/url.repository';
import { createUrlRouter } from '@user-service/routes/url.routes';
import { createAuthService } from '@user-service/services/auth.service';
import { createUrlService } from '@user-service/services/url.service';
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
