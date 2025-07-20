import { UserRepository } from '@user-service/repositories/user.repository';
import { MockPrismaClient, mockUser } from '@user-service/__mocks__/prisma';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockPrismaClient: MockPrismaClient;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrismaClient = new MockPrismaClient();
    userRepository = new UserRepository(mockPrismaClient as any);
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const userData = {
        email: mockUser.email,
        username: mockUser.username,
        password: mockUser.password,
      };

      const user = await userRepository.create(userData);

      expect(user).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          email: userData.email,
          username: userData.username,
        })
      );

      expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
        data: userData,
      });
    });
  });
});
