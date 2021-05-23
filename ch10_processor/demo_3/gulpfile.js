'use strict';
 
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var clean = require('gulp-clean');
var images = require('gulp-imagemin');
//var images = require('imagemin');
var jpegtran = require('imagemin-jpegtran');
//var mozjpeg = require('imagemin-mozjpeg');

gulp.task('clean', function(){
	return gulp.src(['img/*'])
		.pipe(clean());
});

gulp.task('images', function () {
  return gulp.src('src/*')
    .pipe(images())
      //images({ optimizationLevel: 7, progressive: true, interlaced: true }))

      /*
      images([
        images.gifsicle({interlaced: true}),
        images.mozjpeg({quality: 75, progressive: true}),
        images.optipng({optimizationLevel: 5}),
        images.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ]))
      */

     /*
      (async () => {
        await images(['src/*.jpg'], {
        destination: 'img/',
        plugins: [
          jpegtran()
        ]
      })

      //console.log('Images optimized');
      })())
    */
    .pipe(gulp.dest('img/'));
});

    gulp.task('miniImages', function () {
          return gulp.src('src/*.{jpg,png,gif,ico}')
              .pipe(images())
              .pipe(gulp.dest('img'))
      });

gulp.task('watch', function(){
  gulp.watch('src/*.jpg', gulp.series('default'))
      .on('change', function(event){
          console.log('File '+event+' was changed, running tasks...');
  })
});

gulp.task('default', gulp.series('clean', 'miniImages', 'watch'));
