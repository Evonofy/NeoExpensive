import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import { unauthorized } from '../../interface/HttpResponse';

export const accessTokenAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // base_token(request, response);
  const authHeader = request.headers['authorization'];
  /* if there is not authorization header token */
  if (!authHeader) {
    const { body, statusCode } = unauthorized({
      name: 'Access Auth token missing!',
      message: 'You must provide an authorization token to use this route.'
    });

    return response.status(statusCode).json(body);
  }

  const authToken = authHeader.split(' ')[1];

  /* if there is not authorization header */
  if (!authToken) {
    const { body, statusCode } = unauthorized({
      name: 'Bearer prefix missing!',
      message:
        'You need to include the Bearer keyword before your token with a space in between.'
    });

    return response.status(statusCode).json(body);
  }

  const access_token_secret = process.env.ACCESS_TOKEN_SECRET;

  try {
    verify(authToken, access_token_secret);
    next();
  } catch (error) {
    const { body, statusCode } = unauthorized(error);

    return response.status(statusCode).json(body);
  }
};
