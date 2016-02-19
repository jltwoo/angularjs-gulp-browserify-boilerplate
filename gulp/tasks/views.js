'use strict';

import config        from '../config';
import gulp          from 'gulp';
import handleErrors from '../util/handleErrors';
import browserSync   from 'browser-sync';
import templateCache from 'gulp-angular-templatecache';
import gulpJade      from 'gulp-jade';

// Views task
gulp.task('views', function() {
  var locals ={
    locals: {
      MOCK_BACKEND:(!global.isProd && config.browserify.mockBackEnd)
    }
  }
  // Put our index.html in the dist folder
  gulp.src([
    config.views.index,
    config.views.indexBusiness
    ])
    .pipe(gulpJade(locals))
    .pipe(gulp.dest(config.buildDir));

  // Process any other view files from app/views
  return gulp.src(config.views.src)
    .pipe(gulpJade(locals))
    .on('error', handleErrors)
    // templateCache converts the html files into single template.js
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest(config.views.dest))
    .pipe(browserSync.stream());

});
