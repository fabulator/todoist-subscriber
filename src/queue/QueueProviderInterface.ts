import { HookBody } from '../hook/types';

export interface QueueProviderInterface {
    push(data: HookBody): Promise<void>,
}
