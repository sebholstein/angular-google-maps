export default {
  input: 'dist/packages/core/index.js',
  output: {
    file: 'dist/packages/core/core.umd.js',
    name: 'ngmaps.core',
    globals: {
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
      '@angular/compiler': 'ng.compiler',
      '@angular/platform-browser': 'ng.platformBrowser',
      '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
      'js-marker-clusterer': 'MarkerClusterer',
      'rxjs/Subject': 'Rx',
      'rxjs/observable/PromiseObservable': 'Rx',
      'rxjs/operator/toPromise': 'Rx.Observable.prototype',
      'rxjs/Observable': 'Rx',
      'rxjs/Rx': 'Rx'
    },
    sourceMap: true,
    format: 'umd'
  },
  context: 'window',
  external: ['rxjs', '@angular/core']
}
