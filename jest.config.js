module.exports = {
  setupTestFrameworkScriptFile: './jest.setup.js',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/packages/.*\\.spec)\\.ts$',
  moduleFileExtensions: [
    'js',
    'ts'
  ],
  collectCoverageFrom: [
    'packages/**/*.ts',
    '!packages/**/index.ts'
  ]
};