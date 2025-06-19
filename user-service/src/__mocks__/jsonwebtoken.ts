const mockJsonWebToken = {
  sign: jest.fn().mockReturnValue('test-token'),
  verify: jest.fn().mockImplementation((token) => {
    if (token === 'valid-token') {
      return { userId: 'test-user-id', email: 'test@example.com' };
    }
    throw new Error('Invalid token');
  }),
};

export default mockJsonWebToken;
