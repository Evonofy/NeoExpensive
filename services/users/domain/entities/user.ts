import { Entity } from '@neo/core';

type UserProps = {
  name: string;
  email: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string) {
    // prettier-ignore
    const user = new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }, id);

    return user;
  }
}
