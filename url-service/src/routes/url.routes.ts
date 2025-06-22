import { UrlController } from '@user-service/controllers/url.controller';
import { AuthMiddleware } from '@user-service/middlewares/auth.middleware';
import { validateRequest } from '@user-service/middlewares/validation.middleware';
import {
  createSchema,
  deleteUrlSchema,
  getByShortCodeSchema,
  getUserUrlsSchema,
} from '@user-service/validations/url.schema';
import { Router } from 'express';

export const createUrlRouter = (
  urlController: UrlController,
  authMiddleware: AuthMiddleware
) => {
  const router = Router();

  router.post(
    '/',
    authMiddleware.authenticate,
    validateRequest(createSchema),
    urlController.create
  );

  router.get(
    '/:shortCode',
    authMiddleware.authenticate,
    validateRequest(getByShortCodeSchema),
    urlController.getByShortCode
  );

  router.get(
    '/user',
    authMiddleware.authenticate,
    validateRequest(getUserUrlsSchema),
    urlController.getUrlsByUserId
  );

  router.delete(
    '/:id',
    authMiddleware.authenticate,
    validateRequest(deleteUrlSchema),
    urlController.deleteUrl
  );

  return router;
};
