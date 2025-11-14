export default {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

    moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',

    // Mock de CSS
    '\\.(css|less|scss)$': 'identity-obj-proxy',

    // Mock de imagens
    '\\.(png|jpg|jpeg|gif|svg|webp|ico)$': '<rootDir>/__mocks__/fileMock.js',
    },


  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
