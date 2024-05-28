module.exports = {
  browsers: ['chromium'],
  serverOptions: {
    command: 'npm run dev',
    port: 3000,
    launchTimeout: 10000,
    debug: true,
  },
  collectCoverage: true,
};
