import { v4 as uuid } from 'uuid';

import { hashSync } from 'bcrypt';

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

  public readonly created_at: Date;
  public updated_at: Date;

  public name: string;
  public email: string;
  public password: string;

  constructor(props: UserProps, { id, created_at, isHashed }: Options = {}) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }

    if (!created_at) {
      this.created_at = new Date();
    }

    this.id = id;
    this.created_at = created_at;

    this.updated_at = new Date();

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
}
