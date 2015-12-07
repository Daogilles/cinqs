var gulp   = require('gulp'),
    del    = require('del'),
    config = require('../../package.json').gulp;


gulp.task('clean', function (cb) {
    del([config.dist], cb);
});