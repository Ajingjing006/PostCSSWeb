
# 第四章 创建媒体查询

## 探索PostCSS自定义媒体查询

> mkdir demo_1  
> cd demo_1  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev postcss-reporter  
> npm i --save-dev postcss-custom-media  
> 添加src/style.css文件及样式  
> 添加gulpfile.js，并创建gulp任务  
> gulp

## 使用PostCSS修改案例

查询媒体支持的设备：<[CSS media query](http://www.cssmediaqueries.com/)>  

> npm init
> npm i --save-dev gulp
> npm i --save-dev gulp-postcss  
> npm i --save-dev postcss-custom-media  
> npm i --save-dev cssnano  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> 使用Tutorial11的style.css文件  
> 添加媒体查询代码  
> 使用Tutorial12的gulpfile.js文件  
> gulp  
> 用浏览器打开index.html，查看效果  

推荐插件：  
<[postcss-quantity-queres](https://github.com/pascalduez/postcss-quantity-queries)>基于sass数量查询混合宏，是对导航条和有序列表的奇偶元素应用不同样式的利器  

## 创建响应式图片

> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev postcss-responsive-images  
> 使用Tutorial13的style.css文件，并修改响应式代码  
> 添加gulpfile.js文件，并添加任务  
> gulp  

由于PostCSS的现有插件还不支持HTML5的最新标签&lt;picture&gt;，插件postcss-at2x可以实现高清屏加载高清图片的效果  

先看一个用媒体查询实现的例子：  
> npm init
> npm i --save-dev gulp
> npm i --save-dev gulp-postcss  
> npm i --save-dev gulp-clean  
> npm i --save-dev postcss-custom-media  

使用高分辨率的图片，可以使用image-set()，<[postcss-image-set](http://github.com/alex499/postcss-image-set)>插件提供兼容方案，它在样式表中设置一个基本图像，以防浏览器不支持image-set()。下面的示例使用postcss-at2x插件，表现原理与image-set()类似：  
> 使用Tutorial17的代码  
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
> npm i --save-dev postcss-at2x  
> gulp  

其他插件推荐：<[bxSlider](http://www.bxslider.com)>创建响应式幻灯片，并使用jQuery移动每个幻灯片。  

## 添加响应式文本支持

> 使用Tutorial17的代码  
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
> npm i --save-dev postcss-at2x  
> npm i --save-dev postcss-responsive-type  
> gulp  
> 用浏览器打开index.html，缩放浏览器窗口，看到文字大小也一起改变  

值得注意的是，本实例中文字大小使用了具体的像素值，而非一直推荐的缩放比更好的em和rem。  
具体应该用哪个值，及何时使用取决于个人习惯  
<[更多关于px和rem值的优缺点](https://mindtheshiftwordpress.com/2015/04/02/r-i-p-rem-viva-cssreference-pixel/)>  

## 优化媒体查询

<[postcss-mq-keyframes](https://github.com/TCotton/postcss-mq-keyframes)>插件，会将所有关键帧从现有查询中移动到样式表底部  
<[css-mqpacker](https://github.com/hail2u/node-css-mqpacker)>插件，将所有相同的规则合并为一条媒体查询。她的手艺只有在很大，很复杂的网站才能更好体现  

> 最佳实践：尽量避免使用媒体查询。  
> 查询越少，越容易管理我们的代码。简单是网站成功的关键  

## 改造对老旧浏览器的支持

<[postcss-unmq](https://github.com/jonathantneal/postcss-unmq/)>插件会移除媒体查询，便于我们创建特定尺寸的规则  

## 远离响应式设计

响应式设计固有弱点：虽然只有那些选定版本的资源会被使用(更大或更小的图片)，但仍需下载多个资源，势必会增加带宽占用，并降低加载速度  

请在添加一层复杂的媒体查询时，花一些时间考虑是否真的需要它  

不应再为特定设备做设计，而是解决内容未被正确使用的问题，并在此构建断电，而非依赖一个随时可能变化的设备宽度  

至于高分辨率的图片，请考虑尽可能用svg格式图片替换

至于字体，请考虑使用vw，vh，vmin，vmax单位，以便文字随浏览器窗口大小改变，而不是使用媒体查询(postcss-vmin插件为旧版IE提供兼容支持)  

## 探索CSS4的媒体查询的功能

请参考插件<[postcss-media-minmax](https://github.com/postcss/postcss-media-minmax/)>的使用方式  
