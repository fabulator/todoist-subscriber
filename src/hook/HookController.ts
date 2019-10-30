import crypto from 'crypto';
import { Request } from 'koa';
import {
    Controller,
    Body,
    Post,
    Req,
} from 'routing-controllers';
import { logger } from '../logging';
// @ts-ignore
import { QueueService } from '../queue';
import { HookBody } from './types';
import RequestNotVerified from './RequestNotVerified';

const { TODOIST_SECRET } = process.env;

if (!TODOIST_SECRET) {
    logger.warn('Todoist client secret is not in environment variables. Requests will not be verified.', { code: 'secret-key-missing' });
}

const hmac = crypto.createHmac('sha256', TODOIST_SECRET || '');

@Controller()
export default class HookController {
    constructor(protected queue: QueueService) {}

    @Post('/hook')
    async post(@Body() body: HookBody, @Req() request: Request) {
        if (TODOIST_SECRET) {
            // @ts-ignore
            hmac.update(request.rawBody);
            if (hmac.digest().toString('base64') !== request.headers['x-todoist-hmac-sha256']) {
                throw new RequestNotVerified();
            }
        }

        await this.queue.push(body);
        return '';
    }
}
