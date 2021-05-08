# 第六章 创建网格

Sass网格系统Bourbot Neat，是依赖于Ruby的，而PostCSS插件是没有这些依赖的  

## 网格设计的介绍

在线Sass生成工具<[Sessmeister](http://www.sassmeister.com)>  

利用gulp-dart-sass自动化编译
> mkdir demo_1，并使用T29的源码  
> cd demo_01  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-dart-sass  
> gulp  

为Bourbon Neat添加支持  

Node版本示例  

> mkdir demo_2  
> cd demo_02  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-dart-sass  
> npm i --save-dev node-bourbon  
> npm i --save-dev node-neat  
> gulp  

编译生成的样式文件包含如下代码，说明neat插件工作正常：  

```css
@media only screen and (min-width: 30rem) {
  .wrapper {
    width: 95%;
    max-width: 72rem;
  }

  .col-1 {
    width: 8.3333333333%;
  }
  ...
}
```

## 使用Bourbon Neat创建一个实例

首先利用T30的示例做个演示：  
> mkdir demo_3  
> cd demo_3  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-dart-sass  
> npm i --save-dev node-bourbon  
> npm i --save-dev node-neat  
> 复制T30的文件到demo_3  
> gulp  

<b style="color:red;">插件node-bourbon和node-neat在编译sample.scss时报错</b>  

推荐小程序<[Color thief](http://lokeshdhakar.com/projects/color-thief)>  
可以将网站图片拖拽进这个小程序，生成匹配的颜色搭配  

<[Color Hexa](http://colorhexa.com)>可以查找RGB(A)色值  

## 探索PostCSS中的网格插件

<[postcss-neat](https://github.com/jo-asakura/postcss-neat)>插件方便易用的生成网格系统  
<[Grid](https://github.com/andyjansson/postcssgrid)>简化列格式的配置  
<[Lost](https://github.com/corysimmons/lost)>网格系统的Autoprefixer  
<[Simple-grid](https://github.com/admdh/postcss-simple-grid)>插件将配置放在CSS文件中，而不是gulp任务文件  

利用T31的示例做个演示：  
> mkdir demo_4  
> cd demo_4  
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
> npm i --save-dev postcss-neat  
> npm i --save-dev postcss-css-variables  
> npm i --save-dev postcss-nested  
> 复制T31的文件到demo_4  
> gulp  

一定严格按照插件的顺序安装，否则可能导致编译结果不正确(比如@neat-span-columns未被编译替换等)  
一旦顺序错误，请清空整个项目目录，重新设置安装  

在执行gulp任务时Autoprefixer插件报错的解决方法：  
在package.json中加入如下配置：  

```json
  "browserslist": [
    "last 3 versions"
  ]
```

然后新建文件postcss.config.js，并添加如下配置：  

```javascript
module.exports = { 
    plugins: { 
      'autoprefixer': {overrideBrowserslist: 'last 3 versions'} 
    } 
  }
```

实际上，若要本示例演示成功，是不能启用autoprefixer插件的  

## 使用Neat和PostCSS来创建站点

利用T32的示例做个演示：  
> mkdir demo_5  
> cd demo_5  
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
> npm i --save-dev postcss-neat  
> npm i --save-dev postcss-css-variables  
> npm i --save-dev postcss-nested  
> 复制T32的文件到demo_5  
> gulp  

实际上，若要本示例演示成功，是不能启用autoprefixer插件的  

## 添加响应式能力

上面两个示例不具有响应式能力的，一旦浏览器窗口变化，页面布局可能会很凌乱  
本例通过<[postcss-media-minmax](https://github.com/postcss/postcss-media-minmax)>插件修复这一弊端  

利用T33的示例做个演示：  
> mkdir demo_6  
> cd demo_6  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev cssnano  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-neat  
> npm i --save-dev postcss-css-variables  
> npm i --save-dev postcss-nested  
> npm i --save-dev postcss-media-minmax  
> 复制T33的文件到demo_6  
> gulp  

由于本示例页面会引用到两个样式表文件，且cssnano插件和rename插件未作适配，故没有采用rename任务  
