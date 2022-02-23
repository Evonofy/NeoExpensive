/* eslint-disable new-cap */
import { Request, Response } from 'express';
import { prisma } from '../../../infra/prisma';

import axios from 'axios';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';
import { generateRefreshToken } from '../lib/generateRefreshToken';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
  email: string;
}

export async function AuthenticateUserGithubController(request: Request<{}, {}, { code: string }>, response: Response): Promise<Response> {
  const { code } = request.body;
  const url = 'https://github.com/login/oauth/access_token';

  try {
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!accessTokenResponse.access_token) {
      return response.send();
    }

    const { data } = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    });

    const { id, login: username, avatar_url: avatarUrl, name, email } = data;

    let user = await prisma.user.findFirst({
      where: {
        githubId: String(id),
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: crypto.randomUUID(),
          githubId: String(id),
          name,
          email,
          username,
          avatarUrl,
        },
      });
    }

    const accessToken = sign(
      {
        userId: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5m',
      }
    );

    const { refreshToken } = await new generateRefreshToken().execute(user.id);

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
