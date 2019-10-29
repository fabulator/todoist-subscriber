import { Service, Inject } from 'typedi';
import { QueueProviderInterface } from './QueueProviderInterface';
import QueueException from './QueueException';
import { HookBody } from '../hook/types';

@Service()
export default class QueueService {
    constructor(@Inject('queue.provider') protected queueProvider: QueueProviderInterface) {}

    async push(data: HookBody) {
        try {
            await this.queueProvider.push(data);
        } catch (exception) {
            throw new QueueException(exception);
        }
    }
}
