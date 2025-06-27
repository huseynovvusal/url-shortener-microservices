import env from '@config/env';

const appConfig = {
  env: env.NODE_ENV,
  port: env.PORT,
  urlServiceUrl: env.URL_SERVICE_URL,
  userServiceUrl: env.USER_SERVICE_URL,
  analyticsServiceUrl: env.ANALYTICS_SERVICE_URL,
  rabbitMqUrl: env.RABBITMQ_URL,
};

export type AppConfig = typeof appConfig;

export default appConfig;
