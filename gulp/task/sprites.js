var gulp         = require('gulp'),
    config       = require('../../package.json').gulp;
    spritesmith  = require('gulp.spritesmith');

gulp.task('sprite', function () {
    var spriteData = gulp.src(config.app+'/spritesheet/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: '_sprite.scss',
        padding: 2,
        cssTemplate: 'spritesheet.mustache'
    }));

    spriteData.img.pipe(gulp.dest(config.app+'/images/'));
    spriteData.css.pipe(gulp.dest(config.app+'/styles/utils'));
});

gulp.task('sprite-retina', function () {
    var spriteData = gulp.src(config.app+'/spritesheet/@2x/*.png').pipe(spritesmith({
        imgName: 'sprite@2x.png',
        imgPath: '../images/sprite@2x.png',
        cssName: '_sprite@2x.scss',
        padding: 2,
        cssTemplate: 'spritesheet-retina.mustache'
    }));

    spriteData.img.pipe(gulp.dest(config.app+'/images/'));
    spriteData.css.pipe(gulp.dest(config.app+'/styles/utils'));
});