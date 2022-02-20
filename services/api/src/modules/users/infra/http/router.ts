import express from 'express';

import { LoginUserController } from '../../use-cases';

// eslint-disable-next-line new-cap
export const usersRouter = express.Router();

usersRouter.post('/login', LoginUserController);
