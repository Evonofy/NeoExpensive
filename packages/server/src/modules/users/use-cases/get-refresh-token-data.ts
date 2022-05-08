import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function GetRefreshTokenData(request: Request<{ jwt: string }>, response: Response): Promise<Response> {
  const { jwt } = request.params;

  try {
    const refreshToken = verify(jwt, process.env.REFRESH_TOKEN_SECRET) as {
      id: string;
    };

    return response.status(200).send(refreshToken);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
