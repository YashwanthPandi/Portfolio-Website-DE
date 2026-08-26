module.exports = {
  testEnvironment: 'jsdom',
  testTimeout: 30000,
  collectCoverageFrom: [
    'assets/js/**/*.js',
    '!assets/js/main.min.js',
    '!assets/js/plugins/**'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.jekyll-cache/',
    '/_site/'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.jekyll-cache/',
    '/_site/'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  verbose: true,
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'jsdom',
      testMatch: ['**/tests/unit.test.js'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
    },
    {
      displayName: 'integration',
      testEnvironment: 'node',
      testMatch: ['**/tests/{ui,seo,security,performance}.test.js'],
      testTimeout: 120000
    }
  ]
};
