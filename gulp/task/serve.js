var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    config       = require('../../package.json').gulp,
    modRewrite  = require('connect-modrewrite');

gulp.task('serve', ['jshint', 'styles'], function () {

    var options= {
        files: [config.tmp, config.app, '!'+config.app+'/(styles|spritesheet|scripts)']
    };

    if(!config.proxy){
        options.server= {
            baseDir: [
                config.app,
                config.tmp
            ],
            middleware: [
              modRewrite([
                '^[^\\.]*$ /index.html [L]'
              ])
            ]
        };

    }
    else {
        options.proxy = config.proxy;
    }

    browserSync(options);
});