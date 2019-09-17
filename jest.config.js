module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
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
  ],
  globals: {
    google: {
      maps: {
        Animation: {BOUNCE: 1, DROP: 2},
        MapTypeId: {
          ROADMAP: 'roadmap',
          SATELLITE: 'satellite',
          HYBRID: 'hybrid',
          TERRAIN: 'terrain',
        },
        StrokePosition: {CENTER: 0, INSIDE: 1, OUTSIDE: 2},
        SymbolPath: {
          BACKWARD_CLOSED_ARROW: 3,
          BACKWARD_OPEN_ARROW: 4,
          CIRCLE: 0,
          FORWARD_CLOSED_ARROW: 1,
          FORWARD_OPEN_ARROW: 2,
        },
      }
    }
  }
};
