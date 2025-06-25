import { AnalyticsController } from '@analytics-service/controllers/analytics.controller';
import { Router } from 'express';

export const createAnalyticsRouter = (controller: AnalyticsController) => {
  const router = Router();

  router.post('/clicl/:urlId', controller.recordClick.bind(controller));
  router.get('/:urlId', controller.getUrlAnalytics.bind(controller));
  router.post('/urls', controller.getMultipleUrlAnalytics.bind(controller));

  return router;
};
