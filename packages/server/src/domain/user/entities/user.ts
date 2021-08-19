import { v4 as uuid } from 'uuid';

import { Token } from './token';

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User {
  public readonly id: string;

  public readonly created_at: Date;
  public updated_at: Date;

  public name: string;
  public email: string;
  public password: string;
  public token: Token;

  constructor(props: UserProps, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
