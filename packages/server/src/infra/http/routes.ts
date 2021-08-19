import { Router } from 'express';

import { user } from '@domain/user';

export const router = Router();

router.post('/user', user.createUser);
