import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes

// Error handler
//@ts-ignore
app.use(errorMiddleware);

export default app;
