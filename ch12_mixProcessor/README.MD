# 第十二章 混合处理器

## 迈出第一步

第一步是探索一些可以用来帮助开发者开始从使用Sass过渡到使用PostCSS插件  

## 探索转换过程

CSSStyle库是各强大的库，用于使用BEM原理生成干净的代码，但它要求代码使用特定的格式编写  
但是如果网站使用了多个复杂的样式表，使用BEM样式符号最好从头开始，或者至少用在定义的块中  

更实用的解决方案，耗时长，但过渡平滑，允许在一个更易于管理的转换过程中对代码进行较少的更改  

- 首先，介绍一个任务运行器来编译现有处理器代码，对于使用诸如Sass或LESS之类的库，存在Gulp或Broccoli插件允许我们编译代码  
- 一旦转换到使用任务运行器，我们就可以使用插件来处理核心进程，例如管理浏览器前缀，创建源映射及压缩样式表  
- 可以将现有的样式表分成更小的块，并在编译期将每个文件导入主文件。然后就使用PostCSS插件代替现有处理器。例如，可用postcss-simple-varsto创建新变量来替换现有的基于Sass的示例  

此过程后续应该持续迭代，随着处理器和插件的更新，逐步完全替换  

### 选择插件

转换Sass的常用插件  

|名称|功能|
|:---|:---|
|[postcss-mixins](https://github.com/postcss/postcss-mixins)|插件格式和Sass的混合宏非常相似，可以在编辑器中搜索并替换。npm i --save-dev postcss-mixins|
|[postcss-nested](https://github.com/postcss/postcss-nested)|支持复制Sass的嵌套功能，和postcss-nested-props,postcss-nested-vars配合使用，可用于打开任何属性和变量的嵌套。npm i --save-dev postcss-nested|
|[postcss-sassy-mixins](https://github.com/andyjansson/postcss-sassy-mixins)|混合宏帮助减少样式表中的重复代码块。此插件和Sass作用类似，并允许在Sass和PostCSS中轻松转换。npm i --save-dev postcss-sassy-mixins|
|[postcss-simple-extend](https://github.com/davidtheclark/postcss-simple-extend)|和常见的Sass功能类似，可以从扩展功能删除一些重复样式。npm i --save-dev postcss-sassy-mixins|

## Pleeease简介

<b style="color:red;">由于Pleeease已经停止更新，新版本的NodeJS无法安装此插件</b>

[Pleeease库](http://pleeease.iamvdo.me/)是一个 Node.js 应用程序，可以轻松处理您的 CSS。 它将 CSS 预处理器与 PostCSS 插件（如 Autoprefixer、Pixrem 等）相结合，并具有完整的源映射支持。 它有助于创建干净的样式表，支持旧浏览器并提供更好的可维护性。  
Pleeease旨在简化预处理器的使用，闭关将多个工具的优势结合在一个库中。简而言之，Pleease === ((Sass || LESS || Stylus) || CSS) && PostCSS  

### 安装和配置Pleeease

安装  

> npm i -g pleeease-cli  
> npm update -g n  

在命令行使用.pleeeaserc文件执行基本编译非常容易  

> cd demo_1  
> npm init  
> 复制源码T64，到项目目录  
> npm i -g pleeease-cli  
> npm update -g n  
> pleeease compile  

Sass对应的插件为gulp-dart-sass  
LESS对应的插件为gulp-less  
Stylus对应的插件为gulp-stylus  

### 手动编译代码

.pleeeaserc配置文件：  

```json
{
    "in":["foo.css","bar.css"],
    "out":"baz.css",
    "browsers":["last 3 versions", "Android 2.3"]
}
```

在线演示地址：http://pleeease.iamvdo.me/play/  
现在不使用任务运行器，就可以执行简单的任务了。  
但是任务运行器可以带来更多益处：自动化调整图像大小，重命名样式表，检查代码一致性等。  

### 使用任务编译代码

相比grunt，使用gulp做任务运行器更容易。两者都可以配合pleeease库使用  

[Pleeease开源地址](https://github.com/iamvdo/pleeease/)  
[gulp-pleeease](https://github.com/danielhusar/gulp-pleeease)  

> cd demo_2  
> npm init  
> 复制源码T65，到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-clean  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev gulp-pleeease  
> gulp  

从pleeease库的开源地址，可以看出，已经停更很久了。。。新版本的NodeJS无法安装pleeease  

### 使用Pleeease创建Demo

> cd demo_3  
> npm init  
> 复制源码T66，到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-clean  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-pleeease  
> gulp  

## 和其他处理器一起编译代码

由于pleeease暂时不支持Sass的嵌套，所以降低了使用它的吸引力  
当然，可以使用gulp-dart-sass插件弥补，但不够高效  
此时，PreCSS成了最佳选择  

### 使用PreCSS

[PreCSS](https://github.com/csstools/precss)可以直接编译类Sass代码，而不使用libsass等外部库  
不同之处是，工作方式类似Sass代码，但不是直接使用Sass编译代码  

后面的示例，将会用到内容管理系统CMS-WordPress，是因为它也使用到了PostCSS和Sass  

### 在WordPress中安装转换器

我们将利用一些类Sass插件，创建核心样式表Twenty Sixteen作为WordPress的主题，实际上，它也确实是WordPress的默认主题  

### 配置生产环境

从[WordPress网站](https://wordpress.org)下载WordPress，[Guides](https://make.wordpress.org/core/handbook/tutorials/installing-a-local-server/)说明了安装本地服务器的方式  

## 考虑转换过程

首先，主题样式文件太大，需要postcss-import插件，支持import语句，将每个块分割成单独的文件  
然后，明确需要autoprefixer插件，为某些特性添加浏览器前缀；但需要先移除已有的前缀；还需要用它压缩代码  
还要，添加对rem及嵌套的支持  
另外，还要支持变量的使用  

## 修改代码

### 拆分样式

将主题样式表拆分为多个单一的样式表，并在style.css引入：  

```css
@import	"css/variables.css";
@import "css/normalize.css";
@import "css/genericons.css";
@import "css/typography.css";
@import "css/elements.css";
@import "css/forms.css";
@import "css/navigation.css";
@import "css/accessibility.css";
@import "css/alignments.css";
@import "css/clearings.css";
@import "css/widgets.css";
@import "css/content.css";
@import "css/media.css";
@import "css/multisites.css";
@import "css/queries.css";
@import "css/print.css";
```

> cd demo_4  
> npm init  
> 复制源码T68，到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-clean  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-import  
> npm i --save-dev precss  
> npm i --save-dev gulp-pixrem  
> gulp  

### 添加浏览器前缀

在线测试版：http://autoprefixer.github.io/  

建议使用插件[postcss-remove-prefixes](https://github.com/johnotander/postcss-remove-prefixes)先移除已有的浏览器前缀，在执行添加操作  
样式表中一些浏览器前缀报错的代码可以手工注释，也可以自行添加上面的插件  

### 检查代码一致性

在gulp的任务lint，其中配置的代码检查规则  

### 压缩代码

对于本例中的样式代码是非轻量级的，应该始终考虑压缩代码  
参考gulp任务minifyCSS，并且禁用了nano插件的autoprefixer功能，因为我们有专门的插件做这项工作  

### 创建变量

Sass和其他一些处理器的关键特性是，能够使用变量作为值的占位符，并在编译时替换为有效的CSS样式  
这里用PreCSS插件添加变量支持  

本例专门创建一个样式表文件variables.css，来维护所有可能用到的变量  

### 添加rem单位支持

插件gulp-pixrem，可以在编译的时候，可以根据已有的rem单位，添加相应的px降级值  

### 样式表中的嵌套规则

正确的使用嵌套，会带来真正的不同
不要一味的迷信嵌套操作。编译完后，样式表还原为整成的CSS格式  
推荐两本书：《SASS SASS Essentials》，《SASS CSS How-to》

### 样式表中的循环规则

如下media.css代码片段所示：  

```css
@for $i from 6 to 9 {
    .gallery-columns-$(i) .gallery-caption {
      display: none;
    }
}
```

这是诸如Sass支持创建循环的特性，节省了大量创建近似央视的时间  

### 考虑未来的特性

- 添加mixins，可以在代码中创建随意重用的代码块  
- 颜色降级，利用PreCSS的转换为HEX值的特性，或使用插件postcss-rgba-hex转化  
- 字体支持，插件font-magician为非标准字体添加font-face支持；这些字体可从[FontSquirrel](http://www.fontsquirrel.com)获得  

## 编译和测试修改代码

定义gulp任务的合理顺序：'clean', 'styles', 'pxrem', 'lint' , 'rename', 'minifyCSS', 'sourcemap', 'watch'  
通过gulp命令编译得到的文件可以从/dest目录得到。鉴于样式文件复杂多样，编译时间稍长  
使用此样式表文件的本地WordPress样式，对比官网的样式，是否一致  

推荐自动化测试工具[Quixote](http://www.quixte-css.com)  
