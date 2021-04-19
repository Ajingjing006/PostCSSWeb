var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var rename = require('gulp-rename');
var cssnano = require('cssnano');
var clean = require('gulp-clean');
//var watch = require('gulp-watch');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');

gulp.task('clean', function(){
	return gulp.src(['dest/*'])
		.pipe(clean());
});

gulp.task('lint-style', function(){
    return gulp.src('src/*.css')
        .pipe(postcss([stylelint({
            "rules":{
                "color-no-invalid-hex":true,
                "color-hex-case": [
                  "lower",
                  {
                    "message": "Lowercase letters are easier to distinguish from numbers"
                  }
                ],
                "declaration-colon-space-after":"always",
                "declaration-colon-space-before":"never",
                "indentation":[
                    4,
                    {
                      "except": ["block"],
                      "message": "Please use 4 spaces for indentation.",
                      "severity": "warning"
                    }
                  ],
                "number-leading-zero":null
            }
        }),reporter({
            clearAllMessages: true,
        })]))
});

gulp.task('styles', styles_done => {
    return gulp.src('src/*.css')
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('dest/'));
    styles_done();
});

gulp.task('rename', rename_done =>{
    gulp.src('dest/example.css')
        .pipe(postcss([ cssnano() ]))
        .pipe(rename('example.min.css'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest("dest/"));
    rename_done();
});

/* 1. 使用gulp原生的watch任务，监听已有文件的改动，无法监听新增的文件 */
gulp.task('watch', function(){
    gulp.watch('src/*.css', gulp.series('default'))
        .on('change', function(event){
            console.log('File '+event+' was changed, running tasks...');
    })
});


/* 2. 使用gulp-watch分类监听文件变化，并可以监听到新增的文件
      在gulp 4.0的版本报错
*/
//gulp.task('watch', function(){
//    w('src/*.css', 'default');

//    function w(path, task){
//        watch(path, function(event){
//           console.log('File '+event+' was changed, running tasks...');
//            gulp.start(task);
//        });
//    }
//});

//分开监听，减少开发模式下的性能消耗
//gulp.task('watch', function () {
//    w('./src/**/*.html', 'html');
//    w('./src/js/**', 'js_main');
//    w('./src/libs/**/*.js', 'js_libs');
//    w('./src/css/**', 'css_main');
//    w('./src/libs/**/*.css', 'css_libs');
//    w('./src/images/**', 'images');

//    function w(path, task){
//        watch(path, gulp.series(task), function(event){
//            console.log('File '+event+' was changed, running tasks...');
//        });
//    }
//});


// clean
gulp.task('default', gulp.series('clean', 'lint-style', 'styles', 'rename', 'watch'));
