import { Controller, Body, Post } from 'routing-controllers';
import { QueueService } from '../queue';
import { HookBody } from './types';

@Controller()
export default class HookController {
    constructor(private queue: QueueService) {}

    @Post('/hook')
    async post(@Body() request: HookBody) {
        await this.queue.push(request);
        return '';
    }
}
