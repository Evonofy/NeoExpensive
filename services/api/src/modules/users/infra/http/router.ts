import express from 'express';

import { LoginUserController, RegisterUserController, RefreshUserTokenController, RecoverUserPaswordController, SetUserNewPasswordController } from '../../use-cases';
import { AuthenticateUserGithubController } from '../../use-cases/authenticate-user-github';
import { RecoverUserInformationController } from '../../use-cases/recover-user-information';

// eslint-disable-next-line new-cap
export const usersRouter = express.Router();

usersRouter.post('/login', LoginUserController);
usersRouter.post('/register', RegisterUserController);
usersRouter.post('/refresh-token', RefreshUserTokenController);
usersRouter.post('/profile', RecoverUserInformationController);

usersRouter.post('/forgot-password', RecoverUserPaswordController);
usersRouter.post('/set-new-password', SetUserNewPasswordController);

usersRouter.post('/authenticate/github', AuthenticateUserGithubController);

usersRouter.get('/login/oauth/github', (_, response) => {
  return response.redirect(`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.GITHUB_CLIENT_ID}`);
});
