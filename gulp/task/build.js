var gulp         = require('gulp'),
    runSequence  = require('run-sequence'),
    config       = require('../../package.json').gulp;

gulp.task('build', ['clean'], function () {

    runSequence(['styles', 'browserify', 'copy']);

});