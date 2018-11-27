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
  'rxjs/Rx': 'Rx'
};

export default {
  input: 'dist/packages/core/core.js',
  output: [{
    file: 'dist/packages/core/core.umd.js',
    name: 'ngmaps.core',
    globals,
    sourceMap: true,
    format: 'umd'
  },{
    file: 'dist/packages/core/core.esm.js',
    globals,
    sourceMap: true,
    format: 'es'
  }],
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
  external: ['rxjs', 'rxjs/operators', '@angular/core', '@angular/common']
}
