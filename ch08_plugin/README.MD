# 第八章 PostCSS插件开发

## 使用插件扩展PostCSS

完整的插件列表：[Plugins](https://github.com/postcss/postcss/blob/master/docs/plugins.md)  
分类检索插件：[Parts](http://www.postcss.parts)  

利用PostCSS API构建插件，其核心时Node和Container方法  
一旦插件的postcss对象初始化完成，就可以用这两个方法操作样式  

## 解析插件的基本结构

推荐用[插件模板](https://github.com/postcss/postcss-plugin-boilerplate)开发插件  
  
插件必备文件：  

- index.js: 插件入口  
- package.json: 配置和管理用NPM安装的第三方依赖  
- test.js: 测试  

### index.js

其中的exports方法，用于暴露操作当前插件的接口：  

```javascript
var postcss = require('postcss')

module.exports = postcss.plugin('myPlugin', function(options){
    return function(css){
        options = options||{}
        // process code
    }
})
```

### package.json

所有基于Node.js的组件，都有如下类似的配置：  

```json
{
    "name":"plugin_name",
    "version":"0.0.0",
    "keywords":[
        "postcss",
        "css",
        "postcss-plugin"KEYWORDS
    ],
    ...
    "scripts":{
        "test":"eslint *.js"
    }
}
```

### test.js

测试当前插件的代码：  

```javascript
import postcss from 'postcss';
import test from 'ava';
import plugin from './';
function run(t, input, output, opts={}){
    return postcss([plugin(opts)]).process(input)
        .then(result=>{
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        });
}

test('does something', t=>{
    return run(t, 'a{}', 'a{}', {});
});
```

### Vendor模块

包含一系列用于处理浏览器前缀的辅助方法  
|模块|返回值类型|返回值|
|:---|:---|:---|
|vendor.prefix|字符串|从字符串中提取到的浏览器前缀。var vp=postcss.vendor; vp.prefix('-webkit-clip-path')|
|vendor.unprefix|字符串|去除浏览器前缀后的字符串。var vp=postcss.vendor; vp.unprefix('-moz-tab-size')|

### List模块

包含一系列用于分离CSS属性值的方法  
|模块|返回值类型|分离目标|
|:---|:---|:---|
|list.space|字符串|使用空格分割的属性值。var ls=postcss.list; ls.space('1px calc(10%+1px)')|
|list.comma|字符串|使用逗号分割的属性值。var ls=postcss.list; ls.comma('black, linear-gradient(white, black)')|

### API中的类

|类名|功能|
|:---|:---|
|Processor|用于创建Processor示例并初始化插件，然后就可以在指定CSS文件直接使用该实例|
|LazyResult|用于异步获取PostCSS转换过程中生成的所有数据，操作上类似Node.js中的Promise。|
|Result|用于获取PostCSS转换过程中生成的所有数据|
|Warning|用于向用户发出提醒信息|
|CssSyntaxError|用于获取CSS解析器在解析CSS过程中产生的错误信息|
|Input|用于获取传递给PostCSS插件的原始CSS数据|

### API中的节点

|节点|介绍|
|:---|:---|
|Root|表示一个CSS文件和该文件解析后的节点集合。var root=postcss.parse('a{color:darkred}'); var type=root.type; var length=root.nodes.length;|
|AtRule|表示CSS中的@指令节点，比如: @media print {...}|
|Rule|表示一条CSS规则，包含一个选择器和一个声明块：var root=postcss.parse('h1{}'); var rule=root.first; var type=rule.type; var content=rule.toString();|
|Declaration|表示一条CSS样式信息。var root=postcss.parse('a{color:darkred}'); var dec1=root.first.first; var type=dec1.type; var content=dec1.toString();|
|Comment|表示一个位于样式属性或属性值之间的注释。var root=postcss.parse('a{color:/* inner / darkred; / outer / }'); var dec1=root.first.first; var comment=root.first.last; var type=comment.type; var content=dec1.between;|

### API中的方法

|方法组|用途|
|:---|:---|
|Nodes|用于处理CSS节点，包含如下方法：node.type, node.parent, node.next(), node.prev()|
|Containers|用于处理Root,，AtRule和Rule容器内的子节点，包含如下方法：container.nodes, container.first, container.last|

## 创建过渡插件

参考插件：[postcss-transform-shortcut](https://github.com/jonathantneal/postcss-transform-shortcut)  
参考插件：[postcss-transition-shortcut](https://github.com/alexlibby/postcss-transition-shortcut)  

> 安装git  
> 进入项目目录，clone模板  
> git clone https://github.com/postcss/postcss-plugin-boilerplate.git  
> node ./postcss-plugin-boilerplate/start  
> 填写项目信息postcss-transition-shortcut，如果要托管在Github上，可以填写账号信息  
> 初始化完成，删除postcss-plugin-boilerplate文件夹
> rmdir /s postcss-plugin-boilerplate  
> 为index.js添加代码  

[Font Stack](https://www.cssfontstack.com/)

### 创建测试

测试工具[AVA](https://github.com/avajs/ava)  
在用模板生成项目结构的时候，就安装好了  

> 进入项目根目录  
> 清空package.json配置文件  
> npm init  
> npm i --save-dev postcss  
> npm i --save-dev eslint  
> npm i --save-dev ava  
> 复制T43下的ESLint配置文件.eslintrc
> 在script配置添加： "test": "ava && eslint *.js"  
> 为test.js添加测试用例  
> npm test  

### 修复错误

在上面的测试中，会有一些错误信息：

"Expected linebreaks to be 'LF' but found 'CRLF'":行尾换行规则不一致的错误(VSCode可以在修改换行符)  
"Expected indentation of X spaces...":将制表符替换为四个空格  
"Line X exceeds the maximum line length...":将过长的代码切换为两行  
还有：
"Rule 'space-return-throw-case' was removed and replaced by: keyword-spacing  space-return-throw-case"  
"Rule 'no-empty-label' was removed and replaced by: no-labels                 no-empty-label"  
"'opts' is assigned a value but never used                                    no-unused-vars"
"Operator '=' must be spaced                                                  space-infix-ops"

[JS Lint Errors](https://jslinterrors.com/)

### 清除最后的错误

ESLint提示错误：while语句的入口条件使用了赋值表达式，这是不安全的  
理想的解决方案时重构代码  
这里忽略这个错误：
> 打开项目的.eslintrc文件  
> 修改no-conf-assign的值为0  
> 如有重复设置，或已不推荐及不需要的配置，请注释掉  

### 执行测试

> 复制T43源码的gulpfile.js和package.json文件到过渡插件所在的项目根目录demo_1  
> 新建样式文件src/style.css，并添加代码  

```css
div{
    property: all;
    duration: 1s;
    timing: ease-in-out;
    delay: 1s;
}
```

> npm init
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> 将当前目录下的插件文件夹postcss-transition-shortcut，复制到项目的node_modules目录下  
> gulp  

### 分析代码

初始化PostCSS：  

```javascript
var postcss=require('postcss');
```

初始化postcss.plugin，向外开放功能：  

```javascript
module.exports=postcss.plugin('postcss-transition-shortcut', function(options){
    ...
})
```

可选项为空，或传入的可选项存入options变量：  

```javascript
options = options || {};
```

设置默认值：  

```javascript
var defaults = {
    property: 'all',
    duration: '1s',
    timing: 'ease-in-out',
    delay: '1s'
};
```

关键代码，返回处理结果：  

```javascript
return function(css){
    css.walkRules(function(rule){
        var transitionRule;
        var transitionValues=[];
        var index=-1, node;
        var attriutes=/^(property|duration|timing|delay)$/;
    })
}
```

如果检索到一个目标样式，复制该属性，并在样式前加transition样式。然后遍历每一个含目标属性的样式，并合并到一个transition定义中：  

```javascript
while(node=rule.nodes[++index]){
    if(attributes.test(node.prop)){
        transitionRule=transitionRule||node.cloneBefore({prop:'transition'});
        var transValues=postcss.list.space(node.value);
        transitionValues.push(transValues.join(','));
        node.remove();
        --index;
    }
}
transitionRule.value=transitionValues.join(' ');
```

## 创建字体插件

基于现有插件[postcss-fontpath](https://github.com/seaneking/postcss-fontpath)进行二次开发，添加自动补全功能。  

> mkdir postcss-custom-fonts  
> cd postcss-custom-fonts  
> npm init  
> npm i --save postcss  
> npm i --save underscore  //用于扩展JS的工具库  
> 复制随书源文件的index.js  
> 插件准备好了，接下来创建外层的测试项目demo_2  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> 将当前目录下的插件文件夹postcss-custom-fonts，复制到项目的node_modules目录下  
> 复制T42的gulpfile.js  
> 新建样式表文件src/style.css，并添加代码  
> gulp  

### 插件功能分析

在index.js中，引入必须对象：  

```javascript
var postcss = require('postcss');
var _ = require('underscore');
```

定义变量，存储配置信息：  

```javascript
// Font stacks from http://www.cssfontstack.com/
var fontstack_config = {
	'Arial': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
	'Times New Roman': 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif'
}
```

插件开始初始化对象，并定义一个存储配置信息的变量，然后_.extend函数来扩展预定义的值，并返回一个新对象，供插件检测字体信息：  

```javascript
module.exports = postcss.plugin('customfonts', function (options) {
  return function (css) {

    options = options || {};
    fontstack_config = _.extend(fontstack_config, options.fontstacks);
```

遍历每一条规则和节点，先检测是否定义了字体，然后检测是否属于预定义的集合。然后将符合的字体名转为恰当的字体集；否则，将字体插入声明中：  

```javascript
css.walkRules(function (rule) {
      rule.walkDecls(function (decl, i) {
        var value = decl.value;
        if (value.indexOf( 'fontstack(' ) !== -1) {
          var fontstack_requested = value.match(/\(([^)]+)\)/)[1].replace(/["']/g, "");
          var fontstack = fontstack_config[fontstack_requested];
          var first_font = value.substr(0, value.indexOf('fontstack('));
          decl.value = first_font + fontstack;
        }
      });
    });
```

遍历所有规则和声明，查找样式中的@font-face实例。变量font-path，存储去除单引号后的值；format数组，管理不同的字体格式：  

```javascript
css.walkAtRules('font-face', function(rule) {
      rule.walkDecls('font-path', function(decl) {
        var fontPath = decl.value.replace(/'/g, ''),
        src = '',
        declaration = '',
        formats = [
          { type: 'woff', ext: '.woff' },
          { type: 'truetype', ext: '.ttf' },
          { type: 'svg', ext: '.svg' }
        ];
```

遍历所有自定义字体声明，为每个字体创建恰当的声明信息，并插入样式表：  

```javascript
        formats.forEach(function(format, index, array) {
          declaration = 'url("' + fontPath + format.ext + '") format(\'' + format.type + '\')';

          if (index === array.length - 1){
            src += declaration;
          } else {
            src += declaration + ',\n       ';
          }
        });

        decl.cloneBefore({ prop: 'src', value: src });
        decl.remove();
      });
    });
  }
});
```

### 发布的风险

- 缺少test.js或index.test.js。使用集成测试服务Travis CI进行测试，但这只局限于Unix环境  
- 一个PostCSS插件应值专注于一件事。以免开发者引入额外非必须功能  
- 代码有待优化。css.WalkRules和css.WalkAtRules。因为插件的代码是串行的，不可交替，所以会影响执行效率  
- 未似乎用模板代码创建插件，发布的时候还需要手动准备很多必备文件。如果使用模板文件，只需要添加合适的构建工具即可，如Gulp或Grunt  

## 简化开发流程

利用第三方插件开发自己的插件，可以有效节省开发时间，但要密切关注第三方插件的开发动向，以免造成影响  

推荐一些第三方插件：

[Selector](https://github.com/postcss/postcss-selector-parser)
[Value](https://github.com/TrySound/postcss-value-parser)
[Resolve](https://github.com/jedmao/postcss-resolve-prop)
[Font](https://github.com/jedmao/parse-css-font)
[Dimension](https://github.com/jedmao/parse-css-dimension)
[Sides](https://github.com/jedmao/parse-css-sides)
[FontHelper](https://github.com/jedmao/postcss-font-helpers)
[MarginHelper](https://github.com/jedmao/postcss-margin-helpers)

## 插件开发规范

- 插件名称应该见名知意  
- 插件不得兼具多种功能  
- 坚持使用postcss.plugin创建插件，就可以使用通用的插件API开发  
- 使用异步方法。为节点设置node.source，以便PostCSS生成精确SourceMap  
- 用resulr.warn管理错误信息，而非console  
- 在package.json文件关键字添加postcss-plugin  
- [Guidelines](https://github.com/postcss/postcss/blob/master/docs/guidelines/plugin.md)  

开发过程的规范：  

- 如果插件使用了config文件，拿必须基于JavaScript编写，且能够作为参数传递给函数  
- 始终在参数中指定编译的资源来源和去向，以确保生成精准的SourceMap，并优化语法错误的显示效果  
- 只能使用公开的异步方法，不依赖于未出现在文档中的方法和属性  
- 不要直接将CSSSyntaxError以JavaScript调用栈的形式完整展现  
- 由result。warning()抛出的信息，应由PostCSS显示。也可以用postcss-logs-warnings或postcss-messages插件处理  
- 如使用了SourceMap，应使用PostCSS生成inline map。构建工具(gulp等)须提供一个可选功能，将这些inline map保存到独立文件中  
- [Guidelines](https://github.com/postcss/postcss/blob/master/docs/guidelines/runner.md)  

## 发布插件

发布步骤：

1. 测试插件  
2. 添加最终信息(托管到Github)  
3. 提交到PostCSS插件目录  

将插件发布到Node.js社区，请参考[NPM publish](https://docs.npmjs.com/getting-started/publishing-npm-packages/)  
