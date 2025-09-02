// See: https://jestjs.io/docs/configuration

/** @returns {Promise<import('jest').Config>} */
export default async () => {
  return {
    clearMocks: true,
    moduleFileExtensions: ['js'],
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    testPathIgnorePatterns: ['/dist/', '/node_modules/'],
    verbose: true,
  };
};
