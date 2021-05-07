var gulp = require('gulp');
var postcss = require('gulp-postcss');
var responsiveImg = require('postcss-responsive-images');

gulp.task('default',function(){
    return gulp.src('src/*.css')
        .pipe(postcss([responsiveImg()]))
        .pipe(gulp.dest('dest'));
});

gulp.task('watch', function(){
    gulp.watch('src/*.css', gulp.series('default'))
    .on('change', function(event){
        console.log('File '+event+' was changed, running tasks...');
    })
});
