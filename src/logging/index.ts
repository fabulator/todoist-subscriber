import { Container } from 'typedi';
import { Logger } from 'winston';
import LoggerStaticFactory from './LoggerStaticFactory';
import LoggingMiddleware from './LoggingMiddleware';

Container.set('logger', LoggerStaticFactory.create());

export const logger: Logger = Container.get('logger');
export { Logger } from 'winston';
export { LoggingMiddleware };
