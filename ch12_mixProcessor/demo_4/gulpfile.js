'use strict';
 
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var clean = require('gulp-clean');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var atImport = require("postcss-import");
var precss = require('precss');
var pixrem = require('gulp-pixrem');

var stylerules = {
  "color-no-invalid-hex": 2,
  "declaration-colon-space-before": [2, "never"],
  "indentation": ["tab"],
  "number-leading-zero": [2, "always"]
};

var renameFunction = function (path) {
  path.extname = ".min.css";
  return path;
};

//var sourceMapLocation = ['dest/*.css', '!dest/*.min.css'];

gulp.task('clean', function(){
	return gulp.src(['dest/*'])
		.pipe(clean());
});

gulp.task('styles', function () {
  return gulp.src('src/style.css')
    .pipe(postcss([ atImport(), precss(), autoprefixer() ]))
    .pipe(gulp.dest('dest/'));
});

gulp.task('pxrem',function() {
  return gulp.src("dest/style.css")
    .pipe(pixrem())
    .pipe(gulp.dest('dest/'));
});

gulp.task('lint', function() {
  return gulp.src("dest/style.css")
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
  return gulp.src('dest/*.min.css')
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

gulp.task('default', gulp.series('clean', 'styles', 'pxrem', 'lint' , 'rename', 'minifyCSS', 'sourcemap', 'watch'));
