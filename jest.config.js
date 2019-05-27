const COVERAGE_THRESHOLD_PERCENT = 95;

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    maxConcurrency: Infinity,
    coverageThreshold: {
        global: {
            branches: COVERAGE_THRESHOLD_PERCENT,
            functions: COVERAGE_THRESHOLD_PERCENT,
            lines: COVERAGE_THRESHOLD_PERCENT,
            statements: COVERAGE_THRESHOLD_PERCENT
        }
    }
};
