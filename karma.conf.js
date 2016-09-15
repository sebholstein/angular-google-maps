module.exports = function(config) {
  var configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher')
    ],
    customLaunchers: {
        Chrome_travis: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },
    files: [
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/core-js/client/core.js',
      'node_modules/reflect-metadata/Reflect.js',

      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',
      
      {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
      
      {pattern: 'karma-systemjs-config.js', included: true, watched: true},
      
      {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false},
      {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false},
      
      {pattern: 'karma-test-shim.js', included: true, watched: true},

      // paths loaded via module imports
      {pattern: 'dist/**/*.js', included: false, watched: true},
      {pattern: 'test-built/**/*.js', included: false, watched: true},

      // paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      // {pattern: 'dist/**/*.html', included: false, watched: true},
      // {pattern: 'dist/**/*.css', included: false, watched: true},

      // paths to support debugging with source maps in dev tools
      {pattern: 'dist/**/*.ts', included: false, watched: false},
      {pattern: 'dist/**/*.js.map', included: false, watched: false}
    ],

    // proxied base paths
    proxies: {
      // required for component assests fetched by Angular's compiler
      '/dist/': '/base/dist/',
      '/base/src/': '/base/dist/',
      '/base/test-built/src': '/base/dist'  
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  };
  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis'];
  }
  config.set(configuration);
};
