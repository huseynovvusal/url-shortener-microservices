import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// Middleware
app.use(express.json());

// Routes

// Error handler
// @ts-ignore
app.use(errorMiddleware);

export default app;
