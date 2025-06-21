import { AuthController } from '@user-service/controllers/auth.controller';
import { validateRequest } from '@user-service/middlewares/validation.middleware';
import {
  loginSchema,
  registerSchema,
} from '@user-service/validations/auth.schema';
import { NextFunction, Request, Response, Router } from 'express';

export const createAuthRouter = (authController: AuthController) => {
  const router = Router();

  router.post(
    '/register',
    validateRequest(registerSchema),
    (req: Request, res: Response, next: NextFunction) => {
      authController.register(req, res, next);
    }
  );

  router.post(
    '/login',
    validateRequest(loginSchema),
    (req: Request, res: Response, next: NextFunction) => {
      authController.login(req, res, next);
    }
  );

  router.get('/me', (req: Request, res: Response, next: NextFunction) => {
    authController.me(req, res, next);
  });

  router.get(
    '/validate-token',
    (req: Request, res: Response, next: NextFunction) => {
      authController.validateToken(req, res, next);
    }
  );

  return router;
};
