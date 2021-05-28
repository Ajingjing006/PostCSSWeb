'use strict';
var gulp = require('gulp');
var postcss = require('postcss');
//var postcss = require('gulp-postcss');
var safe = require('postcss-safe-parser');
var autoprefixer = require('autoprefixer');
var fs = require('fs');

var badCss = 'a{';

/*
gulp.task('default', function () {
  return gulp.src('src/style.css')
    .pipe(postcss([autoprefixer]).process(badCss, {parser: safe}).then(rs=>{console.log(rs.css); fs.writeFileSync('dest/style_fs.css', rs.css, ()=>true)}))
    .pipe(gulp.dest('dest/style_log.css'))
})
*/


gulp.task('default', function () {
  fs.readFile('src/style.css', (err, css) => {
    postcss([autoprefixer])
      .process(css, { parser: safe, from:'undefined' })
      .then(result => {
        console.log(result.css);
        fs.writeFileSync('dest/style.css', result.css)
        if ( result.map ) {
          fs.writeFile('dest/style.css.map', result.map.toString(), () => true)
        }
      })
  })
})


/*
gulp.task('default', function () {
  return postcss([autoprefixer()]).process(badCss,{ parser: safe()}).then(result => {
    console.log(result.css); //= 'a {}'
    fs.writeFileSync('src/output.css', result.css);
  });
});
*/
