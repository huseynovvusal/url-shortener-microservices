import { UnauthorizedError } from '@huseynovvusal/url-shortener-shared';
import { AppConfig } from '@url-service/config/app.config';
import axios from 'axios';

export interface UserResponseDto {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export class AuthService {
  constructor(private readonly appConfig: AppConfig) {}

  async validateToken(token: string): Promise<UserResponseDto> {
    try {
      const url = `${this.appConfig.userServiceUrl}/validate-token`;

      const response = await axios.get<UserResponseDto>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          throw new UnauthorizedError('Invalid or expired token');
        }
      }

      throw new UnauthorizedError('Failed to validate token');
    }
  }

  extractTokenFromHeader(authorizationHeader?: string): string {
    if (!authorizationHeader) {
      throw new UnauthorizedError('Authorization header is missing');
    }

    const [type, token] = authorizationHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedError('Invalid authorization header format');
    }

    return token;
  }
}

export const createAuthService = (appConfig: AppConfig) =>
  new AuthService(appConfig);
