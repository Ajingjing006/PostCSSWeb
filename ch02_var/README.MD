
# 第二章 创建变量和混合宏

## 设置Sass

> 在Node.js命令提示符窗口，切换到项目目录
> npm install --save-dev gulp-sass
> 复制上一章的demo下的gulpfile.js，到当前项目下
> npm init
> npm i --save-dev gulp
   > npm install --save-dev gulp-postcss  
   > npm install --save-dev autoprefixer  
   > npm install --save-dev gulp-sourcemaps  
   > npm install --save-dev cssnano  
   > npm install --save-dev gulp-rename  
   > npm i --save-dev gulp-clean  
   > npm i --save-dev stylelint  
   > npm i --save-dev postcss-reporter  
> npm i --save-dev gulp-dart-sass : node-sass/gulp-sass are deprecated, dart-sass not work from my env, so replaced by gulp-dart-sass via this cmd

更新gulpfile.js:

```javascript
var sass = require('gulp-dart-sass');
// ...
gulp.task('watch', function(){
    gulp.watch('src/*.scss', gulp.series('default'))
        .on('change', function(event){
            console.log('File '+event+' was changed, running tasks...');
    })
});

gulp.task('sass', function(){
    return gulp.src('src/*.scss')
        .pipe(sass.sync({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dest/'));
});

gulp.task('default', gulp.series('clean', 'sass', 'lint-style', 'autoprefixer', 'rename', 'watch'));
```
执行gulp命令，修改src/style.scss,查看是否生成dest/*.css  
复制*.css和maps/*.min.css.map到css目录下  
浏览器打开index.hml,查看鼠标悬停效果  

## 过渡到PostCSS



## 总结

插件<b>node-sass</b>，<b>gulp-sass</b>安装失败。换成<b>dart-sass</b>插件也没起作用。
> npm i --save-dev sass  
> var sass = require('sass');  

已解决：
gulp-sass插件已停止更新。
dart-sass <https://sass-lang.com/dart-sass>  
换成如下插件可用  
> npm i --save-dev gulp-dart-sass
