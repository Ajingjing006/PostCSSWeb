var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var rename = require('gulp-rename');
var cssnano = require('cssnano');
var clean = require('gulp-clean');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var cssvariables = require('postcss-css-variables');
var cssmixins=require('postcss-mixins');
var calc=require('postcss-calc');

gulp.task('clean', function(){
	return gulp.src(['dest/*'])
		.pipe(clean());
});


gulp.task('lint-style', function(){
    return gulp.src('dest/*.css')
        .pipe(postcss([stylelint({
            "rules":{
                "color-no-invalid-hex":true,
                "color-hex-case": [
                  "lower",
                  {
                    "message": "Lowercase letters are easier to distinguish from numbers"
                  }
                ],
                "declaration-colon-space-after":"never",
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

gulp.task('autoprefixer', function() {
    return gulp.src('src/*.css')
        .pipe(postcss([ autoprefixer(), cssnano(), cssvariables(/* options */), cssmixins(/* options */), calc(/* options */) ]))
        //.pipe(sourcemaps.init())
        //.pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('dest/'));
});

gulp.task('rename', function () {
    return gulp.src('dest/style.css')
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest("dest/"));
});

/* 1. 使用gulp原生的watch任务，监听已有文件的改动，无法监听新增的文件 */
gulp.task('watch', function(){
    gulp.watch('src/*.css', gulp.series('default'))
        .on('change', function(event){
            console.log('File '+event+' was changed, running tasks...');
    })
});

// clean
gulp.task('default', gulp.series('clean', 'lint-style', 'autoprefixer', 'rename', 'watch'));
