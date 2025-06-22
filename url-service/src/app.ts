import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import helmet from 'helmet';
import cors from 'cors';
import { container } from './di/container';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/health-check', (_req, res) => {
  res.status(200).json({ message: 'Url service is running' });
});
app.use('/api/urls', container.routers.urlRouter);

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
