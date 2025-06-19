process.env.NODE_ENV = 'test';
process.env.PORT = '4001';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRATION = '1h';
process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/users_test_db';