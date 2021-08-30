import { BullQueueService } from '@user/services/queue/drivers/bull';

const queue = new BullQueueService();

queue.process();
console.log('[queue]: running queue.');
