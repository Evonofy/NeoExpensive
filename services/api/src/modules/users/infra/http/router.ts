import express from 'express';

import { LoginUserController, RegisterUserController } from '../../use-cases';

// eslint-disable-next-line new-cap
export const usersRouter = express.Router();

usersRouter.post('/login', LoginUserController);
usersRouter.post('/register', RegisterUserController);
