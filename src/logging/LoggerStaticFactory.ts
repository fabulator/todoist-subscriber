import winston from 'winston';

const { combine, logstash, timestamp } = winston.format;

export default class LoggerStaticFactory {
    public static create() {
        return winston.createLogger({
            format: combine(timestamp(), logstash()),
            defaultMeta: {},
            transports: [new winston.transports.Console({
                consoleWarnLevels: ['error'],
                stderrLevels: ['info', 'warn', 'debug'],
            })],
        });
    }
}
