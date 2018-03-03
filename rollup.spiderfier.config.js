export default {
  entry: 'dist/marker-spiderfier/index.js',
  dest: 'dist/marker-spiderfier/spiderfier.umd.js',
  format: 'umd',
  moduleName: 'ngmaps.spiderfier',
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
    '@agm/core': 'ngmaps.core',
    'ts-overlapping-marker-spiderfier': 'OMS'
  },
  context: 'window',
  external: ['rxjs', '@angular/core', 'rxjs/Observable', '@agm/core', 'ts-overlapping-marker-spiderfier']
}
