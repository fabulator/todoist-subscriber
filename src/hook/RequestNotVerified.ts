import { AppException } from '../errors';

export default class RequestNotVerified extends AppException {
    constructor() {
        super({
            message: 'Cannot verify that request originated from Todoist.',
            code: 'request-not-verified',
            level: 'warn',
        });
    }
}
