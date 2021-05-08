'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-dart-sass');
 
gulp.task('sass', function () {
  return gulp.src('src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dest/'));
});

gulp.task('watch', function(){
  gulp.watch('src/*.scss', gulp.series('default'))
      .on('change', function(event){
          console.log('File '+event+' was changed, running tasks...');
  })
});

gulp.task('default', gulp.series('sass', 'watch'));
