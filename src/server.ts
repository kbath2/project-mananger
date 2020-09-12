/* eslint-disable no-console */
import 'reflect-metadata';
import './config/env';
import express, { NextFunction, Request, Response } from 'express';
import './database';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ status: 'error', message: err.message });
  }

  return response.status(500).json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
  console.log('Server Conected port 3333');
});
