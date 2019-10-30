import { Context } from 'koa';
import { Middleware } from 'routing-controllers';
import { Service, Inject } from 'typedi';
import { Logger } from 'winston';
import AppException from './AppException';

@Service()
@Middleware({ type: 'before' })
export default class ErrorMiddleware {
    constructor(@Inject('logger') public logger: Logger) {}

    handleAppException(context: Context, exception: AppException) {
        context.body = { code: exception.getCode(), message: exception.message };
        context.status = 400;

        return exception.toJson();
    }

    handleUnknownException(context: Context, exception: Error) {
        context.body = { code: 'internal-server-error', message: 'Internal server error' };
        context.status = 500;

        return {
            ...exception,
            message: `Error: ${exception.message}`,
            level: 'error',
            code: 'error',
            stack: exception.stack,
        };
    }

    async use(context: Context, next: Function): Promise<void> {
        try {
            await next();
        } catch (exception) {
            this.logger.log({
                ...(exception instanceof AppException
                    ? this.handleAppException(context, exception)
                    : this.handleUnknownException(context, exception)
                ),
                request: {
                    headers: context.request.headers,
                    method: context.request.method,
                    href: context.request.href,
                    query: context.request.query,
                    // @ts-ignore
                    body: context.request.body,
                },
                response: {
                    status: context.response.status,
                    message: context.response.message,
                    body: context.body,
                },
            });
        }
    }
}
