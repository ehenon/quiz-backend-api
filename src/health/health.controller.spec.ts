import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: HealthService,
        useValue: {
          check: jest.fn(),
        },
      }],
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('check()', () => {
    test('OK: Health check with OK status', () => {
      const MOCK_RESPONSE = {
        name: process.env.npm_package_name || null,
        version: process.env.npm_package_version || null,
        description: process.env.npm_package_description || null,
        date: new Date().toISOString(),
        globalStatus: 'OK',
        probes: [
          {
            id: 'MongoDB probe',
            label: 'Check MongoDB connection',
            isVital: true,
            status: 'OK',
          },
        ],
      };
      jest
        .spyOn(service, 'check')
        .mockImplementation(() => MOCK_RESPONSE);
      expect(controller.check()).toEqual(MOCK_RESPONSE);
    });

    test('OK: Health check with CRITICAL status', () => {
      const MOCK_BAD_RESPONSE = {
        name: process.env.npm_package_name || null,
        version: process.env.npm_package_version || null,
        description: process.env.npm_package_description || null,
        date: new Date().toISOString(),
        globalStatus: 'CRITICAL',
        probes: [
          {
            id: 'MongoDB probe',
            label: 'Check MongoDB connection',
            isVital: true,
            status: 'CRITICAL',
          },
        ],
      };
      jest
        .spyOn(service, 'check')
        .mockImplementation(() => MOCK_BAD_RESPONSE);
      expect(controller.check()).toEqual(MOCK_BAD_RESPONSE);
    });
  });
});
