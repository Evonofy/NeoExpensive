import { Router } from 'express';

import { user } from '@user';

export const router = Router();

router.post('/user', user.createUser);
router.post('/user/activate', user.activateUser);
