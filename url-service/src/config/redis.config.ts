import env from '@config/env';

const redisConfig = {
  url: env.REDIS_URL,
  ttl: {
    shortUrl: env.SHORT_URL_CACHE_TTL,
  },
};

export type RedisConfig = typeof redisConfig;

export default redisConfig;
