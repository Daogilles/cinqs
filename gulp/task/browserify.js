var gulp         = require('gulp'),
    config       = require('../../package.json').gulp,
    source       = require('vinyl-source-stream'),
    gutil        = require('gulp-util'),
    browserify   = require('browserify'),
    watchify     = require('watchify'),
    stringify    = require('stringify'),
    browserSync  = require('browser-sync'),
    gStreamify   = require('gulp-streamify'),
    uglify       = require('gulp-uglify'),
    handleErrors = require('../utils/handleErrors'),
    bundleLogger = require('../utils/bundleLogger');

gulp.task('browserify', function() {

  var bundler = browserify({
    cache: {},
    packageCache: {},
    extensions: ['.html', '.js'],
    fullPaths: true,
    debug: false
  })
  .transform('html-browserify')
  .transform('browserify-shim')
  // .transform(stringify(['.html']))
  .add(config.app+'/scripts/app.js');

  var bundle = function() {
    bundleLogger.start();

    return bundler
      .bundle()
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(global.isWatching ? gutil.noop() : gStreamify(uglify()))
      .pipe(gulp.dest(global.isWatching ? config.tmp+'/scripts' : config.dist+'/scripts'))
      .pipe(browserSync.reload({
        stream: true
      }))
      .on('end', bundleLogger.end);
  };

  if(global.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
});
