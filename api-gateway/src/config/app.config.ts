import env from '@config/env';

const appConfig = {
  env: env.NODE_ENV,
  port: env.PORT,
  rabbitMqUrl: env.RABBITMQ_URL,
};

export type AppConfig = typeof appConfig;

export default appConfig;
