export default {
  entry: 'dist/core/index.js',
  dest: 'dist/core/core.umd.js',
  format: 'umd',
  moduleName: 'ngmaps.core',
  sourceMap: true,
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/compiler': 'ng.compiler',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    'rxjs/Subject': 'Rx',
    'rxjs/observable/PromiseObservable': 'Rx',
    'rxjs/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/Observable': 'Rx',
    'rxjs/Rx': 'Rx'
  },
  context: 'window',
  external: ['rxjs', '@angular/core', 'rxjs/Observable']
}
