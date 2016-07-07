(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'angular2-jwt': 'node_modules/angular2-jwt/angular2-jwt.js',
        'app': 'app', // 'dist',
        'rxjs': 'lib/rxjs',
        'symbol-observable': 'lib/symbol-observable',
        '@angular': 'lib/@angular',
        '@angular2-material': 'lib/@angular2-material'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        '@angular2-material/core': { main: 'core.js', defaultExtension: 'js' },
        '@angular2-material/checkbox': { main: 'checkbox.js', defaultExtension: 'js' },
        '@angular2-material/button': { main: 'button.js', defaultExtension: 'js' },
        '@angular2-material/progress-circle': { main: 'progress-circle.js', defaultExtension: 'js' },
        '@angular2-material/card': { main: 'card.js', defaultExtension: 'js' },
        '@angular2-material/input': { main: 'input.js', defaultExtension: 'js' },
        '@angular2-material/toolbar': { main: 'toolbar.js', defaultExtension: 'js' },
        'app': { main: 'boot.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'symbol-observable': { main: 'index.js', defaultExtension: 'js' }
    };

    var packageNames = [
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    }

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);