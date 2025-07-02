import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { container } from './di/container';
import { errorMiddleware } from './middlewares/error.middleware';
import { StatusCodes } from 'http-status-codes';
import appConfig from './config/app.config';

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [appConfig.baseUrl, appConfig.urlServiceUrl],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());

// Routes
app.use('/health-check', (_req, res) => {
  res.status(StatusCodes.OK).json({ message: 'User service is running' });
});
app.use('/', container.routers.authRouter);

// Error handler
// @ts-ignore
app.use(errorMiddleware);

export default app;
