// module.exports = {
//   preset: '@vue/cli-plugin-unit-jest/presets/no-babel'
// }

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
