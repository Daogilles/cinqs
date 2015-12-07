var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    jshint      = require('gulp-jshint'),
    browserSync = require('browser-sync'),
    config      = require('../../package.json').gulp;



gulp.task('jshint', function() {
    return gulp.src(config.app+'/scripts/**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});