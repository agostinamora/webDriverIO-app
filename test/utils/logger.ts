import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info: any) => { 
            const { timestamp, level, message } = info;
            const messageStr = String(message);
            const cleanMessage = messageStr.replace(/\u001b\[[0-9;]*m/g, ''); 
            
            return `${timestamp} [${level.toUpperCase()}]: ${cleanMessage}`;
        })
    ),
    transports: [
        new transports.File({ filename: './logs/test.log' }),
        new transports.Console()
    ]
});

export default logger;