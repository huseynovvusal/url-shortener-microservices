import { UserRepository } from '@user-service/repositories/user.repository';
import { mockPrismaClient, mockUser } from '@user-service/__mocks__/prisma';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = new UserRepository(mockPrismaClient as any);
  });

  describe('create', () => {
    it('should create and resturn a user', async () => {
      const userData = {
        ...mockUser,
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
