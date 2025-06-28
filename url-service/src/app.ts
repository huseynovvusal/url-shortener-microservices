import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import helmet from 'helmet';
import cors from 'cors';
import { container } from './di/container';
import { StatusCodes } from 'http-status-codes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/health-check', (_req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Url service is running' });
});
app.use('/urls', container.routers.urlRouter);

// Redirect route for short URLs
app.get(
  '/:shortCode',
  container.controllers.urlController.redirectToOriginalUrl.bind(
    container.controllers.urlController
  )
);

// Error handler
// @ts-ignore
app.use(errorMiddleware);

export default app;
