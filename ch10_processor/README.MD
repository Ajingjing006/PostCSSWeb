# 第十章 定制处理器

## 创建处理器

处理器没有绝对的优劣之分，每个都与众不同，开发者可以根据自己需求来选择  
开发者也可以根据自己的开发经验，自定义自己的通用处理器功能  

## 探索处理器

选择哪些插件的原因不是一成不变的，而是根据工作的性质和个人的需求综合决策的  

### 分析package.json文件

package.json配置文件，包含一部分基础信息，如项目版本，基础信息，创建者，依赖信息和授权信息  

```json
{
  "name": "demo_3",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Robert Hou",
  "license": "ISC",
```

还包含下面的核心信息，罗列出项目中使用到的所有插件  
开发者可以手动增删插件信息：  

```json
  "devDependencies": {
    "autoprefixer": "^10.2.5",
    "cssnano": "^5.0.2",
    "gulp": "^4.0.2",
    "gulp-clean": "^0.4.0",
    "gulp-postcss": "^9.0.0",
    "gulp-rename": "^2.0.0",
    "gulp-sourcemaps": "^3.0.0",
    "postcss-reporter": "^7.0.2",
    "stylehacks": "^5.0.0",
    "stylelint": "^13.13.1"
  }
}
```

> 插件版本号前面的符号“^”，表示使用的最低版本号  

### Gulp任务文件

gulpfile.js包含了所有的任务信息，用于处理项目中的所有样式文件  
头部声明的变量，用于引入安装的插件；  
然后，定义了一系列任务，如查找，编译样式源文件，代码规范检测，压缩和重命名编译后文件，创建SourceMap及源文件改动后自动编译；  
最后定义default任务，用于定义任务执行顺序  

另外项目的目录结构，只取决于实际需要；没有规划的结构，也无法从PostCSS中获得益处  

## 问题剖析

周期性的回顾和完善gulp配置文件，从而保持最佳的执行效率  

目前还存在可优化的问题：  

- 任务名称不规范  
- Gulp内置了生成Source Map的功能，所以，有些插件多余  
- 不支持动态重命名  
- 任务还可以细分  
- 改变调用PostCSS的方式，使用数组而非直接传名  
- 不需要对所有文件压缩处理  
- 让cssnano任务保持独立  
- 确定处理浏览器前缀时，使用独立插件，还是包型插件  
- 生成的两份压缩文件，有一个命名不正确

### 修改gulp任务文件

通过细节完善流程，提高编译流程的执行效率  

> cd demo_1  
> npm init  
> 复制T48源码到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> // npm i --save-dev cssnano  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev rucksack-css  
> 修改gulpfile.js  
> gulp  
> 查看生成了dest/maps/style.css.map，没有style.min.css.map  

### 更新背后的原因

前面针对gulp的更新都不是必须的，但更新的原因，就是：  
生成了额外的文件，而不是只生成我们所要求的Source Map。而且，某些任务里有与其他插件重合的冗余操作  
并将一些配置信息提取到变量中，放在文件头部  
然后还细化了一些任务  

