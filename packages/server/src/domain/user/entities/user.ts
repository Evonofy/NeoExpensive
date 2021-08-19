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

  constructor(props: UserProps) {
    const { name, email, password } = props;

    this.id = '123';

    this.name = name;
    this.email = email;
    this.password = password;
    this.token = new Token({
      userId: this.id,
      expiresIn: new Date()
    });

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
