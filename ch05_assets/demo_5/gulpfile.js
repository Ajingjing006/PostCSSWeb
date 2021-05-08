var gulp = require('gulp');
var postcss = require('gulp-postcss');
var webp = require('gulp-webp');
var webpcss = require('gulp-webpcss');

gulp.task('webp', function() {
  return gulp.src('img/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('img/'));
});

gulp.task('css', function () {
    var processors = [ webpcss.default({webpClass: '.js.webp'}) ];
    return gulp.src('src/*.css')
        .pipe( postcss(processors) )
        .pipe( gulp.dest('dest/') );
});

gulp.task('watch', function(){
  gulp.watch('src/*.css', gulp.series('default'))
      .on('change', function(event){
          console.log('File '+event+' was changed, running tasks...');
  })
});

gulp.task('default', gulp.series('webp', 'css', 'watch'));
