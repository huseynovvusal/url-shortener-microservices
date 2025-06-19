import { PrismaClient } from '@user-service/generated/prisma';
import { createUserRepository } from '@user-service/repositories/user.repository';
import { createAuthService } from '@user-service/services/auth.service';
import { createAuthController } from '@user-service/controllers/auth.controller';
import { createAuthRouter } from '@user-service/routes/auth.routes';

// Database client
const prisma = new PrismaClient();

// Repositories
const userRepository = createUserRepository(prisma);

// Services
const authService = createAuthService(userRepository);

// Controllers
const authController = createAuthController(authService);

// Routers
const authRouter = createAuthRouter(authController);

export const container = {
  prisma,
  repositories: {
    userRepository,
  },
  services: {
    authService,
  },
  controllers: {
    authController,
  },
  routers: {
    authRouter,
  },
};

export const closeConnections = async () => {
  await prisma.$disconnect();
};
