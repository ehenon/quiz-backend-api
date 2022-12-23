import { hostname } from 'os';
import winston from 'winston';
import * as index from './index';
import { CustomLogger } from './custom-logger.class';

jest.mock('winston', () => ({
  format: {
    colorize: jest.fn().mockReturnValue('MOCK_COLORIZE'),
    combine: jest.fn().mockReturnValue('MOCK_COMBINE'),
    json: jest.fn().mockReturnValue('MOCK_JSON'),
    timestamp: jest.fn().mockReturnValue('MOCK_TIMESTAMP'),
    printf: jest.fn().mockReturnValue('MOCK_PRINTF'),
  },
  createLogger: jest.fn().mockReturnValue({
    debug: jest.fn(),
    log: jest.fn(),
  }),
  transports: {
    Console: jest.fn(),
  },
}));

const createCustomLogger = index.default;

let getFormatMock;

beforeEach(() => {
  getFormatMock = jest.spyOn(index, 'getFormat').mockImplementation(() => {});
  process.env = {
    NODE_ENV: 'test',
    LOG_LEVEL: 'debug',
  };
});

afterEach(() => {
  getFormatMock.mockRestore();
  jest.clearAllMocks();
});

describe('customLogPrinter()', () => {
  test('OK: nominal case', () => {
    const osHostname = hostname();
    const mockArgs = {
      timestamp: new Date(),
      level: 'error',
      message: 'message',
      exception: 'exception',
      optionalFields: {
        plugin: 'plugin',
        test: 'test',
      },
    };
    const expectedString = `{"env":"${process.env.NODE_ENV}","log_timestamp":"${mockArgs.timestamp.toISOString()}","level":"${mockArgs.level}","logger":"custom-logger","message":"${mockArgs.message}","hostname":"${osHostname}","exception":"exception","plugin":"${mockArgs.optionalFields.plugin}","test":"${mockArgs.optionalFields.test}"}`;
    expect(index.customLogPrinter(mockArgs)).toEqual(expectedString);
  });
});

describe('getFormat()', () => {
  test('OK: NODE_ENV is not local', () => {
    getFormatMock.mockRestore();
    process.env.NODE_ENV = 'prod';
    index.getFormat();
    expect(winston.format.combine).toHaveBeenCalledTimes(1);
    expect(winston.format.combine).toHaveBeenCalledWith(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.printf(index.customLogPrinter),
    );
  });

  test('OK: NODE_ENV is set to local', () => {
    getFormatMock.mockRestore();
    process.env.NODE_ENV = 'local';
    index.getFormat();
    expect(winston.format.combine).toHaveBeenCalledTimes(1);
    expect(winston.format.combine).toHaveBeenCalledWith(
      winston.format.colorize(),
      winston.format.printf(({ level, message }) => `[${level}]: ${message}`),
    );
  });
});

describe('createCustomLogger()', () => {
  test('OK: should return the CustomLogger (filled LOG_LEVEL case)', () => {
    expect(createCustomLogger() instanceof CustomLogger).toEqual(true);
    expect(winston.createLogger).toHaveBeenCalledTimes(1);
    expect(winston.createLogger).toHaveBeenCalledWith({
      level: 'debug',
      transports: expect.any(Object),
    });
    expect(winston.transports.Console).toHaveBeenCalledTimes(1);
    expect(getFormatMock).toHaveBeenCalledTimes(1);
  });

  test('OK: should return the CustomLogger (undefined LOG_LEVEL case)', () => {
    delete process.env.LOG_LEVEL;
    expect(createCustomLogger() instanceof CustomLogger).toEqual(true);
    expect(winston.createLogger).toHaveBeenCalledTimes(1);
    expect(winston.createLogger).toHaveBeenCalledWith({
      level: 'info',
      transports: expect.any(Object),
    });
    expect(winston.transports.Console).toHaveBeenCalledTimes(1);
    expect(getFormatMock).toHaveBeenCalledTimes(1);
  });
});
