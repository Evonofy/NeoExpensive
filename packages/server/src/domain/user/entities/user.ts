import { v4 as uuid } from 'uuid';

import { hashSync, compare } from 'bcrypt';

interface UserProps {
  name: string;
  email: string;
  password: string;
}

interface Options {
  id?: string;
  isHashed?: boolean;
}

export class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;
  public username?: string;

  constructor(props: UserProps, { id, isHashed }: Options = {}) {
    if (!id) {
      this.id = uuid();
    }

    Object.assign(this, props);

    this.username = `${this.name}#${this.randomNumber(4)}`;

    if (isHashed) {
      this.password = props.password;
    } else {
      /* only run hash function if props are different from null */
      this.password = props !== null && hashSync(this.password, 10);
    }
  }

  public randomNumber(numberLength: 1 | 2 | 3 | 4) {
    const chars = '0123456789';

    const number = [...Array(numberLength)]
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');

    return number;
  }

  public isValidEmail(email: string) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  public async comparePassword(password: string, hashedPassword: string) {
    const comparePassword = await compare(password, hashedPassword);

    return comparePassword;
  }
}
