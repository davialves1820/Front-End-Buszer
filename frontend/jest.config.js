export default {
    testEnvironment: 'jsdom',

    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },

    setupFilesAfterEnv: ['@testing-library/jest-dom'],

    moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
    }
};
