import { AuthController } from '@user-service/controllers/auth.controller';
import { validateRequest } from '@user-service/middlewares/validation.middleware';
import {
  loginSchema,
  registerSchema,
} from '@user-service/validations/auth.schema';
import { Router } from 'express';

export const createAuthRouter = (authController: AuthController) => {
  const router = Router();

  router.post(
    '/register',
    validateRequest(registerSchema),
    authController.register.bind(authController)
  );

  router.post(
    '/login',
    validateRequest(loginSchema),
    authController.login.bind(authController)
  );

  router.get('/me', authController.me.bind(authController));

  router.get(
    '/validate-token',
    authController.validateToken.bind(authController)
  );

  return router;
};
