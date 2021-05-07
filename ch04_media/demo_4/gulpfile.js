var gulp = require('gulp');
var postcss = require('gulp-postcss');
var customMedia = require('postcss-custom-media');
var clean = require('gulp-clean');

gulp.task('clean', function(){
	return gulp.src(['dest/*'])
		.pipe(clean());
});

gulp.task('customMedia', function() {
    return gulp.src('src/*.css')
		.pipe(postcss([ customMedia() ]))
		.pipe(gulp.dest('dest/'));
});

gulp.task('watch', function(){
  gulp.watch('src/*.css', gulp.series('default'))
      .on('change', function(event){
          console.log('File '+event+' was changed, running tasks...');
  })
});

gulp.task('default', gulp.series('clean', 'customMedia', 'watch'));
