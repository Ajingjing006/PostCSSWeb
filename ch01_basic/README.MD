
# 第一章 PostCSS简介

前5页都在吹牛逼~~~
PostCss是一个“enabler”，像python一样的胶水，让各插件一起工作
PostCss: <https://github.com/postcss/postcss>
autoprefixer: <https://github.com/postcss/autoprefixer>
tailwindcss: <https://github.com/tailwindlabs/tailwindcss>

<img width="79" height="79" title="PostCSS.svg"
    src="../IMG/postcss.svg"/>      <img width="94" height="71" title="Autoprefixer.svg.svg"
    src="../IMG/autoprefixer.svg"/> <img width="273" height="64" title="Tailwindcss.svg"
    src="../IMG/tailwindcss.svg"/>

## 准备服务器

1. 搭建本地web服务器：WAMP，MAMP，Apache Web服务器，或者IIS  
   我使用的是集成到VS Code上的GoLive；
2. 创建项目目录PostCSSWeb；

## 搭建开发环境

### 1. 安装nvm: <https://github.com/nvm-sh/nvm>

   > nvm: 查看帮助  
   > nvm v/version: nvm版本  
   > nvm list: 查看已安装的nodejs  
   > nvm list available: 查看可下载的nodejs  
   > nvm install 15.14.0 64 --insecure: 安装64位的版本15.14.0的nodejs, --insecure绕过远程server的SSL  
   > nvm uninstall 15.14.0: 卸载nodejs  
   > nvm use [version] [arch]:使用指定版本nodejs  
   > nvm root [path]: 设置存储不同版本nodejs的目录；默认是当前目录  
   > nvm arch: 查看运行的nodejs是32位还是64位  
   > nvm on/off: 控制nodejs的版本管理  
   > nvm proxy [url]: 设置下载代理，不加url就显示当前代理；移除代理则将[url]设为none  
   > nvm node_mirror [url]: 设置nodejs镜像，默认<https://nodejs.org/dist/>。安装目录settings.txt文件可以查看具体设置  
   > nvm npm_mirror [url]: 设置npm镜像，默认<https://github.com/npm/cli/archive/>。安装目录settings.txt文件可以查看具体设置  
   > 添加环境变量: NVM_HOME=D:\Program\nvm  
   > 添加环境变量: NVM_SYMLINK=D:\Program\nvm\nodejs  
   > 环境变量Path: %NVM_HOME%;%NVM_SYMLINK%;  

### 2. 安装配置nodejs

   > nvm install 15.14.0 64: 安装nodejs  
   > node -v: 查看nodejs的版本  
   > npm -v: 查看npm的版本  
   > npm root -g: 查看全局依赖包的默认存储路径  
   > npm config set prefix "D:\Program\nvm\node_global": 设置自定义的存放目录，会自动创建D:\Program\nvm\node_global\node_modules  
   > npm config set cache "D:\Program\nvm\node_cache": 设置自定义的缓存目录，会自动创建  
   > c:\node\node_modules\npm\.npmrc:手动修改全局依赖包的配置  
                prefix =D:\Program\nvm\node_global  
                cache = D:\Program\nvm\node_cache  

### 3. 安装配置nrm

   > npm install -g nrm: 安装nrm  
   > nrm ls: 查看可选的npm源列表  
   > nrm use taobao: 切换源  
   > nrm add [src_name] [src_url]: 添加自定义私有源  
   > nrm del [src_name]: 删除指定源  
   > nrm test npm: 测试源的响应时间  
   > 添加环境变量: NRM_PATH=D:\Program\nvm\node_global  
   > 环境变量Path: %NRM_PATH%;  
   > npm install @vue/cli -g: 测试安装vue-cli脚手架  
   > vue create myproject  

## 项目目录下的操作

