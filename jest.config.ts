module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/e2e/*.jest.ts'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)': 'ts-jest',
  },
  verbose: true,
  testTimeout: 40000,
  setupFilesAfterEnv: ['expect-playwright'],

  collectCoverageFrom: ['./src/**'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: ['html', 'text', 'lcov'],
};
