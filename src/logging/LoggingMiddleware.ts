import { Context } from 'koa';
import { Middleware } from 'routing-controllers';
import { Service, Inject } from 'typedi';
import { Logger } from 'winston';

@Service()
@Middleware({ type: 'before' })
export default class LoggingMiddleware {
    constructor(@Inject('logger') public logger: Logger) {}

    async use(context: Context, next: Function): Promise<void> {
        const { request, response } = context;

        const start = Date.now();

        await next();

        const ms = Date.now() - start;
        context.set('X-Response-Time', `${ms} ms`);

        this.logger.log({
            level: 'info',
            message: `Request: ${request.url} ${request.method}`,
            code: 'request',
            responseTime: ms,
            request: {
                headers: request.headers,
                method: request.method,
                href: request.href,
                query: request.query,
                // @ts-ignore
                body: request.body,
            },
            response: {
                status: response.status,
                message: response.message,
                headers: response.headers,
                body: response.body,
            },
        });
    }
}
