import 'dotenv/config';
import dayjs from 'dayjs';

import { sign, verify } from 'jsonwebtoken';

export class ActivateTokenProvider {
  private activate_token_secret = process.env.ACTIVATE_TOKEN_SECRET;

  async execute(payload: object, userId: string) {
    const expiresIn = dayjs().add(15, 'minute').unix();

    const activateToken = sign({ payload }, this.activate_token_secret, {
      expiresIn,
      subject: userId
    });

    return activateToken;
  }

  validate(token: string) {
    try {
      const validatedToken = verify(token, this.activate_token_secret);

      return validatedToken;
    } catch (error) {
      throw new Error('This activate user account token is not valid.');
    }
  }
}
