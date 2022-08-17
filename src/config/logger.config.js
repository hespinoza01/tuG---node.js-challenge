import { format, transports } from 'winston'

const { timestamp, combine, colorize, errors, json, printf, simple } = format

const logFormat = printf(
    ({ level, message, timestamp, stack }) =>
        `${timestamp} ${level} ${stack || message}`
)

export const devLoggerConfig = {
    format: combine(
        simple(),
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
    ),
    defaultMeta: { service: 'backend' },
    transports: [new transports.Console()],
}

export const prodLoggerConfig = {
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'backend' },
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            // eslint-disable-next-line node/no-path-concat
            filename: `${__dirname}/../logger/logger.log`,
        }),
    ],
}
