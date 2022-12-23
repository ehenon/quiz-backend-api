/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection } from 'mongoose';
import { HealthService } from './health.service';

jest
  .useFakeTimers()
  .setSystemTime(new Date('2020-01-01'));

describe('HealthService', () => {
  describe('check()', () => {
    test('OK: MongoDB connection OK', async () => {
      const mockConnection: any = { readyState: 1 };
      const service: HealthService = new HealthService(mockConnection);
      expect(service.check()).toEqual({
        name: process.env.npm_package_name || null,
        version: process.env.npm_package_version || null,
        description: process.env.npm_package_description || null,
        date: new Date().toISOString(),
        globalStatus: 'OK',
        probes: [{
          id: 'MongoDB probe',
          label: 'Check MongoDB connection',
          isVital: true,
          status: 'OK',
        }],
      });
    });

    test('KO: MongoDB connection KO', async () => {
      const mockConnection = new Connection();
      const service: HealthService = new HealthService(mockConnection);
      expect(service.check()).toEqual({
        name: process.env.npm_package_name || null,
        version: process.env.npm_package_version || null,
        description: process.env.npm_package_description || null,
        date: new Date().toISOString(),
        globalStatus: 'CRITICAL',
        probes: [{
          id: 'MongoDB probe',
          label: 'Check MongoDB connection',
          isVital: true,
          status: 'CRITICAL',
        }],
      });
    });

    test('OK: MongoDB connection OK but empty npm package values', async () => {
      delete process.env.npm_package_description;
      delete process.env.npm_package_version;
      delete process.env.npm_package_name;
      const mockConnection: any = { readyState: 1 };
      const service: HealthService = new HealthService(mockConnection);
      expect(service.check()).toEqual({
        name: process.env.npm_package_name || null,
        version: process.env.npm_package_version || null,
        description: process.env.npm_package_description || null,
        date: new Date().toISOString(),
        globalStatus: 'OK',
        probes: [{
          id: 'MongoDB probe',
          label: 'Check MongoDB connection',
          isVital: true,
          status: 'OK',
        }],
      });
    });
  });
});
