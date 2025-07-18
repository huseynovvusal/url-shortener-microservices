import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import { container } from './di/container';
import { StatusCodes } from 'http-status-codes';
import appConfig from './config/app.config';

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [appConfig.baseUrl],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(hpp());
// app.use(mongoSanitize());
app.use(express.json());

// Routes
app.use('/health-check', (_req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Url service is running' });
});
app.use('/', container.routers.urlRouter);

// Redirect route for short URLs
app.get(
  '/:shortCode',
  (_req, _res, next) => {
    console.log('>> Redirecting to original URL');

    next();
  },
  container.controllers.urlController.redirectToOriginalUrl.bind(
    container.controllers.urlController
  )
);

// Error handler
// @ts-ignore
app.use(errorMiddleware);

export default app;
