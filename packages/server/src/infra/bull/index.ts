import { BullQueueService } from '@user/services/queue/drivers/Bull';

const queue = new BullQueueService();

queue.process();
