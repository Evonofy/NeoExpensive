import dayjs from 'dayjs';

import { sign, verify } from 'jsonwebtoken';

export class AccessTokenProvider {
  private access_token_secret = process.env.ACCESS_TOKEN_SECRET;
  async execute(payload: object) {
    const expiresIn = dayjs().add(15, 'minute').unix();

    const accessToken = sign(payload, this.access_token_secret, { expiresIn });

    return { accessToken };
  }

  validate(token: string) {
    try {
      const validatedToken = verify(token, this.access_token_secret);

      return validatedToken;
    } catch (error) {
      throw new Error('This activate user account token is not valid.');
    }
  }
}