> 另一个处理浏览器前缀的插件: [doiuse](https://github.com/anandthakker/doiuse/)  

## 优化输出结果

更多的优化可能

### 优化Source Map

编译和生成Source Map时，需要控制资源在不同场景下的URL格式，如测试环境和线上环境。  
理想情况下，会使用一个相对文件结构避免这种问题；对于不能使用这种结构的场景，使用如下配置解决：  

```javascript
    .pipe(sourcemaps.write('maps/',{
        sourceMappingURLPrefix:'https://www.mydomain.com/'
    }))
```

### 浏览器前缀

autoprefixer插件使用[Browserslist](https://github.com/ai/browserslist/)的数据决定支持哪些浏览器，并禁用其他插件的相关属性  

```javascript
    .pipe(postcss([ rucksack({autoprefixer:false}), autoprefixer({browsers:['last 2 versions']}) ]))

    .pipe(cssnano({autoprefixer:false}))
```

还有将autoprefixer插件任务分的更细的插件：  
postcss-remove-prefixes, postcss-unprefix  
相比Sass使用了Compass库处理浏览器前缀，autoprefixer插件删除代码更高效  

### 伪类选择器

|名称|功能|
|:---|:---|
|[postcss-focus](https://github.com/postcss/postcss-focus)|编译时，自动添加:focus伪类选择器，其最终样式与:hover样式一致|
|[postcss-pseudo-class-enter](https://github.com/jonathantneal/postcss-pseudo-class-enter)|编译时，将所有的:enter转换为:hover和:focus伪类选择器|
|[postcss-all-link-colors](https://github.com/jedmao/postcss-all-link-colors)|为所有与链接相关的元素自动添加样式，提供了简写功能|
|[postcss-pseudo-class-any-button](https://github.com/postcss/postcss-pseudo-class-any-button)|美化表单按钮。提供了一个不是规范的:any-button选择器，被编译转换为不同类型，如纯按钮及三个输入框(reset,submit,button)|
|[postcss-pseudo-elements-content](https://github.com/omgovich/postcss-pseudo-elements-content)|为代码中需要:content属性的伪类选择器，自动添加该属性|

### 更新代码

> cd demo_2  
> npm init  
> 复制T51源码到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-pseudo-elements-content  
> 修改gulpfile.js  
> gulp  

### 处理图片

[gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)自动压缩图片体积，意味着开发者可以为任务配置处理流程的参数。  

> cd demo_3  
> npm init  
> 复制T51源码到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-clean  
> //npm i --save-dev gulp-imagemin  
> npm i --save-dev imagemin  
> // imagemin-jpegtran 会随imagemin一块安装  
> //npm i --save-dev imagemin-mozjpeg //not work now  
> gulp  

<b style="color:red;">本示例未能成功演示，图片没有优化</b>

### 解析图片处理流程

[gulp-responsive](https://github.com/azat-io/postcss-responsive-images)可以创建响应式图片  
[postcss-sprites](https://github.com/2createStudio/postcss-sprites)生成精灵图  
[postcss-assets](https://github.com/borodean/postcss-assets)CSS的资产管理器。它将样式表与环境变化隔离开，获取图像大小并内联文件。  

## 添加自动重载功能

开发者更新代码后，让样式自动重载  
该功能目前只支持Chrome浏览器  

> cd demo_4  
> npm init  
> 复制T53文件到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev rucksack-css  
> npm i --save-dev gulp-livereload  
> gulp  

## 扩展处理器的功能

[postcss-cssstats](https://github.com/cssstats/postcss-cssstats)为编译后的项目提供静态分析数据，其分析能力时根据CSS Stats系统(http://www.cssstats.com)实现的。  
[gulp-stylestats](https://github.com/1000ch/gulp-stylestats)生成json分析数据，具体[配置参数](https://github.com/t32k/stylestats)  

> cd demo_5  
> npm init  
> 复制源码T54到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-pseudo-elements-content  
> npm i --save-dev postcss-cssstats  
> npm i --save-dev gulp-stylestats  
> 修改gulpfile.js  
> gulp  

本示例中，插件postcss-cssstats报错，故只使用gulp-stylestats插件生成json分析数据

## 测试最终的处理器

> cd demo_6  
> npm init  
> 复制源码T55到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-clean  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-cssnano  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev rucksack-css  
> npm i --save-dev postcss-nesting  
> npm i --save-dev postcss-short-color  
> npm i --save-dev pixrem  
> 修改gulpfile.js  
> gulp  

### 示例分析

本示例使用到的响应式插件：  

|名称|功能|
|:---|:---|
|[node-pixrem](https://github.com/robwierzbowski/node-pixrem)|编译时，为rem值提供兼容性解决方案|
|[postcss-nesting](https://github.com/csstools/postcss-nesting)|编译时，转换嵌套形式的CSS代码|
|[postcss-short-color](https://github.com/csstools/postcss-short-color)|编译时，为color属性提供合并简写属性|

## 诀窍

- 多尝试插件功能，找到适合自己的插件  
- PostCSS的能力，需要借助所使用的插件。它不是预处理器或后处理器，但可以实现这些功能  
- 模块化的设计，保证插件的易用性和可替换性  
- 持续更迭  
- 周期性的检查处理器的功能及插件的变更，以释放最佳性能  
- 任何处理器都不应限制于PostCSS插件  
- 尽量添加自动化处理的任务  
- 考虑到项目目录结构的不确定性，变动越少或需要复制的文件越少，编译流程越稳定  

## CSStyle

[CSSStyle](https://csstyle.io/)库可以作为一个过渡，让开发者习惯从Sass或LESS代码转换为PostCSS开发  

BEM的核心优势在于降低CSS的复杂程度，减少选择器的数量，不过需要记忆约定规则  

```css
.component{
  /*表示一个组件*/
}
.component__element{
  /*表示构成组件的某一部分的样式*/
}
.component--modifier{
  /*表示组件的某种状态*/
}
```

使用CSSStyle库可以规避应用BEM的弊端  

### CSStyle的优势

CSSStyle库的核心是模块化代码块，但相较于BEM的优势，在于不必记忆大量的约定规则，只需用代码块对代码约束，条可读性  
下面的示例演示了从Sass到PostCSS的过渡方式：  

#### Sass示例  

> cd demo_7  
> npm init  
> 复制T56源码到项目目录  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-dart-sass  
> gulp  

#### PostCSS示例  

> cd demo_8  
> 复制demo_7源码到项目目录  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev postcss-nested  
> npm i --save-dev cssstyle  
> 修改gulpfile.js的插件配置，取消对Sass插件的引用，添加对postcss-nested插件和cssstyle插件的引用  
> 并修改Sass任务的实现  
> 将style.scss重命名为style.css  
> 并删除@import 'cssstyle'和所有的@include语句  
> gulp  

### 示例分析

核心：认真选择恰当的插件，这将决定整个过度流程的难易程度  

## 总结

<b style="color:red;">demo_8中的示例演示失败，插件cssstyle不起作用</b>
