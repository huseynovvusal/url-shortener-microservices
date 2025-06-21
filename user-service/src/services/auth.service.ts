import {
  LoginUserDto,
  RegisterUserDto,
  UserResponseDto,
} from '@user-service/dtos/user.dto';
import { User } from '@user-service/generated/prisma';
import { UserRepository } from '@user-service/repositories/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@huseynovvusal/url-shortener-shared';
import jwtConfig from '@user-service/config/jwt.config';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(userData: RegisterUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new BadRequestError('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.mapUserToDto(user);
  }

  public async login(loginData: LoginUserDto): Promise<{
    user: UserResponseDto;
    token: string;
  }> {
    const user = await this.userRepository.findByEmail(loginData.email);

    if (!user) {
      throw new BadRequestError('Wrong email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new BadRequestError('Wrong email or password');
    }

    const token = this.generateToken(user);

    return {
      user: this.mapUserToDto(user),
      token,
    };
  }

  async validateToken(token: string): Promise<UserResponseDto> {
    try {
      const payload = jwt.verify(token, jwtConfig.secret) as { userId: string };

      const user = await this.userRepository.findById(payload.userId);

      if (!user) {
        throw new BadRequestError('User not found');
      }

      return this.mapUserToDto(user);
    } catch (error) {
      throw new BadRequestError('Invalid token');
    }
  }

  private generateToken(user: User): string {
    return jwt.sign({ userId: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
  }

  private mapUserToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    };
  }
}

export const createAuthService = (userRepository: UserRepository) =>
  new AuthService(userRepository);
