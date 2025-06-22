import { UrlController } from '@url-service/controllers/url.controller';
import { AuthMiddleware } from '@url-service/middlewares/auth.middleware';
import { validateRequest } from '@url-service/middlewares/validation.middleware';
import {
  createSchema,
  deleteUrlSchema,
  getByShortCodeSchema,
  getUserUrlsSchema,
} from '@url-service/validations/url.schema';
import { Router } from 'express';

export const createUrlRouter = (
  urlController: UrlController,
  authMiddleware: AuthMiddleware
) => {
  const router = Router();

  router.post(
    '/',
    authMiddleware.authenticate.bind(authMiddleware),
    validateRequest(createSchema),
    urlController.create
  );

  router.get(
    '/:shortCode',
    authMiddleware.authenticate.bind(authMiddleware),
    validateRequest(getByShortCodeSchema),
    urlController.getByShortCode
  );

  router.get(
    '/user',
    authMiddleware.authenticate.bind(authMiddleware),
    validateRequest(getUserUrlsSchema),
    urlController.getUrlsByUserId
  );

  router.delete(
    '/:id',
    authMiddleware.authenticate.bind(authMiddleware),
    validateRequest(deleteUrlSchema),
    urlController.deleteUrl
  );

  return router;
};
