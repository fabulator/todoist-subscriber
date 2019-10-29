import 'reflect-metadata';
import './env';
import './container';
import './config';
import { logger } from './logging';
import app from './app';

const port = 8080;

logger.log({
    level: 'info',
    message: `Starting server on port ${port}`,
    code: 'start',
});

app.listen(port);
