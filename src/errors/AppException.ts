export default class AppException extends Error {
    protected prevException: Error;

    protected code: string;

    protected level: string;

    protected data?: Record<string, string>;

    constructor({
        message,
        code,
        level,
        data,
    }: {
        message: string,
        code: string,
        level: string,
        data?: Record<string, string>,
    }, exception: Error) {
        super(`${message}: ${exception.message}`);
        this.prevException = exception;
        this.code = code;
        this.level = level;
        this.data = data;
    }

    toJson() {
        return {
            message: this.message,
            code: this.code,
            level: this.level,
            prevException: {
                ...this.prevException,
                stack: this.prevException.stack,
            },
            stack: this.stack,
            ...(this.data ? { data: this.data } : {}),
        };
    }

    public getPrevException() {
        return this.prevException;
    }

    public getCode() {
        return this.code;
    }

    public getLevel() {
        return this.level;
    }

    public getData() {
        return this.data;
    }
}
