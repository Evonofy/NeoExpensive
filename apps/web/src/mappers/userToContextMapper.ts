import { User } from '../types';

type IUser = {
  _id: string;

  props: User;
};

export const userToContextMapper = (user: IUser) => ({
  ...user.props,
});
