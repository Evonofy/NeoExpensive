/* eslint-disable new-cap */
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { prisma } from '../../../infra/prisma';

import axios from 'axios';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';
import { generateRefreshToken } from '../lib/generateRefreshToken';

interface IAccessTokenResponse {
  access_token: string;
}

type IUserResponse = User;

export async function AuthenticateUserNeo(request: Request<{}, {}, { code: string; platform: string }>, response: Response): Promise<Response> {
  const { code, platform } = request.body;
  const url = 'http://localhost:3333/login/oauth/access_token';

  try {
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.NEO_CLIENT_ID,
        client_secret: process.env.NEO_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!accessTokenResponse.access_token) {
      return response.send();
    }

    // 'https://api.github.com/user'
    const { data } = await axios.get<IUserResponse>('http://localhost:3333/user', {
      params: {
        client_secret: process.env.NEO_CLIENT_SECRET,
      },
      headers: {
        authorization: `bearer ${accessTokenResponse.access_token}`,
      },
    });

    const { id, avatarUrl, name, email } = data;

    let user = await prisma.user.findFirst({
      where: {
        neoId: String(id),
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: crypto.randomUUID(),
          neoId: String(id),
          name,
          email: '',
          avatarUrl,
        },
      });
    }

    const accessToken = sign(
      {
        userId: user.id,
        tokenVersion: user.tokenVersion,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5m',
      }
    );

    const { refreshToken } = await new generateRefreshToken().execute(user.id, {
      platform,
    });

    return response.status(200).json({
      user,
      accessToken,
      refreshToken: sign(
        {
          ...refreshToken,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '3d',
        }
      ),
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
