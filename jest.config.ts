module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/e2e/*.jest.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
  testTimeout: 40000,
  setupFilesAfterEnv: ['expect-playwright'],
};
