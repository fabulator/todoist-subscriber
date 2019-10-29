import Queue from 'bull';
import { Service, Inject } from 'typedi';
import { QueueProviderInterface } from '../QueueProviderInterface';
import { HookBody } from '../../hook/types';

@Service()
export default class BullProvider implements QueueProviderInterface {
    protected queue: Queue.Queue;

    constructor(@Inject('queue.providers.bull.options') options: [string, Queue.QueueOptions]) {
        this.queue = new Queue(...options);
    }

    public async push(data: HookBody) {
        await this.queue.add(data);
    }
}
