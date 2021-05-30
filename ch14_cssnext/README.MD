# 第十四章 为未来做准备

## 支持CSS4

样式表已存在35年，现在的使用标准还是来自80年代的SGML。1996年发布了原始的CSS标准  
过去几年，CSS4的标准已经开发出来，可以更好的定位目标元素，自定义属性(或变量)，以及基于位置的链接  
CSS4是一个标准，但不作为单一的实体存在，更可能以模块的形式出现，而不是像先前基于创建单个全局标准来迭代  

## 转换CSS4样式

[CSS4选择器](http://CSS$-selectors.com/selectors/)  
PostCSS可以通过插件的形式，将一些CSS4的特性，转换成CSS3的代码来实现  

|插件名称|作用|
|:---|:---|
|[postcss-selector-not](https://github.com/postcss/postcss-selector-not)|将:not() W3C CSS4级伪类转换为:not() CSS3级选择器。npm i --save-dev postcss-selector-not|
|[postcss-selector-matches](https://github.com/postcss/postcss-selector-matches)|将:matches() W3C CSS伪类转换为更兼容的CSS选择器。npm i --save-dev postcss-selector-matches|
|[mq4-hover-shim](https://github.com/twbs/mq4-hover-shim)|用于媒体查询级别4悬停@media功能提供有限支持。npm i --save-dev mq4-hover-shim|
|[postcss-host](https://github.com/vitkarpov/postcss-host)|使:host选择器与伪类一起正常工作的PostCSS插件。npm i --save-dev postcss-host|
|[postcss-pseudo-class-any-link](https://github.com/csstools/postcss-pseudo-class-any-link)|支持在CSS中使用:any-link伪类，遵循Selectors规范。npm i --save-dev postcss-pseudo-class-any-link|
|[postcss-initial](https://github.com/maximkoretskiy/postcss-initial)|i将指定的属性值重置为它在代码中初始化的值(而不是由浏览器)。与postcss-autoreset结合使用非常有用。npm i --save-dev postcss-initial|
|[font-variant](https://github.com/postcss/postcss-font-variant)|允许在CSS中使用font-variant，遵循CSS字体规范。npm i --save-dev postcss-font-variant|
|[postcss-input-range](https://github.com/jonathantneal/postcss-input-range)|可以使用不带前缀的选择器来设置输入范围的样式。npm i --save-dev postcss-input-range|

### 验证电子邮件地址

我们可以使用:invalid和:valid属性设置&lt;input&gt;字段的样式  

> cd demo_1  
> npm init  
> 复制源码T69，到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-clean  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev stylelint  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-selector-matches  
> gulp  

### 支持range输入框

通过页面上的一个滑块的移动，来获取一个特定的值，改变元素透明度。
jQuery可以容易地实现这个功能，但有点大材小用，因为本例用不到jQuery的其他更多的功能  
[postcss-input-range](https://github.com/jonathantneal/postcss-input-range)插件可以实现这个功能  

> cd demo_2  
> npm init  
> 复制源码T70，到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-clean  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev stylelint  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev autoprefixer  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-input-range  
> gulp  

## 使用cssnext支持未来特性

在模块完成标准化之前，我们必须应付CSS4的状态不断地演进  

### 使用cssnext创建一个简单网站

[postcss-cssnext](https://github.com/MoOx/postcss-cssnext)已被弃用，取而代之的是[postcss-preset-env](https://github.com/csstools/postcss-preset-env)  
[PostCSS Preset Env](https://preset-env.cssdb.org/)允许您将现代CSS转换为大多数浏览器可以理解的内容，根据您的目标浏览器或运行时环境确定您需要的polyfill。  

### 创建Demo

创建一个可用于网站的基本模板，以演示更改的容易程度  

> cd demo_3  
> npm init  
> 复制源码T71，到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev stylelint  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-cssnext  
> npm i --save-dev postcss-preset-env  
> gulp  

## 创建CSS4扩展功能插件

PostCSS的伟大之处在于，我们完全可以编写自己的插件，以支持CSS4属性  

### 添加支持CSS颜色特性

颜色rebeccapurple，是为了缅怀Eric Meyer的女儿Rebecca(她在2014年6月的第六个生日因癌症去世)  
Eric一直是Web标准的主要倡导者，特别是CSS  
rebeccapurple将作为CSS4标准的一部分，而不支持的浏览器需要通过插件来支持。  
[postcss-color-rebeccapurple](https://github.com/postcss/postcss-color-rebeccapurple)可以将rebeccapurple转换为兼容的颜色rgb(102,51,153)
[ColorHexa](https://www.colorhexa.com/663399)可以在线查看颜色的值，rebeccapurple在该网站的描述名称为Dark moderate violet  

> cd demo_4  
> npm init  
> 复制源码T72，到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev stylelint  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-color-rebeccapurple  
> gulp  

由以上示例的启发，我们可以使用它作为支持CSS4色彩模块标准的附加颜色的基础。  
下面以burlywood浅棕色为例：  

> cd demo_5  
> npm init  
> 复制源码T73，到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev stylelint  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-color-rebeccapurple  
> 修改样式表中的颜色，将rebeccapurple改为burlywood  
> 更新rebeccapurple插件，下面是index.*.js的更改  

```javascript
//...将默认色值从#639改为#deb887  
const onCSSIdentifier = node => {
  if (isRebeccaPurple(node.value)) node.value = '#deb887';
};
//...将正则表达式中的匹配字符串从rebeccapurple改为burlywood  
const isRebeccaPurple = createRegExpTest(/^burlywood$/i);
//...
const hasAnyRebeccapurple = createRegExpTest$1(/(^|[^\w-])burlywood([^\w-]|$)/i);
```

> gulp  
> 可以看到测试页面的颜色变为浅棕色  

[CSS4模块颜色列表](https://github.com/segundofdez/CSS4-colors/blob/master/less/colors.less)  

### 回到过去

虽然CSSWG(CSS工作组)已经声明RGBA不应存在，而应该添加Alpha通道作为RGB()函数的第四个通道，但我们人会将编译结果显示为RGBA函数，并根据我们的意图，来兼容任何浏览器  
[postcss-time-machine](https://github.com/csstools/postcss-time-machine)插件来演示下面的示例，它将修复CSS本身设计中的错误  

> cd demo_6  
> npm init  
> 复制源码T74，到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-clean  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev stylelint  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-time-machine  
> gulp

对比样式表编译前后的变化，我们开始定义的Alpha值为194，但编译后的代码却是0.7607843137254902。  
因为这个插件设计为使用0到255区间的值，包括Alpha通道。194除以255得到上面的0.76078，四舍五入就是0.8.  

### 创建自己的插件

[postcss-time-machine](https://github.com/csstools/postcss-time-machine)插件不包括所有属性的修补程序  
本例就创建一个管理CSS的background-blend-mode属性错误的插件  
CSSWG(CSS工作组)已经承认所有混合模式变体的名称中应该没有blend-mode，故background-blend-mode将写为background-blend  

> cd demo_7  
> npm init  
> 复制源码T75，到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-clean  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev stylelint  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev postcss-reporter  
> 将当前目录下的插件文件夹postcss-backgroundblend，复制到项目的node_modules目录下  
> 在gulpfile.js文件中引入我们的插件postcss-backgroundblend
> gulp

鉴于PostCSS从5.0开始使用walkDecls遍历AST，故书中插件的index.js中遍历方式改为如下：  

```javascript
var postcss = require('postcss');
 
module.exports = postcss.plugin('backgroundblend', function backgroundblend(options) {
 
    return function (css) {
        options = options || {};
         
        // Processing code will be added here
        //css.eachDecl('background-blend', function (decl) {
        css.walkRules(function (rule) {
          rule.walkDecls(function(decl) {
            if (decl.prop.indexOf('background-blend') !== -1) {
              decl.prop  = 'background-blend-mode';
            }
          })
    });
  };
});
```

比较原样式表和编译后的样式表，我们发现：样式属性background-blend，已经回到以前的background-blend-mode命名，可以兼容旧的浏览器实现
