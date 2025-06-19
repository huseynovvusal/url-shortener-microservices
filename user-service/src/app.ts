import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { container } from './di/container';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/', container.routers.authRouter);

// Error handler
// @ts-ignore
app.use(errorMiddleware);

export default app;
