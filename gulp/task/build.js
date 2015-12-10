var gulp         = require('gulp'),
    runSequence  = require('run-sequence'),
    config       = require('../../package.json').gulp;

gulp.task('build', function () {

    runSequence(['styles', 'browserify', 'copy']);

});