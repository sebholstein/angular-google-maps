export default {
  input: 'dist/packages/marker-with-label/index.js',
  output: {
    file: 'dist/packages/marker-with-label/marker-with-label.umd.js',
    name: 'ngmaps.markerWithLabel',
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
    sourceMap: true,
    format: 'umd',
  },
  context: 'window',
  external: ['rxjs', '@angular/core', 'rxjs/Observable', '@agm/core', 'markerwithlabel']
}
