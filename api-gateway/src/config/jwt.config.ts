import env from '@api-gateway/config/env';
import { SignOptions } from 'jsonwebtoken';

const jwtConfig = {
  secret: env.JWT_SECRET,
  expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
};

export type JwtConfig = typeof jwtConfig;

export default jwtConfig;
