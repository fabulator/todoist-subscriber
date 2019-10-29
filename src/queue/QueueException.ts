import { AppException } from '../errors';

export default class QueueException extends AppException {
    constructor(exception: Error) {
        super({
            message: 'Error when pushing event to queue:',
            code: 'queue-exception',
            level: 'error',
        }, exception);
    }
}
