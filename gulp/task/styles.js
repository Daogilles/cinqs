var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    notify       = require("gulp-notify"),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    handleErrors = require('../utils/handleErrors'),
    reload       = browserSync.reload,
    config       = require('../../package.json').gulp;



gulp.task('styles', function() {
    return gulp.src(config.app+'/styles/*.scss')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }))
        .pipe(gulp.dest(global.isWatching ? config.tmp+'/styles' : config.dist+'/styles'))
        .pipe(reload({
            stream: true
        }));
});
