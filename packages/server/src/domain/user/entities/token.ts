import { v4 as uuid } from 'uuid';

import { sign } from 'jsonwebtoken';

interface TokenProps {
  payload: object;
  expiresIn: string;
  type: 'access' | 'refresh';
}

export class Token {
  public readonly id: string;
  public expiresIn: number;

  public payload: string;
  public readonly created_at: Date;
  public updated_at: Date;

  public type: string;
  public readonly userId: string;

  constructor(props: TokenProps) {
    this.id = uuid();

    let secret: string;
    switch (this.type) {
      case 'access':
        secret = process.env.ACCESS_TOKEN_SECRET;
        break;

      case 'refresh':
        secret = process.env.REFRESH_TOKEN_SECRET;
        break;

      default:
        secret = process.env.ACCESS_TOKEN_SECRET;
        break;
    }

    this.payload = sign(props.payload, secret, {
      expiresIn: props.expiresIn,
      jwtid: this.id
    });

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
