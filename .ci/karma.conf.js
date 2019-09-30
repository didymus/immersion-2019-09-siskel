module.exports = (config) => {
  config.set({
    basePath: '../',
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/underscore/underscore.js',
      'node_modules/chai/chai.js',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/mocha/mocha.js',
      'node_modules/backbone/backbone.js',

      'src/scripts/app.js',
      'test/appSpec.js',
    ],
    frameworks: ['mocha'],
    browsers: ['ChromeHeadless'],
    logLevel: config.LOG_INFO,
    singleRun: true,
    port: 9876,
  });
};
