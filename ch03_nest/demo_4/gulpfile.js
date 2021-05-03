var gulp = require('gulp');
var postcss = require('gulp-postcss');
var bem = require('postcss-bem');
var bemLinter = require('postcss-bem-linter');
var reporter = require('postcss-reporter');

gulp.task('lint', function() {
  return gulp.src('dest/*.css')
    .pipe(postcss([
      bemLinter({ preset: 'bem' }),
      reporter({ clearMessages: true })
    ]))
    .pipe(gulp.dest('dest/'));
});

gulp.task('bem', function() {
  return gulp.src("src/*.css")
    .pipe(postcss([bem({
      style: 'bem',
      separators: {
        descendent: '__'
      }
    })]))
    .pipe(gulp.dest('dest/'));
});

gulp.task('default', gulp.series('bem', 'lint'));

var watcher = gulp.watch('src/*.css', gulp.series('default'));
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});


//gulp.task('watch', function(){
//  gulp.watch('src/*.scss', gulp.series('default'))
//      .on('change', function(event){
//          console.log('File '+event+' was changed, running tasks...');
//  })
//});
