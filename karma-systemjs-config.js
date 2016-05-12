(function (global) {
    var map = {
        'rxjs': 'base/node_modules/rxjs',
        '@angular': 'base/node_modules/@angular'
    };
    var packages = {
        'rxjs': { defaultExtension: 'js' },
    };
    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic'
    ];
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });
    var config = {
        map: map,
        packages: packages
    };
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }
    System.config(config);
})(this);
