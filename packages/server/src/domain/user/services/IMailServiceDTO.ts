interface IAddress {
  name: string;
  email: string;
}

export interface IMessage {
  to: IAddress;
  subject: string;
  body: string;
}
