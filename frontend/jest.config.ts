import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json', // Specify the Jest-specific tsconfig
      },
    ],
  },
  moduleNameMapper: {
    // Handle Vite's path aliasing
    '^~/(.*)$': '<rootDir>/src/$1',
    // Mock static assets
    '\\.(css|scss|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
