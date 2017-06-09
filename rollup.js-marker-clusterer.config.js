export default {
  entry: 'dist/js-marker-clusterer/index.js',
  dest: 'dist/js-marker-clusterer/js-marker-clusterer.umd.js',
  format: 'umd',
  moduleName: 'ngmaps.jsMarkerClusterer',
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
  external: ['rxjs', '@angular/core', 'rxjs/Observable', '@agm/core', 'js-marker-clusterer']
}
