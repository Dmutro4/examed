export default {
    // Automatically clear mock calls, instances, contexts, and results before every test
    clearMocks: true,

    // A list of paths to directories that Jest should use to search for files
    roots: ['<rootDir>/'], // Root directory for Jest to search files

    // Run tests only for the specific file variant7.test.js
    testMatch: ['**/variant7.test.js'], // Match the test file explicitly

    // Specifies a threshold below which Jest will fail the test suite
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },

    // Collect coverage information for all JavaScript files in the project, excluding certain patterns
    collectCoverageFrom: [
        './libs/**/variant7.js', // Include all JS files in the libs directory
        '!**/node_modules/**', // Exclude node_modules
        '!**/__tests__/**', // Exclude test files
        '!**/coverage/**', // Exclude coverage directory
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // Transform configuration to handle ESM syntax
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Use Babel to transform JavaScript files
    },

    // Transform ignore pattern for node_modules, customize if needed
    transformIgnorePatterns: [
        '/node_modules/', // Default behavior for node_modules
    ],

    // Enable the display of coverage reports in percentages
    coverageReporters: ['text', 'lcov'], // Include `text` for console output and `lcov` for HTML reports
};
