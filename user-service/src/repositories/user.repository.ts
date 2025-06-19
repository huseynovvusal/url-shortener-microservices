import { RegisterUserDto } from '@user-service/dtos/user.dto';
import { PrismaClient } from '@user-service/generated/prisma';
import { User } from '@user-service/interfaces/user.interface';

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(userData: RegisterUserDto): Promise<User> {
    return this.prisma.user.create({
      data: userData,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}

export const createUserRepository = (prisma: PrismaClient) =>
  new UserRepository(prisma);
