import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';
import appConfig from '@config/app.config';
import { StatusCodes } from 'http-status-codes';
import { logger } from '@huseynovvusal/url-shortener-shared';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());

// Routes
app.use(
  '/api/users',
  createProxyMiddleware({
    target: appConfig.userServiceUrl,
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/api/users': '/users' },
    on: {
      error: (err, _req, _res) => {
        logger.error(`Proxy error for user service:`, err.message);
      },
      start: (_proxyReq, _req, _res) => {
        console.log(`Starting proxy for user service`);
      },
      proxyReq: (_proxyReq, req) => {
        logger.info(`Proxying request for user service: ${req.method} ${_proxyReq.path}`);
      },
    },
  })
);
app.use(
  '/api/urls',
  createProxyMiddleware({
    target: appConfig.urlServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/api/urls': '/urls' },
  })
);
app.use(
  '/api/analytics',
  createProxyMiddleware({
    target: appConfig.analyticsServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/api/analytics': '/analytics' },
  })
);

// Health Check Route
app.get('/health', (_req, res) => {
  res.status(StatusCodes.OK).json({ status: 'OK' });
});

export default app;
