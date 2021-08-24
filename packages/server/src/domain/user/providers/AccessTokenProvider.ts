import dayjs from 'dayjs';

import { sign } from 'jsonwebtoken';

export class AccessTokenProvider {
  async execute(payload: object, userId: string) {
    const expiresIn = dayjs().add(15, 'minute').unix();

    const access_token_secret = process.env.ACCESS_TOKEN_SECRET;

    const accessToken = sign(payload, access_token_secret, { expiresIn });

    return accessToken;
  }
}
