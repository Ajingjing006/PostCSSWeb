var gulp = require('gulp');
var postcss = require('gulp-postcss');
var customMedia = require('postcss-custom-media');
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');

gulp.task('clean', function(){
	return gulp.src(['dest/*'])
		.pipe(clean());
});

gulp.task('autoprefixer', function() {
    return gulp.src('src/*.css')
		.pipe(postcss([ customMedia(), autoprefixer() ]))
		.pipe(gulp.dest('dest/'));
});

gulp.task("lint-styles", function() {
    return gulp.src("dest/*.css")
    .pipe(postcss([ stylelint({ 
        "rules": {
          "color-no-invalid-hex": 2,
          "declaration-colon-space-before": [2, "never"],
          "indentation": [2, 2],
          "number-leading-zero": [2, "always"]
        }
      }),
      reporter({
        clearMessages: true,
      })
    ]))
});

gulp.task('rename', function () {
	return gulp.src('dest/*.css')
    .pipe(postcss([ cssnano() ]))
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest("dest/"));
});

gulp.task('sourcemap', function () {
	return gulp.src('dest/*.css')
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

gulp.task('default', gulp.series('clean', 'autoprefixer', 'lint-styles', 'rename', 'sourcemap', 'watch'));
