module.exports = {
  preset: 'jest-preset-angular',
  //https://github.com/thymikee/jest-preset-angular/issues/167#issuecomment-459686655
  // TODO: Only needed for @angular/cli libraries
  // modulePathIgnorePatterns: ["<rootDir>/dist/"],
  // moduleNameMapper: {
  //   "^@agm/(.*)$": "<rootDir>/dist/$1",
  // },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
};
