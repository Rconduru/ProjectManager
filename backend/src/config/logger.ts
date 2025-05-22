import pino from 'pino';

const transport = pino.transport({  
  targets: [
    {
        target: 'pino/file',
        options: { destination: `${__dirname}/server.log` },
    },
    {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
        },
    },
  ],
});

const logger = pino(
    {
        level: process.env.PINO_LOG_LEVEL || 'info',
        timestamp: pino.stdTimeFunctions.isoTime,
    },
    transport
);

export default logger;