### 1. 安装gulp

   > npm init: 创建package.json，描述项目的依赖信息，根据提示填写对应信息，可以不填写，使用默认信息  
   > npm install -g gulp: 全局安装gulp  
   > npm install --save-dev gulp: 安装gulp进当前项目，会自动更新package.json  

### 2. 安装PostCSS及插件

   > npm install --save-dev gulp-postcss  
   > npm install --save-dev autoprefixer  
   > npm install --save-dev gulp-sourcemaps  
   > npm install --save-dev cssnano  
   > npm install --save-dev gulp-rename  
   > npm i --save-dev gulp-clean  

### 3. 为项目配置PostCSS

   > 根目录下创建gulp file.js:

   ```javascript
    var gulp = require('gulp');
    var postcss = require('gulp-postcss');
    var autoprefixer = require("autoprefixer");

    gulp.task('styles', function(){
        return gulp.src('src/*.css')
            .pipe(postcss([autoprefixer()]))
            .pipe(gulp.dest('dest/'));
    });
   ```

   > 根目录下创建src/example.css:

   ```css
   body{
        display: flex;
        background: green;
    }
   ```

   > 命令窗口: gulp styles  
   > 检查dest文件夹下是否生成编译后的example.css，内容是否一致  
   > 配置插件gulp-clean(清空目标文件夹), gulp-sourcemap(Source Map), cssnano(压缩), gulp-rename(重命名)  

   ```javascript
   gulp file.js:
    var gulp = require('gulp');
    var postcss = require('gulp-postcss');
    var autoprefixer = require("autoprefixer");
    var sourcemaps = require("gulp-sourcemaps");
    var rename = require('gulp-rename');
    var cssnano = require('cssnano');
    var clean = require('gulp-clean');

    gulp.task('clean', function(){
        return gulp.src(['dest/*'])
            .pipe(clean());
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

    gulp.task('default', gulp.series('clean', 'styles', 'rename'));
   ```

   > 上面task的function(){}改为回调函数styles_done()和rename_done()，可以避免以下错误：<i>The following tasks did not complete: first,Did you forget to signal async completion?</i>；  
   > 而gulp.series()可以避免以下错误：<i>AssertionError [ERR_ASSERTION]: Task function must be specified</i>；  
   > 而styles任务里加上return，是为了保证任务流顺序执行；没有return，就会导致当前任务还没完成就会同步执行下一个任务，就会报错。  

### 4. 自动化编译

   > npm i -D gulp-watch : 目前在gulp 4.0版本会有错，建议使用gulp原生监听方法watch()  

### 5. 代码审查

保持代码风格的一致性，好处太多  
<https://github.com/stylelint/stylelint/tree/master/docs/user-guide>  

在项目根目录下：
   > npm i --save-dev stylelint  
   > npm i --save-dev postcss-reporter  
   > 更新gulpfile.js  

## 总结

插件<b>autoprefixer</b>未起作用。期望结果是dest目录下生成的css文件应该添加多条针对不同浏览器的样式代码，但是未实现。  
已解决：在package.json中添加以下配置：

   ```json
   "browserslist": [
      "last 3 versions"
   ]
   ```

如果执行gulp命令遇到如下错误：  
AssertionError [ERR_ASSERTION]: Task function must be specified  
那是因为gulp的新版本不再支持旧的任务顺序语法书写：  

```javascript
gulp.task("lint-styles", ['styles'], function() {
   ...
}
...

gulp.task('default', ['styles', 'lint-styles', 'rename', 'sourcemap']);

var watcher = gulp.watch('src/*.css', ['styles', 'lint-styles', 'rename', 'sourcemap']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```

请更正为：  

```javascript
gulp.task("lint-styles", function() {
   ...
}
...

gulp.task('watch', function(){
  gulp.watch('src/*.css', gulp.series('default'))
      .on('change', function(event){
          console.log('File '+event+' was changed, running tasks...');
  })
});

gulp.task('default', gulp.series('clean', 'styles', 'lint-styles', 'sourcemap', 'watch'));

```
