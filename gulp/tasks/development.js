'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], function(cb) {

  global.isProd = false;

  runSequence(['styles', 'images', 'fonts', 'views', 'browserify'], 'watch', cb);

});

gulp.task('dev-compile', ['clean'], function(cb) {

  global.isProd = false;

  cb = cb || function() {};

  runSequence(['styles', 'images', 'fonts', 'views'], 'browserify', 'gzip', cb);

});