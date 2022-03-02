import { Entity } from '@neo/core';

type UserProps = {
  name: string;
  email: string;
  password: string;
  username: string;

  createdAt: Date;
  updatedAt: Date;

  tokenVersion: number;
};

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  username: string;
  tokenVersion?: number;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: CreateUserProps, id?: string) {
    // prettier-ignore
    const user = new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      tokenVersion: props.tokenVersion || 0
    }, id);

    return user;
  }
}
