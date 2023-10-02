const config = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: '<html lang=""></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007',
  },
  verbose: true,
  moduleNameMapper: {
    '^.+\\.(css)$': '<rootDir>/CSSStub.js',
  },
};

module.exports = config;
