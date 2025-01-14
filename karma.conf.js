// Karma configuration
// Generated on Fri Jan 09 2015 07:42:33 GMT-0700 (MST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
			{
				pattern: 'node_modules/canopy-styleguide/build/*.eot',
				watched: true,
				included: false,
				served: true
			},
			{
				pattern: 'node_modules/canopy-styleguide/build/*.ttf',
				watched: true,
				included: false,
				served: true
			},
			{
				pattern: 'node_modules/canopy-styleguide/build/*.woff',
				watched: true,
				included: false,
				served: true
			},
			'node_modules/canopy-styleguide/build/styleguide.css',
			'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/lodash/index.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'build/*.js',
      'src/*spec.js'
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
