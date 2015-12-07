var gulp   = require('gulp'),
    watch  = require('gulp-watch'),
    config = require('../../package.json').gulp;

gulp.task('watch', ['setWatch', 'html', 'browserify', 'serve', 'copy'], function() {

    watch(config.app+'/**/*.scss', function(){
        gulp.start('styles');
    });

    watch(config.app+'/**/*.html', function(){
        gulp.start('html');
    });

    watch([config.app+'/**/*', '!'+config.app+'/{scripts,styles,spritesheet}/**/*', '!'+config.app+'/{scripts,styles,spritesheet}'], function(){
        gulp.start('copy');
    });


});