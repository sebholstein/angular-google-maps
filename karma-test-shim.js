// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

require('core-js/client/shim');
require('reflect-metadata');

require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

var ctx = require.context('./src', true, /\.spec\.ts/);
ctx.keys().forEach(ctx);

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');
testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());