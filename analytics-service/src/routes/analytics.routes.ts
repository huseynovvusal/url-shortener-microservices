import { AnalyticsController } from '@analytics-service/controllers/analytics.controller';
import { Router } from 'express';

export const createAnalyticsRouter = (controller: AnalyticsController) => {
  const router = Router();

  router.get('/:urlId', controller.getUrlAnalytics.bind(controller));
  router.post('/urls', controller.getMultipleUrlAnalytics.bind(controller));

  return router;
};
