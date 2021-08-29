import {
  IQueueService,
  Name,
  Options,
  allHandleProps
} from '@user/services/queue';

import * as jobs from '@user/jobs';

import { IMailService } from '@user/services/mail';
import { JobConfig } from '@user/jobs/JobDTO';

interface QueueProps {
  name: Name;
}

export class MockQueueService implements IQueueService {
  private queues: QueueProps[] = [];

  constructor(private mailService: IMailService) {
    new JobConfig(this.mailService);

    this.queues = Object.values(jobs).map(job => ({
      name: job.key
    }));
  }

  async add(name: Name, { data }: allHandleProps, options: Options) {
    const queue = this.queues.find(queue => queue.name === name);

    if (!queue) {
      throw new Error("This queue doesn't exist.");
    }

    return queue.name;
  }

  process() {
    return this.queues;
  }
}
