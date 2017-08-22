export default {
  entry: 'dist/snazzy-info-window/index.js',
  dest: 'dist/snazzy-info-window/snazzy-info-window.umd.js',
  format: 'umd',
  moduleName: 'ngmaps.snazzyInfoWindow',
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
    'rxjs/Rx': 'Rx',
    '@agm/core': 'ngmaps.core'
  },
  context: 'window',
  external: ['rxjs', '@angular/core', 'rxjs/Observable', '@agm/core']
}
