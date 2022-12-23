import type { Config } from 'jest';

export default async (): Promise<Config> => ({
  collectCoverageFrom: [
    './src/**/*.(t|j)s',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    './.+/node_modules',
    './.+/dist',
    './.+/*.module.ts', // As Nest modules do not contain logic, it is not relevant to test them unitarily
    './.+/*.dto.ts', // DTO files do not contain logic
    './.+/*.schema.ts', // Schema files do not contain logic
    './src/main.ts',
    './.+/*.stub.ts',
  ],
  coverageReporters: [
    'text',
    'lcov',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    './.+/node_modules',
    './.+/dist',
  ],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
});
