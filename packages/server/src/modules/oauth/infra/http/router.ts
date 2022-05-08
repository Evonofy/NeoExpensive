import express from 'express';

import { CreateOauthApp } from '../../use-cases/create-oauth-app';
import { GenerateNewClientSecret } from '../../use-cases/generate-new-client-secret';
import { ListAllOauthApps } from '../../use-cases/list-all-oauth-apps';
import { DeleteOauthApp } from '../../use-cases/delete-oauth-app';
import { GetAppByClientId } from '../../use-cases/get-app-by-client-id';
import { EditOauthApp } from '../../use-cases/edit-oauth-app';

import { auth } from '../../../../infra/http/middlewares/auth';

// eslint-disable-next-line new-cap
export const OAuthRouter = express.Router();

OAuthRouter.get('/apps', auth, ListAllOauthApps);
OAuthRouter.get('/apps/:client_id', GetAppByClientId);

OAuthRouter.post('/apps', auth, CreateOauthApp);
OAuthRouter.post('/apps/:appId/generate-secret', auth, GenerateNewClientSecret);
OAuthRouter.put('/apps/:appId', auth, EditOauthApp);
OAuthRouter.delete('/apps/:appId', auth, DeleteOauthApp);
