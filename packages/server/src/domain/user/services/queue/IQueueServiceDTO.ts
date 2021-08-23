import { Paths } from '@user/types';

import Jobs from './jobs.json';

export interface Options {
  attemps: number;
  delay: number;
  priority: number;
}

export type Name = Paths<typeof Jobs>;

export interface allHandleProps {
  data: {
    name?: string;
    email?: string;
  };
}
