import { Logger } from 'winston';
import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  constructor(private readonly logger: Logger) {}

  /**
   * Write an 'error' level log.
   *
   * @param {string} message - Log message.
   * @param {string} [stack] - Error stack.
   * @param {string} [context] - Context of the log.
   * @param {object} [optionalFields] - Object of optional fields to inject.
   */
  public error(message: string, stack?: string, context?: string, optionalFields?: object): void {
    this.logger.error(
      message,
      { exception: stack, optionalFields: { context, ...optionalFields } },
    );
  }

  /**
   * Write a 'warn' level log.
   *
   * @param {string} message - Log message.
   * @param {string} [context] - Context of the log.
   * @param {object} [optionalFields] - Object of optional fields to inject.
   */
  public warn(message: string, context?: string, optionalFields?: object): void {
    this.logger.warn(message, { optionalFields: { context, ...optionalFields } });
  }

  /**
   * Write an 'info' level log.
   *
   * @param {string} message - Log message.
   * @param {string} [context] - Context of the log.
   * @param {object} [optionalFields] - Object of optional fields to inject.
   */
  public log(message: string, context?: string, optionalFields?: object): void {
    this.logger.info(message, { optionalFields: { context, ...optionalFields } });
  }

  /**
   * Write a 'verbose' level log.
   *
   * @param {string} message - Log message.
   * @param {string} [context] - Context of the log.
   * @param {object} [optionalFields] - Object of optional fields to inject.
   */
  public verbose?(message: string, context?: string, optionalFields?: object): void {
    this.logger.verbose(message, { optionalFields: { context, ...optionalFields } });
  }

  /**
   * Write a 'debug' level log.
   *
   * @param {string} message - Log message.
   * @param {string} [context] - Context of the log.
   * @param {object} [optionalFields] - Object of optional fields to inject.
   */
  public debug?(message: string, context?: string, optionalFields?: object): void {
    this.logger.debug(message, { optionalFields: { context, ...optionalFields } });
  }
}
