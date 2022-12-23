/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { EventEmitter } from 'events';
import httpMocks from 'node-mocks-http';
import { HttpLoggerMiddleware } from './http-logger.middleware';

jest.mock('@nestjs/common', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@nestjs/common');
  return {
    ...originalModule,
    // eslint-disable-next-line func-names
    Logger: jest.fn(function () {
      this.debug = jest.fn();
    }),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('HTTP Logger middleware', () => {
  test('OK: log with all values filled', () => {
    const middleware = new HttpLoggerMiddleware();
    const request = {
      ip: 'MOCK_IP',
      method: 'MOCK_METHOD',
      originalUrl: 'MOCK_URL',
      get: jest.fn().mockImplementation((param) => {
        if (param === 'user-agent') { return 'MOCK_USER_AGENT'; }
        if (param === 'host') { return 'localhost:8080'; }
        return null;
      }),
      path: 'MOCK_PATH',
      query: {},
      httpVersion: 'MOCK_HTTP_VERSION',
    };
    const response = httpMocks.createResponse({
      eventEmitter: EventEmitter,
    });
    const next = jest.fn();

    middleware.use(request as unknown as Request, response, next);
    response.status(201).end();
    expect(next).toHaveBeenCalledTimes(1);
    expect((Logger as any).mock.instances.length).toEqual(1);
    expect((Logger as any).mock.instances[0].debug).toHaveBeenCalledTimes(1);
    expect((Logger as any).mock.instances[0].debug).toHaveBeenCalledWith(
      'MOCK_METHOD MOCK_URL 201 - MOCK_USER_AGENT MOCK_IP',
      'HttpLoggerMiddleware',
      {
        http_host: 'localhost:8080',
        http_port: 8080,
        http_path: 'MOCK_PATH',
        http_query_string: {},
        http_status_code: 201,
        http_method: 'MOCK_METHOD',
        http_useragent: 'MOCK_USER_AGENT',
        http_version: 'MOCK_HTTP_VERSION',
      },
    );
  });

  test('OK: log with null optional values', () => {
    const middleware = new HttpLoggerMiddleware();
    const request = {
      ip: 'MOCK_IP',
      method: 'MOCK_METHOD',
      originalUrl: 'MOCK_URL',
      get: jest.fn(),
    };
    const response = httpMocks.createResponse({
      eventEmitter: EventEmitter,
    });
    const next = jest.fn();

    middleware.use(request as unknown as Request, response, next);
    response.status(201).end();
    expect(next).toHaveBeenCalledTimes(1);
    expect((Logger as any).mock.instances.length).toEqual(1);
    expect((Logger as any).mock.instances[0].debug).toHaveBeenCalledTimes(1);
    expect((Logger as any).mock.instances[0].debug).toHaveBeenCalledWith(
      'MOCK_METHOD MOCK_URL 201 -  MOCK_IP',
      'HttpLoggerMiddleware',
      {
        http_host: '',
        http_status_code: 201,
        http_method: 'MOCK_METHOD',
        http_useragent: '',
      },
    );
  });
});
