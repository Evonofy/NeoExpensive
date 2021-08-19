import { Router } from 'express';

export const router = Router();

router.get('/user', (_, response) => {
  throw new Error('not found');
  return response.status(400).json({
    message: 'find'
  });
});
