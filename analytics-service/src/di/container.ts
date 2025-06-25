import { createAnalyticsConsumer } from '@analytics-service/consumers/analytics.consumer';
import { createAnalyticsController } from '@analytics-service/controllers/analytics.controller';
import { createURLAnalyticsRepository } from '@analytics-service/repositories/url-analytics.repository';
import { createAnalyticsRouter } from '@analytics-service/routes/analytics.routes';
import { createAnalyticsService } from '@analytics-service/services/analytics.service';
import mongoose from 'mongoose';

// Repositories
const urlAnalyticsRepository = createURLAnalyticsRepository();

// Services
const analyticsService = createAnalyticsService(urlAnalyticsRepository);

// Middlewares

// Controllers
const analyticsController = createAnalyticsController(analyticsService);

// Routers
const analyticsRouter = createAnalyticsRouter(analyticsController);

// Consumers
const analyticsConsumer = createAnalyticsConsumer(analyticsService);

export const container = {
  repositories: {
    urlAnalyticsRepository,
  },
  services: {
    analyticsService,
  },
  controllers: {
    analyticsController,
  },
  routers: {
    analyticsRouter,
  },
  middlewares: {},
  consumers: {
    analyticsConsumer,
  },
};

export const closeConnections = async () => {
  await mongoose.disconnect();
};
