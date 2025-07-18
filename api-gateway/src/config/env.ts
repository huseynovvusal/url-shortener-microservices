import { z } from 'zod';
import { logger } from '@huseynovvusal/url-shortener-shared';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  USER_SERVICE_URL: z.string().url(),
  URL_SERVICE_URL: z.string().url(),
  ANALYTICS_SERVICE_URL: z.string().url(),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('60000'), // 1 minute
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'), // 100 requests per window
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

export type EnvConfig = z.infer<typeof envSchema>;

function validateEnv(env: NodeJS.ProcessEnv): EnvConfig {
  const parsed = envSchema.safeParse(env);

  if (!parsed.success) {
    logger.error('Invalid environment variables:', parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
}

const env = validateEnv(process.env);

export default env;
