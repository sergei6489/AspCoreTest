/// <binding BeforeBuild='copy-css' AfterBuild='libs' Clean='clean' />
var gulp = require('gulp'),
     Q = require('q');

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


gulp.task('clean', function (cb) {
    return rimraf('./wwwroot/lib/', cb);
});

gulp.task('copy:lib', function () {
    var libs = [
        "@angular",
        "@angular2-material",
        "jquery",
        "systemjs",
        "core-js",
        "zone.js",
        "reflect-metadata",
        "symbol-observable",
        "rxjs"
    ];

    var promises = [];

    libs.forEach(function (lib) {
        var defer = Q.defer();
        var pipeline = gulp
            .src('node_modules/' + lib + '/**/*')
            .pipe(gulp.dest('./wwwroot/lib/' + lib));

        pipeline.on('end', function () {
            defer.resolve();
        });
        promises.push(defer.promise);
    });

    return Q.all(promises);
});