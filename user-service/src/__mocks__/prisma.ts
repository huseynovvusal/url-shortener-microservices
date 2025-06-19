export const mockUser = {
  id: '1',
  email: 'test@example.com',
  username: 'testuser',
  password: '$2b$10$test_password_hash',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockPrismaClient = {
  user: {
    create: jest.fn().mockResolvedValue(mockUser),
    findUnique: jest.fn().mockImplementation(({ where }) => {
      if (where.email === 'test@example.com') {
        return Promise.resolve(mockUser);
      }

      return Promise.resolve(null);
    }),
    findFirst: jest.fn().mockResolvedValue(mockUser),
    findById: jest.fn().mockImplementation(({ where }) => {
      if (where.id === '1') {
        return Promise.resolve(mockUser);
      }
      return Promise.resolve(null);
    }),
  },
};
