import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { container } from './di/container';
import { errorMiddleware } from './middlewares/error.middleware';
import { StatusCodes } from 'http-status-codes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/health-check', (_req, res) => {
  res.status(StatusCodes.OK).json({ message: 'User service is running' });
});
app.use('/users', container.routers.authRouter);

// Error handler
// @ts-ignore
app.use(errorMiddleware);

export default app;
