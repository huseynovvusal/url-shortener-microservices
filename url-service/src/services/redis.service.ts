import { RedisConfig } from '@url-service/config/redis.config';
import { createClient, RedisClientType } from 'redis';
import { logger } from '@huseynovvusal/url-shortener-shared';

export class RedisService {
  private client: RedisClientType;

  constructor(private readonly redisConfig: RedisConfig) {
    this.client = createClient({
      url: this.redisConfig.url,
    });

    this.client.on('error', (err: Error) => {
      logger.error('Redis Client Error', err);
    });
  }

  public async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();

      logger.info('Connected to Redis');
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);

    if (value === null) return null;

    try {
      const result: T = await JSON.parse(value);
      return result;
    } catch (error) {
      return null;
    }
  }

  public async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, JSON.stringify(value), {
        EX: ttl,
      });
    } else {
      await this.client.set(key, JSON.stringify(value));
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.disconnect();

      logger.info('Disconnected from Redis');
    }
  }
}
