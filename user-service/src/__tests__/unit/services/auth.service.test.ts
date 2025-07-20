import { MockPrismaClient } from '@user-service/__mocks__/prisma';
import { RegisterUserDto } from '@user-service/dtos/user.dto';
import { UserRepository } from '@user-service/repositories/user.repository';
import { AuthService } from '@user-service/services/auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let mockPrismaClient: MockPrismaClient;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrismaClient = new MockPrismaClient();
    userRepository = new UserRepository(mockPrismaClient as any);
    authService = new AuthService(userRepository);
  });

  it('should register a new user', async () => {
    const userData: RegisterUserDto = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'test_password',
    };

    const result = await authService.register(userData);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: userData.email,
        username: userData.username,
        createdAt: expect.any(Date),
      })
    );

    expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
      data: { ...userData, password: expect.any(String) },
    });
  });
});
