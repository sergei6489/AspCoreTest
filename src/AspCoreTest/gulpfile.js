/// <binding BeforeBuild='copy-css' AfterBuild='libs' Clean='clean' />
var gulp = require('gulp');
var rimraf = require('rimraf');
var _ = require('lodash');

var css = [
    './node_modules/bootstrap/dist/css/bootstrap.css'
];

var fonts = [
    './node_modules/bootstrap/dist/fonts/*.*'
];


gulp.task('copy-css', function () {
    _.forEach(css, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/lib/css'))
    });
    _.forEach(fonts, function (file, _) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/lib/fonts'))
    });
});

var paths = {
    npm: './node_modules/',
    lib: './wwwroot/lib/'
};

var libs = [
    paths.npm + 'angular2/bundles/angular2.dev.js',
    paths.npm + 'angular2/bundles/http.dev.js',
    paths.npm + 'angular2/bundles/angular2-polyfills.js',
    paths.npm + 'es6-shim/es6-shim.js',
    paths.npm + 'systemjs/dist/system.js',
    paths.npm + 'jquery/dist/jquery.js',
    paths.npm + 'jquery-ui/jquery-ui.js',
    paths.npm + 'bootstrap/dist/js/bootstrap.min.js',
    paths.npm + 'systemjs/dist/system-polyfills.js'
];

gulp.task('rxjs', function () {
    return gulp.src(paths.npm + 'rxjs/**/*.js').pipe(gulp.dest(paths.lib + 'rxjs/'));
});

gulp.task('libs', ['rxjs'], function () {
    return gulp.src(libs).pipe(gulp.dest(paths.lib));
});

gulp.task('clean', function (callback) {
    rimraf(paths.lib, callback);
});