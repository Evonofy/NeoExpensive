export class Token {
  public readonly id: string;
  public readonly userId: string;

  public readonly expiresIn: Date;

  constructor({ expiresIn, userId }: Omit<Token, 'id'>) {
    this.id = '123';

    this.userId = userId;

    this.expiresIn = new Date() || expiresIn;
  }
}
