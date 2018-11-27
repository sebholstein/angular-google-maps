const globals = {
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
  'rxjs/Rx': 'Rx',
  '@agm/core': 'ngmaps.core'
};

export default {
  input: 'dist/packages/js-marker-clusterer/js-marker-clusterer.js',
  output: [{
    file: 'dist/packages/js-marker-clusterer/js-marker-clusterer.umd.js',
    name: 'ngmaps.jsMarkerClusterer',
    globals,
    sourceMap: true,
    format: 'umd'
  },{
    file: 'dist/packages/js-marker-clusterer/js-marker-clusterer.esm.js',
    globals,
    sourceMap: true,
    format: 'es'
  }],
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
  external: ['rxjs', '@angular/core', '@agm/core', 'js-marker-clusterer']
}
