import { Service } from 'typedi';
import { QueueProviderInterface } from '../QueueProviderInterface';
import { HookBody } from '../../hook/types';

@Service()
export default class DevNullProvider implements QueueProviderInterface {
    public async push(data: HookBody) {
        console.log(data);
    }
}
