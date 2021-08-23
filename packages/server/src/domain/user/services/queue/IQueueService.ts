import { Name, Options, allHandleProps } from './IQueueServiceDTO';

export interface IQueueService {
  add: (name: Name, data: allHandleProps, options?: Options) => Promise<void>;
  process: () => void;
}
