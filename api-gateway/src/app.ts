import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { createProxyMiddleware } from 'http-proxy-middleware';
import appConfig from '@config/app.config';
import { StatusCodes } from 'http-status-codes';
import { rateLimitter } from './middlewares/rate-limit.middleware';

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(hpp());

// Rate Limiting Middleware
app.use(rateLimitter);

// Routes
app.use(
  '/api/users',
  createProxyMiddleware({
    target: appConfig.userServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/api/users': '/users' },
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

// Redirect route for short URLs
app.get(
  '/:shortCode',
  createProxyMiddleware({
    target: appConfig.urlServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/': '/' },
  })
);

export default app;
