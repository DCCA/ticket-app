import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

// Import Routes
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@ticketapp/common';
// Import errors

// Start app
const app = express();
// Allow the proxy from Ingress
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // Check if we are in test env, if so, set to false, if not, set to true
    secure: process.env.NODE_ENV !== 'test',
  })
);

// Register routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.get('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
