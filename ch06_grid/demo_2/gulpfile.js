'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-dart-sass');
var neat = require('node-neat').includePaths;

var paths={scss:'src/*.scss'};
gulp.task('styles', function () {
  return gulp.src(paths.scss)
    //.pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({
      includePaths:require('node-neat').includePaths
    }))
    .pipe(gulp.dest('dest/'));
});

gulp.task('watch', function(){
  gulp.watch('src/*.scss', gulp.series('default'))
      .on('change', function(event){
          console.log('File '+event+' was changed, running tasks...');
  })
});

gulp.task('default', gulp.series('styles', 'watch'));
