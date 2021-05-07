var gulp = require('gulp')
var postcss=require('gulp-postcss')
var report = require('postcss-reporter')
var custMedia=require('postcss-custom-media')

gulp.task('default', function () {
    return gulp.src('src/*.css')
        .pipe(postcss([custMedia()]))
        .pipe(gulp.dest('dest/'));
});

gulp.task('watch', function(){
    gulp.watch('src/*.css', gulp.series('default'))
        .on('change', function(event){
            console.log('File '+event+' was changed, running tasks...');
    })
});
