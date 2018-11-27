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
  input: 'dist/packages/snazzy-info-window/snazzy-info-window.js',
  output: [{
    file: 'dist/packages/snazzy-info-window/snazzy-info-window.umd.js',
    name: 'ngmaps.snazzyInfoWindow',
    globals,
    sourceMap: true,
    format: 'umd',
  },{
    file: 'dist/packages/snazzy-info-window/snazzy-info-window.esm.js',
    globals,
    sourceMap: true,
    format: 'es',
  }],
  experimentalDynamicImport: true,
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
  external: ['rxjs', '@angular/core', '@agm/core']
}
