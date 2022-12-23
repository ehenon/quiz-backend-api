import * as winston from 'winston';
import { CustomLogger } from './custom-logger.class';

const fakeLogger = winston.createLogger();

jest.spyOn(fakeLogger, 'debug').mockImplementation(() => fakeLogger);
jest.spyOn(fakeLogger, 'verbose').mockImplementation(() => fakeLogger);
jest.spyOn(fakeLogger, 'info').mockImplementation(() => fakeLogger);
jest.spyOn(fakeLogger, 'warn').mockImplementation(() => fakeLogger);
jest.spyOn(fakeLogger, 'error').mockImplementation(() => fakeLogger);

const logger: CustomLogger = new CustomLogger(fakeLogger);

describe('Custom logger class', () => {
  describe('error()', () => {
    test('OK: should raise an error log', () => {
      logger.error('message', 'stack', 'context', { optional: 'optional' });
      expect(fakeLogger.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('warn()', () => {
    test('OK: should raise a warn log', () => {
      logger.warn('message', 'context', { optional: 'optional' });
      expect(fakeLogger.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('info()', () => {
    test('OK: should raise an info log', () => {
      logger.log('message', 'context', { optional: 'optional' });
      expect(fakeLogger.info).toHaveBeenCalledTimes(1);
    });
  });

  describe('verbose()', () => {
    test('OK: should raise a verbose log', () => {
      logger.verbose('message', 'context', { optional: 'optional' });
      expect(fakeLogger.verbose).toHaveBeenCalledTimes(1);
    });
  });

  describe('debug()', () => {
    test('OK: should raise a debug log', () => {
      logger.debug('message', 'context', { optional: 'optional' });
      expect(fakeLogger.debug).toHaveBeenCalledTimes(1);
    });
  });
});
