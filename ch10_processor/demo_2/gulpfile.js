'use strict';
 
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var clean = require('gulp-clean');
var nano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var pseudoContent = require('postcss-pseudo-elements-content');

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
    .pipe(postcss([ autoprefixer(), pseudoContent() ]))
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

gulp.task('minifyCSS', function () {
  return gulp.src('dest/*.min.css')
    .pipe(nano({ autoprefixer: false }))
    .pipe(gulp.dest("dest/"));
});

gulp.task('sourcemap', function () {
  return gulp.src(sourceMapLocation)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest("dest/"));
});

gulp.task('watch', function(){
  gulp.watch('src/*.css', gulp.series('default'))
      .on('change', function(event){
          console.log('File '+event+' was changed, running tasks...');
  })
});

gulp.task('default', gulp.series('clean', 'styles', 'lint-styles', 'rename', 'minifyCSS', 'sourcemap', 'watch'));
