# 第五章 管理颜色、图片和字体

A picture prints a thousand word 百闻不如一见  
<[Sass框架库Compass](http://www.compass-style.org)>  

## 为网站添加颜色、字体及媒体元素

> demo_1使用Tutorial19的代码  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-assets  
> gulp  

```javascript
var options = {
  loadPaths: ['img/', 'fonts/'],
  relativeTo: 'dest/'
};

gulp.task('assets', function() {
  return gulp.src('src/*.css')
    .pipe(postcss([ assets(options), autoprefixer() ]))
    .pipe(gulp.dest('dest/'));
});
```

## 使用PostCSS管理字体

<[postcss-fontpath](https://github.com/seaneking/postcss-fontpath)>插件通过少量的自定义字体的信息，就可以编译生成完整的font-face声明  

> demo_2使用Tutorial20的代码  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-fontpath  
> gulp  

这个管理字体的插件未指定任何额外配置或规则，通过头部声明里的“font-path: '../fonts/roboto';”，就可以编译出此目录下所有复合名字的字体文件  

## 创建雪碧图

<[postcss-sprites](https://github.com/2createStudio/postcss-sprites)>插件通过少量的自定义字体的信息，就可以编译生成完整的font-face声明  

> demo_3使用Tutorial21B的代码  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev postcss-sprites  
> gulp  

在gulpfile.js中的关键代码：

```Javascript
var opts = {
    stylesheetPath: 'dest/',
    spritePath    : 'img/sprite.png',
    path          : 'src/img/'
};

gulp.task('sprites', function() {
  return gulp.src('src/*.css')
    .pipe(postcss([ sprites(opts) ]))
    .pipe(gulp.dest('dest/'));
});
```

## 在PostCSS中使用SVG

<[postcss-svg](https://github.com/Pavliko/postcsssvg/)>插件修改图标  
<[Evil Icon](https://github.com/outpunk/gulp-evil-icons/)>图标  

> demo_4使用Tutorial22的代码  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-svg  
> npm i --save-dev gulp-evil-icons  
> gulp  

postcss-svg插件会将线上的源svg图片转换为本地svg代码嵌入到html页面，也即内联引入，减少了资源的请求，且不影响图片质量  
推荐更多svg有关的插件：  

- <[postcss-write-svg](https://github.com/jonathontneal/postcss-write-svg)>可以在CSS中内联SVG  
- <[postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg)>允许内联SVG图像及自定义样式  
- <[postcss-svgo](https://github.com/ben-eb/postcss-svgo)>使用Node中的SVg优化工具优化内联SVG  

## 添加对WebP格式图像的支持

Google的WebP格式图片，只有Chrome，Android和Opera支持。  
它可以在有效节省空间的同时，保持图片的高质量。  

在支持HTML5标签的浏览器中可以通过如下定义，实现自动切换高清图片：  

```HTML
<picture>
    <source srcset="../img/landscape.webp" type="image/webp" >
    <img src="../img/landsacape.jpg" alt="The Oslo Opera House">
</picture>
```

在不支持WebP高清图片的浏览器中，可以结合使用PostCSS和Modernizr实现相同效果。  

> demo_5将Tutorial23中的cwebp.exe和landscape-original.jpg，landscape.png，paper-clip.png复制到项目目录cwebp  
> Node命令窗口执行 cwebp -q 100 landscape.jpg -o landscape_jpg.webp  
> Node命令窗口执行 cwebp -q 100 landscape.png -o landscape_png.webp  
> Node命令窗口执行 cwebp -q 100 paper-clip.png -o paper-clip.webp  
> 以上三步可以得到三个体积小，质量高的webp图片  

demo_5通过PostCSS插件实现：  

> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-webp  
> npm i --save-dev gulp-webpcss  
> gulp  

<b style="color:red;">这个转换操作未成功，目前未找到原因和解决方案</b>  

以下两个插件未作测试：  
> [cwebp-bin](https://github.com/imagemin/cwebp-bin)  
> [imagemin-webp](https://github.com/imagemin/imagemin-webp)  

## 操作颜色和调色板

<[postcss-color-palette](https://github.com/zaim/postcss-color-palette)>插件提供一个调色盘，通过颜色名选择一种或多种颜色，然后转换为十六进制的色值  
<[postcss-color-mix](https://github.com/iamstarkov/postcss-color-mix)>插件简单的混合几种颜色，以产生新颜色  

> demo_6使用Tutorial24的代码  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-color-palette  
> npm i --save-dev postcss-color-mix  
> gulp  
下面是针对guilpfile.js的修改：  

```JavaScript
gulp.task('palette', function () {
  return gulp.src('src/*.css')
    .pipe(postcss([ autoprefixer(), palette({ palette: 'mrmrs' }), colormix() ]))
    .pipe(gulp.dest('dest/'));
});
```

本实例默认使用了调色盘的mrmrs选项，还可用material或flatui选项  
参考插件<[webcolors](https://github.com/zaim/webcolors)>  
评估颜色混合效果的方法<[color](http://jackiebalzer.com/color)>  

推荐插件：  

- colorguard：用于维护一致的调色盘  
- postcss-ase-colors：用一个从AER调色盘文件中读取的值替换颜色名称  
- postcss-shades-of-gray：保持颜色的灰度值一致  
- postcss-color-pantone：用普通色卡表示的颜色转换成RGB  

## 使用PostCSS创建颜色函数

> demo_7使用Tutorial25的代码  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-color-function  
> npm i --save-dev css-color-converter  
> gulp  

注意上述示例的样式文件中的#box3，因为这个插件不支持CSS3滤镜sepia()，故使用了样式“background-color: color(red red(-47) green(+20) blue(+26));”  
推荐网站，检查颜色应用滤镜的效果：  

- <[Color](http://jackiebalzer.com/color)>  
- <[ColorHexa](http://www.colorhexa.com)>  

由于postcss-color-function插件不支持一些CSS3的滤镜，可以换用postcss-functions插件  
这个插件可以直接引用CSS3滤镜函数，也可以创建自己的滤镜  

> demo_8使用Tutorial26的代码  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-functions  
> npm i --save-dev css-color-converter  
> gulp  

关于两个插件的组合使用，请参考<[postcss-functions](https://github.com/andyjansson/postcss-functions)>  
在这个实例的样式表文件中，编译前的box的样式应用了CSS3的滤镜函数，通过PostCSS插件编译后，可以应用到不支持CSS3滤镜的浏览器中：  

```css
#box0 { 
  background-color: #ff0000;
}

#box1 { 
  background-color: tint(red, 0.6);
}

#box2 { 
  background-color: darken(red, 0.6);
}

#box3 {
  background-color: sepia(red, 0.7);
}
```

推荐网站：  

- <[StackOverflow](http://stackoverflow.com/questions/6615002/given-an-rgbvalue-how-do-i-create-a-tiny-or-shade)>  
- <[CSS Tricks](http://css-tricks.com/snippets/javascript/lighten-darken-color)>  
- <[CamanJS](http://camanjs.com/docs/filters.html)>  
- <[Tinter-shader](http://highintegritydesign.com/tools/tinter-shader/)>  

另外，CamanJS虽好，但毕竟是一个外部依赖库，影响代码稳定性  
PostCSS可以解除这种外部依赖，生成自己的样式代码  

## 给照片添加Instagram效果

通过<[postcss-instagram](https://github.com/azat-io/postcss-instagram)>滤镜，可以快速给图像应用额外样式  

> demo_9使用Tutorial27的代码  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-instagram  
> gulp  

在这个实例的样式表文件中，应用了插件提供的一种滤镜，叫1977。  
该插件源码地址：<[postcss-instagram](https://github.com/azat-io/postcss-instagram/blob/master/index.js)>  
