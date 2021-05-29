'use strict';
var gulp     = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var pleeease = require('gulp-pleeease');

var pleeeaseOptions = {
  optimizers: { minifier: true }
};

var renameFunction = function (path) {
  path.extname = ".min.css";
  return path;
};

var sourceMapLocation = ['dest/*.css', '!dest/*.min.css'];

gulp.task('clean', function(){
	return gulp.src(['dest/*'])
		.pipe(clean());
});

gulp.task('styles', function () {
  return gulp.src('src/*.css')
    .pipe(pleeease(pleeeaseOptions))
    .pipe(gulp.dest('dest/'));
});

gulp.task('rename', function () {
  return gulp.src('dest/*.css')
    .pipe(rename(renameFunction))
    .pipe(gulp.dest("dest/"));
});

gulp.task('sourcemap', function () {
  return gulp.src(sourceMapLocation)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/', {
      sourceMappingURLPrefix: 'https://www.mydomain.com/'
    }))
    .pipe(gulp.dest("dest/"));
});

gulp.task('watch', function(){
  gulp.watch('src/*.css', gulp.series('default'))
      .on('change', function(event){
          console.log('File '+event+' was changed, running tasks...');
  })
});

gulp.task('default', gulp.series('clean', 'styles', 'rename', 'sourcemap', 'watch'));
