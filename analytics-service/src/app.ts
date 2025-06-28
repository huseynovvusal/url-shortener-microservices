import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './middlewares/error.middleware';
import { container } from './di/container';
import { StatusCodes } from 'http-status-codes';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/health-check', (_req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Analytics service is running' });
});
app.use('/analytics', container.routers.analyticsRouter);

// Error handler
//@ts-ignore
app.use(errorMiddleware);

export default app;
