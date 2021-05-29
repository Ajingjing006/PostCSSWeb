'use strict';
var gulp     = require('gulp');
var postcss = require('gulp-postcss');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');

var pleeease = require('gulp-pleeease');

var pleeeaseOptions = {
    optimizers: { minifier: true }
};

var stylerules = {
  "color-no-invalid-hex": 2,
  "declaration-colon-space-before": [2, "never"],
  "indentation": [2, 2],
  "number-leading-zero": [2, "always"]
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

gulp.task('lint-styles', function() {
  return gulp.src("dest/*.css")
    .pipe(postcss([ stylelint({ "rules": stylerules }), 
    reporter({ clearMessages: true })
  ]))
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

gulp.task('default', gulp.series('clean', 'styles', 'lint-styles', 'rename', 'sourcemap', 'watch'));
