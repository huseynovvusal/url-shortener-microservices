import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@url-service/services/auth.service';
import { StatusCodes } from 'http-status-codes';

export class AuthMiddleware {
  constructor(private readonly authService: AuthService) {}

  public async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = this.authService.extractTokenFromHeader(
        req.headers.authorization
      );

      const user = await this.authService.validateToken(token);

      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  }
}

export const createAuthMiddleware = (authService: AuthService) =>
  new AuthMiddleware(authService);
