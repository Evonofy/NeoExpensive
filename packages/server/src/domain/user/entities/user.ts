import { v4 as uuid } from 'uuid';

import { hashSync, compare } from 'bcrypt';

interface UserProps {
  name: string;
  email: string;
  password: string;
}

interface Options {
  id?: string;
  created_at?: Date;
  isHashed?: boolean;
}

export class User {
  public readonly id: string;

  public readonly created_at: number;
  public updated_at: number;

  public name: string;
  public email: string;
  public password: string;

  constructor(props: UserProps, { id, created_at, isHashed }: Options = {}) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }

    if (!created_at) {
      this.created_at = Number(new Date().getTime());
    } else {
      this.created_at = Number(created_at);
    }

    this.updated_at = Number(new Date().getTime());

    if (isHashed) {
      this.password = props.password;
    } else {
      /* only run hash function if props are different from null */
      this.password = props !== null && hashSync(this.password, 10);
    }
  }

  public isValidEmail(email: string) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  public async comparePassword(password: string, hashedPassword: string) {
    const comparePassword = await compare(password, hashedPassword);

    return comparePassword;
  }
}
