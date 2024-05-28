module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/e2e/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
  testTimeout: 40000,
  setupFilesAfterEnv: ['expect-playwright'],
};
