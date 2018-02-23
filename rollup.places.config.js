export default {
  entry: 'dist/places/index.js',
  dest: 'dist/places/core.umd.js',
  format: 'umd',
  moduleName: 'ngmaps.places',
  sourceMap: true,
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/compiler': 'ng.compiler',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    'js-marker-clusterer': 'MarkerClusterer',
    'rxjs/Subject': 'Rx',
    'rxjs/observable/PromiseObservable': 'Rx',
    'rxjs/observable/fromEventPattern': 'Rx.Observable.prototype',
    'rxjs/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/Observable': 'Rx',
    'rxjs/Rx': 'Rx',
    '@agm/core': 'ngmaps.core'
  },
  context: 'window',
  external: ['rxjs', '@angular/core', 'rxjs/Observable', '@agm/core', 'js-marker-clusterer']
}
