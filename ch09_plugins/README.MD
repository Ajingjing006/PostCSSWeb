# 第九章 简写型插件，降级插件和包型插件

## 简写型插件

|名称|功能|
|:---|:---|
|[postcss-focus](https://github.com/postcss/postcss-focus/)|为样式表中的:hover伪类元素添加:focus伪类选择器|
|[postcss-border](https://github.com/andrepolischuk/postcss-border/)|根据简写的border属性生成相应的border-width属性|
|[postcss-shaort-data](https://github.com/jonathantneal/postcss-shaort-data/)|简化自定义数据属性选择器，简化的属性会在编译后生成data-前缀选择器|
|[postcss-responsive-type](https://github.com/madeleineostoja/postcss-responsive-type/)|自动响应式排版，为font-size，line-height，letter-spacing添加响应式属性，以生成复杂的基于calc和vw的字体大小|
|[postcss-easings](https://github.com/postcss/postcss-easings/)|将easing.net的easing缓动动画名称替换为bezier()|
|[postcss-easing-gradients](https://github.com/larsenwork/postcss-easing-gradients/)|创建近似缓动函数的平滑性渐变|
|[postcss-transform-shortcut](https://github.com/csstools/postcss-transform-shortcut/)|允许在CSS中简写转换属性|
|[postcss-transition-shortcut](https://github.com/alexlibby/postcss-transition-shortcut/)|允许在CSS中简写过渡属性|

## 包型插件

提供一个简单的接口，用于操作多个单一的插件  

|名称|功能|
|:---|:---|
|[Oldie](https://github.com/csstools/oldie/)|包含九个插件，将CSS转换为兼容低版本IE浏览器的脚本|
|[Short](https://github.com/csstools/postcss-short/)|支持在CSS中使用高级简写属性。集成到[Smashing Magazine](https://www.smashingmagazine.com/2015/12/introduction-to-postcss/#extendedshorthandpropertieswithpostcss-short/)|
|[AtCSS](https://github.com/morishitter/atcss/)|允许开发者创建基础样式，并应用到其他样式中，类似Sass的@extend|
|[precss](https://github.com/csstools/precss/)|可以在CSS中使用类似Sass的标记和暂存CSS功能|
|[Stylelint](https://github.com/stylelint/stylelint/)|自动化的规范审查，强制执行约定，以避免错误|
|[Cssnano](https://github.com/cssnano/cssnano/)|现代模块化压缩和优化代码|
|[Rucksack](https://github.com/madeleineostoja/rucksack/)|CSS超能力背包|

### 使用简写属性

[postcss-short](https://github.com/csstools/postcss-short/)封装多个简写型插件，如border，color和size简写型插件。

> 只有在确定包型插件里的每个插件功能都会用到，才使用该包型插件；否则，还是建议单独使用每个插件  

## Rucksack和简写型插件

|名称|功能|
|:---|:---|
|[Alias](https://github.com/madeleineostoja/postcss-alias)|使用@alias规则为CSS属性创建自定义别名|
|[Clearfix](https://github.com/madeleineostoja/postcss-clearfix)|为CSS clear属性添加本地修复值，用于自清除子级，兼容IE8+。 |
|[Fontpath](https://github.com/madeleineostoja/postcss-fontpath)|会根据字体文件的路径自动为@font-face规则生成src值|

### 示例讲解

> 图片轮播的效果由纯CSS3控制  

### Rucksack

Rucksack集成了一个专门用于处理缓动动画的插件postcss-easing，将任何有效的缓动动画转换为相应的cubic-bezier()函数  

### 缓动动画

[贝塞尔曲线](http://cubic-bezier.com/#.17,..67,.83,.67)  
[easeOutBack缓动动画](http://easing.net/#easOutBack)  
easeOutBack缓动动画会编译为cubic-bezier(0.175,0.885,0.32,1.275)  

### 内容动画

> cd demo_1  
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
> npm i --save-dev postcss-easings  
> npm i --save-dev rucksack-css  
> 复制T45资源到demo_1  
> gulp  

以上实例可以用Rucksack插件：  

```javascript
var rucksack = require('rucksack-css');
...
.pipe(postcss([ autoprefixer(), rucksack() ]))
...
```

也可以独立安装postcss-easings，减轻工作流的负担：  

```javascript
var easing = require('postcss-easings');
...
.pipe(postcss([ autoprefixer(), easing() ]))
...
```

### 使用Rucksack修改轮播图

> cd demo_1  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev cssnano  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev rucksack-css  
> 复制T45资源到demo_2，并修改响应式样式  
> gulp  

```css
@alias{
  pb: padding-bottom;
  bs: box-shadow;
  bgc: background-color;
}

@font-face {
  font-family: 'open_sansregular';
  src: url("../fonts/OpenSans-Regular-webfont.eot");
  src: url("../fonts/OpenSans-Regular-webfont.eot?#iefix") format('embedded-opentype'),
       url("../fonts/OpenSans-Regular-webfont.woff") format('woff'),
       url("../fonts/OpenSans-Regular-webfont.ttf") format('truetype'),
       url("../fonts/OpenSans-Regular-webfont.svg") format('svg');
  font-weight: normal;
  font-style: normal;
}

/// replace all font-size like below:
font-size: responsive;
///
```

由于Rucksack插件有降级处理和添加浏览器前缀的功能开关，所以没有必要单独安装autoprefixer插件  

```javascript
.pipe(postcss([ rucksack({ fallbacks: true, autoprefixer: true }) ]))
```

## 审查和优化代码

### 使用cssnano

目前为止我们使用的代码压缩插件cssnano，是基于PostCSS版本的，而不是gulp-cssnano。  
可以在gulpfile.js文件中打开或关闭cssnano插件的[功能](https://cssnano.co/docs/what-are-optimisations/)：  

```javascript
.pipe(postcss([ cssnano({discardComments:{removeAll:true}}) ]))
```

### 配置Stylelint

[Stylelint](https://stylelint.io/)插件的核心不在于插件自身，而是所选择的审查规则  
可以任意搭配使用100多条规则  
这些规则可以单独配置在.stylelintrc文件中，也可以配置在package.json文件中，还可写在stylelint.config.js中作为javascript对象引入到其他文件  
实例中的规则都是定义在了gulpfile.js的lint-styles任务里  

## 降级处理

### 检测兼容性

使用[Modernizr](http://www.modernizr.com/)工具库检测浏览器兼容性，但更高效的方式是CSS的@support指令：  
首先为所有浏览器提供一个基础属性，然后当浏览器支持增强属性时，就使用@support指令定义的属性代替基础属性  

### Oldie

[Oldie](https://github.com/csstools/oldie/)包型插件支持兼容低版本的IE浏览器  
其包含的详细插件列表在该插件的index.js文件中可以找到，下面列举一些常用插件：  

|名称|功能|
|:---|:---|
|post-calc|尽可能将所有的calc()转换为数值，但混合使用多种度量单位的calc()可能不起作用|
|post-unroot|使用HTML选择器代替增强的属性:root选择器|
|post-unnot|移除增强型的:not选择器|
|post-unopacity|将所有opacity属性转换为filter: Alpha(opacity=XX)，其中XX是原始不透明度属性值转换后的值|

### 删除兼容性代码

当浏览器升级后，不再需要兼容性代码，可以通过[Stylehacks](https://github.com/s10wen/stylehacks)插件基于[BrowserHacks](http://browserhacks.com/)列出的兼容性代码列表，来检测和移除浏览器的兼容性代码  

> cd demo_3  
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
> npm i --save-dev stylehacks  
> 复制T47资源到demo_3  
> gulp  

上例中的样式表中的兼容代码是_color属性：  

```css
h1 {
  _color: white;
  color: rgba(255, 255, 255, 0.5);
}
```

在gulpfile.js文件的styles任务中配置stylehacks的删除规则：  

```javascript
gulp.task('styles', function () {
  return gulp.src('src/*.css')
    .pipe(postcss([ stylehacks({browsers: 'last 1 version, > 10%'}) ]))
    .pipe(gulp.dest('dest/'));
});
```

该删除规则中的browsers属性值的意思是，删除高级浏览器或市场份额超过10%的浏览器所不需要的兼容性代码。  
该配置参数参考了[browserslist](https://github.com/browserslist/browserslist/)中的数据，autoprefixer插件内部也使用了该数据  

## 总结

兼容性插件本身可能会随着浏览器更新换代越来越快，而逐渐失去作用  
就像jQuery，从2.x开始，就不再支持IE6~IE8了  
为了减少兼容性代码，给将来带来历史遗留问题，尽量将兼容性代码放在一起，不要与常规代码混合在一起，甚至有必要合并在一个单独的文件中  
