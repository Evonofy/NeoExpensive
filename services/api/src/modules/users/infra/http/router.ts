import express from 'express';

import { LoginUserController, RegisterUserController, RefreshUserTokenController, RecoverUserPaswordController, SetUserNewPasswordController } from '../../use-cases';

// eslint-disable-next-line new-cap
export const usersRouter = express.Router();

usersRouter.post('/login', LoginUserController);
usersRouter.post('/register', RegisterUserController);
usersRouter.post('/refresh-token', RefreshUserTokenController);

usersRouter.post('/forgot-password', RecoverUserPaswordController);
usersRouter.post('/set-new-password', SetUserNewPasswordController);

usersRouter.get('/login/oauth/github', (_, response) => {
  return response.redirect(`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.GITHUB_CLIENT_ID}`);
});
