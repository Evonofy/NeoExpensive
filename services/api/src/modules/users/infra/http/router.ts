import express from 'express';

import { LoginUserController, RegisterUserController, RefreshUserTokenController, RecoverUserPaswordController, SetUserNewPasswordController } from '../../use-cases';

// eslint-disable-next-line new-cap
export const usersRouter = express.Router();

usersRouter.post('/login', LoginUserController);
usersRouter.post('/register', RegisterUserController);
usersRouter.post('/refresh-token', RefreshUserTokenController);

usersRouter.post('/forgot-password', RecoverUserPaswordController);
usersRouter.post('/set-new-password', SetUserNewPasswordController);
