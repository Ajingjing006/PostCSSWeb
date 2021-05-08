var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sprites = require('postcss-sprites');

var opts = {
    stylesheetPath: 'dest/',
    spritePath    : 'img/',
    path          : 'src/img/'
};


gulp.task('sprites', function() {
  return gulp.src('src/*.css')
    .pipe(postcss([ sprites(opts) ]))
    .pipe(gulp.dest('dest/'));
});

gulp.task('watch', function(){
  gulp.watch('src/*.css', gulp.series('default'))
      .on('change', function(event){
          console.log('File '+event+' was changed, running tasks...');
  })
});

gulp.task('default', gulp.series('sprites', 'watch'));
