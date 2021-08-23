interface IAddress {
  name: string;
  email: string;
}

export interface IMessage {
  isNoReply: boolean;
  to: IAddress;
  subject: string;
  body: string;
}
