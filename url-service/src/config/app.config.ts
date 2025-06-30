import env from '@config/env';

const appConfig = {
  env: env.NODE_ENV,
  port: env.PORT,
  baseUrl: env.BASE_URL,
  userServiceUrl: env.USER_SERVICE_URL,
  rabbitMqUrl: env.RABBITMQ_URL,
};

export type AppConfig = typeof appConfig;

export default appConfig;
