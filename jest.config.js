// See: https://jestjs.io/docs/configuration

/** @type {import('jest').Config} */
export default {
  clearMocks: true,
  moduleFileExtensions: ['js', 'mjs'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  verbose: true,
};
