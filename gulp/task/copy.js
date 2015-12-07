var gulp         = require('gulp'),
    runSequence  = require('run-sequence'),
    config       = require('../../package.json').gulp;


gulp.task('copy', function(){

    gulp.src([config.app+'/**/*', '!'+config.app+'/{scripts,styles,spritesheet}/**/*', '!'+config.app+'/{scripts,styles,spritesheet}'])
        .pipe(gulp.dest(config.dist));

});