module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            { pattern: "./spec/*.spec.js", type: "module", included: true },
            { pattern: "./src/*.js", type: "module", included: false },
        ],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-jasmine-html-reporter',
            'karma-coverage',
            'karma-junit-reporter',
        ],
        exclude: [],
        preprocessors: {
            './src/!(*@(.spec)).js': ['coverage']
        },
        reporters: ['coverage', 'progress', 'kjhtml', 'junit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: false,
        jasmineHtmlReporter: {
            suppressAll: true 
        },
        client: {
            jasmine: {},
            clearContext: false
        },
        restartOnFileChange: true,
        coverageReporter: {
            dir: require('path').join(__dirname, './artifacts/coverage'),
            subdir: '.',
            reporters: [
              { type: 'text-summary' },
            ],
          },
    });
};