import { Context } from 'koa';
import { Middleware } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export default class DefaultResponseMiddleware {
    async use(context: Context, next: Function): Promise<void> {
        if (context.response.body === undefined) {
            context.response.body = {
                message: context.response.message,
                code: `error-${context.response.status}`,
            };
        }
        next();
    }
}
