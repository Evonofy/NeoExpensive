import 'dotenv/config';

import { Jwt, sign, verify } from 'jsonwebtoken';

interface Payload extends Jwt {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    username: string;
  };
}

export class ActivateTokenProvider {
  private activate_token_secret = process.env.ACTIVATE_TOKEN_SECRET;

  async execute(payload: object, userId: string) {
    const activateToken = sign({ ...payload }, this.activate_token_secret, {
      expiresIn: '15m',
      subject: userId
    });

    return activateToken;
  }

  validate(token: string): Payload {
    try {
      return verify(token, this.activate_token_secret) as Payload;
    } catch (error) {
      throw new Error('This activate user account token is not valid.');
    }
  }
}
