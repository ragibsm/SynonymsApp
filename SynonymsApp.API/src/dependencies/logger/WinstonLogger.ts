import winston, { createLogger, format, Logger } from 'winston';

import ILogger from '../../core/dependencies/ILogger.js';
import { randomUUID } from 'crypto';

class WinstonLogger implements ILogger {

  private readonly instanceId: string;
  private readonly logger: Logger;

  constructor(level: 'debug' | 'info' | 'warn' | 'error') {
    this.instanceId = randomUUID();
    this.logger = createLogger({
      level,
      format: format.combine(
        format.colorize(),
        format.align(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    })
  }

  debug(message: string, data?: any) {
    this.logger.debug(`${new Date().toISOString()} - ${this.instanceId} - ${message}`, data);
  }
  info(message: string, data?: any) {
    this.logger.info(`${new Date().toISOString()} - ${this.instanceId} - ${message}`, data);
  }
  warn(message: string, data?: any) {
    this.logger.warn(`${new Date().toISOString()} - ${this.instanceId} - ${message}`, data);
  }
  error(message: string, data?: any) {
    this.logger.error(`${new Date().toISOString()} - ${this.instanceId} - ${message}`, data);
  }

}

export default WinstonLogger;