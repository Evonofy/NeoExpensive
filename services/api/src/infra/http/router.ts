import express from 'express';

import { usersRouter } from '../../modules/users/infra/http/router';

// eslint-disable-next-line new-cap
export const router = express.Router();

router.use('/users', usersRouter);
