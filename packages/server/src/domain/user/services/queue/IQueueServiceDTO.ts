import { jobs } from './jobs';

export interface Options {
  attemps: number;
  delay: number;
  priority: number;
}

export type Name = jobs;

export interface allHandleProps {
  data: {
    name?: string;
    email?: string;
    token?: string;
  };
}
