import { Name, Options } from './IQueueServiceDTO';

export interface IQueueService {
  add: (name: Name, data: object, options?: Options) => void;
  process: () => void;
}
