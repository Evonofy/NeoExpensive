import { Entity } from '@core';

type ContactProps = {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Contact extends Entity<ContactProps> {
  private constructor(props: ContactProps, id?: string) {
    super(props, id);
  }

  static create(props: Omit<ContactProps, 'createdAt' | 'updatedAt'>, id?: string) {
    // prettier-ignore
    const contact = new Contact({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, id);

    return contact;
  }
}
