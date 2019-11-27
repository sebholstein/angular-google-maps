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
    "!node_modules/ts-overlapping-marker-spiderfier/**",
    'packages/**/*.ts',
    '!packages/**/index.ts'
  ]
};
