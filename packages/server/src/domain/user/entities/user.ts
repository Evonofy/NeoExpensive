import { v4 as uuid } from 'uuid';

import { hashSync } from 'bcrypt';

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

  constructor(props: UserProps, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }

    /* only run hash function if props are different from null */
    this.password = props !== null && hashSync(this.password, 10);

    this.created_at = new Date();
    this.updated_at = new Date();
  }

  public isValidEmail(email: string) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
}
