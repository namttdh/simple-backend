module.exports = {
  roots: ['<rootDir>/__tests__'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@Core/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/jest-setup.ts'],
};
