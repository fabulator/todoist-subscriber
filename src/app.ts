import Koa from 'koa';
import { useKoaServer } from 'routing-controllers';
import { ErrorMiddleware } from './errors';
import { LoggingMiddleware } from './logging';
import DefaultResponseMiddleware from './DefaultResponseMiddleware';
import HookController from './hook/HookController';
import HealthyController from './health/HealthyController';

const app = new Koa();

useKoaServer(app, {
    middlewares: [LoggingMiddleware, ErrorMiddleware, DefaultResponseMiddleware],
    controllers: [HealthyController, HookController],
    defaultErrorHandler: false,
});

export default app;
