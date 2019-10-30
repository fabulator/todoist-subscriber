import crypto, { Hmac } from 'crypto';
import { Request } from 'koa';
import { Inject } from 'typedi';
import {
    Controller,
    Body,
    Post,
    Req,
} from 'routing-controllers';
import { Logger } from '../logging';
// @ts-ignore
import { QueueService } from '../queue';
import { HookBody } from './types';
import RequestNotVerified from './RequestNotVerified';

@Controller()
export default class HookController {
    protected hmac?: Hmac;

    constructor(protected queue: QueueService, @Inject('logger') protected logger: Logger) {
        this.queue = queue;
        this.logger = logger;

        const { TODOIST_SECRET } = process.env;

        if (!TODOIST_SECRET) {
            this.logger.warn(
                'Todoist client secret is not in environment variables. Requests will not be verified.',
                { code: 'secret-key-missing' },
            );
        }

        this.hmac = TODOIST_SECRET ? crypto.createHmac('sha256', TODOIST_SECRET) : undefined;
    }

    @Post('/hook')
    async post(@Body() body: HookBody, @Req() request: Request) {
        if (this.hmac) {
            // @ts-ignore
            this.hmac.update(request.rawBody);
            if (this.hmac.digest().toString('base64') !== request.headers['x-todoist-hmac-sha256']) {
                throw new RequestNotVerified();
            }
        }

        await this.queue.push(body);
        return '';
    }
}
