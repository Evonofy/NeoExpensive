import Queue from 'bull';

import { config } from '@infra/redis';

import * as jobs from '@user/jobs';

import {
  IQueueService,
  Name,
  Options,
  allHandleProps
} from '@user/services/queue';

interface queueType {
  bull: Queue.Queue<any>;
  name: Name;
  handle: (data: allHandleProps) => Promise<void>;
}

export class BullQueueService implements IQueueService {
  private queues: queueType[];

  constructor() {
    const { url } = config;

    this.queues = Object.values(jobs).map(job => ({
      bull: new Queue(job.key, url),
      name: job.key,
      handle: job.handle
    }));
  }

  async add(name: Name, data: allHandleProps, options: Options) {
    const queue = this.queues.find(queue => queue.name === name);

    if (!queue) {
      throw new Error('Could not find this queue!');
    }

    return queue.bull.add(data);
  }

  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('completed', job => {
        const { finishedOn, processedOn, attemptsMade, queue, id } = job;
        const start_time = processedOn;
        const end_time = finishedOn;

        let time_difference = Math.abs(end_time - start_time);

        console.log(
          `[queue]: ${queue.name} job number: ${id} finished in ${time_difference}ms with ${attemptsMade} re-attemps!`
        );
      });
    });
  }
}
