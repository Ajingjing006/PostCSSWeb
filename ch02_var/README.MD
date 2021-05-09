
# 第二章 创建变量和混合宏

## 设置Sass

> 在Node.js命令提示符窗口，切换到项目目录  
> npm install --save-dev gulp-sass  
> 复制上一章的demo下的gulpfile.js，到当前项目下，此处重命名为demo_1  
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

> 切换到项目根目录demo_2  
> npm i --save-dev postcss-css-variables  (此插件比postcss-custome-properties更灵活)  
> 在gulpfile.js中移除sass的引用，并添加postcss-css-variables  
> 使用Tutorial2/src下的style.css  
> 执行gulp命令，检查dest目录下的*.css  

本例将变量都放在了:root里声明。也可以利用插件postcss-constants声明在单独文件内，然后导入；还可以将变量声明放在gulp任务中：

```javascript
    var postcss=require('postcss');
    var cssvariables=require('post-css-variables');
    postcss([
        cssvariables({
            variables:{
                '-foo-var':{'100px', isImportant:true},
                '--other-var':{value:'#00CC00'},
                '--important-var':{value:'#FFCC00'}
            }
        })
    ]).process(css, opts);
```

## 设置插件顺序

一般在插件的主页，会提示开发人员相关插件的先后顺序  

## 使用PostCSS创建混合宏

> npm i --save-dev postcss-mixins  
> npm i --save-dev postcss-calc  
> 在gulpfile.js中引用混合宏插件，并修改autoprefixer任务  
> 在style.css中定义混合宏fontstyle  
> 在h3, .info h3, .info p样式中引用混合宏  
> 执行gulp命令，检查dest目录下的*.css  

推荐插件：postcss-pxtorem，它可以在编译过程由px值一致地生成rem值

## 使用PostCSS循环内容

两个循环插件：
postcss-each: 针对对象循环  
postcss-fo: 需要有确定数字范围应用样式(不同于postcss-for)  

> 切换到项目根目录demo_3  
> npm i --save-dev postcss-each  
> 在gulpfile.js中引用each插件，并移除无用插件  
> 修改autoprefixer任务
> 使用Tutorial4/src下的style.css，及图片和页面  
> 修改完成style.css后，执行gulp命令  
> 将dest目录下生成的*.css，复制到css目录下  
> 浏览index.html  

## 总结

插件<b>node-sass</b>，<b>gulp-sass</b>安装失败。换成<b>dart-sass</b>插件也没起作用。
> npm i --save-dev sass  
> var sass = require('sass');  

已解决：
gulp-sass插件已停止更新。
dart-sass <https://sass-lang.com/dart-sass>  
换成如下插件可用  
> npm i --save-dev gulp-dart-sass
