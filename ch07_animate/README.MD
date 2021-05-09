# 第七章 动画元素

## 回顾基本动画

<[Caaaaat动画](http://roxik.com/cat)>支持浏览器缩放  

> T34源码有示例展示  

## 摆脱jQuery

彻底摆脱jQuery，特别是.animate()，需要一下工作：  

- 升级jQuery版本。新版本中的requestAnimationFrame改善了性能  
- 使用[jQuery Animate Enhanced](http://playground.benbarnett.net/jquery-animateenhanced/)插件。它会将.animate()替换为等价的CSS3动画；保留不能替换的  
- 使用[GSAP](https://greensock.com/jquery-gsap-plugin/)动画库。它把.animate()替换为自己的GSAP库，快20倍。我们在样式表中添加等价的CSS3样式，将.animate()替换为.removeClass()或.addClass()  
- [Transit](http://ricostacruz.com/jquery.transit)依然依赖jQuery，但性能更快  
- [Velocity.js](http://julian.com/research/velocity)库不依赖jQuery  

检查FPS帧速率的差异，http://framesper-second.appspot.com/  
控制60fps(流畅)和25fps(卡顿)的不同  

简单的动画，可以通过CSS实现；而复杂的，甚至涉及排序的，还是要依赖JavaScript  

<b>使用Transit.js库制作动画</b>：

> T35/A是该库的源码示例  
> 相比标准jQuery实现的动画，这个依赖jQuery的库，帧速率更好  
> 但本质还是在用jQuery  

<b>使用纯JavaScript添加动画</b>：

针对较新的浏览器应用动画，并不一定要依赖于jQuery了。原生Javascript和CSS能更快速的展示动画  

> T35/C该库结合原生JavaScript的源码示例  
> 速度最快  
> 但老旧浏览器得不到支持  

<b>使用jQuery来切换class</b>：

jQuery只用来切换元素的调用，而不参与动画  

> T35/B是该库结合jQuery的源码示例  
> 速度仍不及原生JS的动画，但足够均衡  

<b>使用CSS3动画样式</b>：  

> T36是jQuery和CSS3的配合实现动画  
> 利用.removeClass()和.addClass()  

一个创建自定义动画的[GUI](http://cssanimate.com/)，在提交请求时给出正确代码  

## 使用预构建库

使用animate.css预构建库，创建照片墙动画  

> 引用animate.css库  
> 在需要创建动画的元素上，添加动画类即可(如animated bounce等)  

另外，书中源码示例T37使用了几张在线的图片进行动画演示，但网络环境不同，无法完整展现  
替换为本地资源，重新展示在demo_1文件夹中  

## 切换到使用Sass

Sass使用mixins构建样式，但尽量用mixin库，如[Animation.scss](https://github.com/geoffgraham/animate.scss/)  

<b>创建一个画廊</b>

> cd demo_2
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
> npm i --save-dev gulp-dart-sass  
> 下载Sass版本的[Animate](https://github.com/geoffgraham/animate.scss/archive/master.zip/)，提取Animate.scss-master，放到demo_2根目录下  
> 将Animate.scss重命名为_animate.scss，声明它是一个组件，防止被Sass编译成一个单独文件  
> 将样式表命名为style.scss  
> gulp

<b style="color:red;">本示例用gulp-dart-sass编译scss文件出错，但生成的样式表的动画效果成功</b>  

## 探索PostCSS可用的插件选项

如果是CSS3动画的实现，可以过渡到PostCSS插件。目前有四个插件可用：  

- [postcss-animation](https://github.com/zhouwenbin/postcss-animation)从Animate.css添加@keyframe，使用[postcss-animate-data](https://github.com/zhouwenbin/postcss-animation-data)保存转换后的动画  
- [postcss-easing](https://github.com/postcss/postcss-easing)插件将easing名转换为等效的cubic-bezier()值  
- [postcss-transform-shortcut](https://github.com/jonathantneal/postcsstransform-shortcut)允许创建transform声明时，指定单独值  
- [postcss-mq-keyframes](https://github.com/TCotton/postcss-mq-keyframes)插件将所有keyframes移动到CSS文件底部  
- [postcss-animations](https://github.com/retyui/postcss-animations)从Animate.css库中提取动画，使用[postcss-animation.css-data](https://github.com/retyui/postcss-animation.css-data)生成的数据  

<b>更新代码以使用PostCSS</b>

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
> npm i --save-dev postcss-animation  
> 复制T39的文件源码
> gulp  

## 使用PostCSS创建一个Demo

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
> npm i --save-dev postcss-transform-shortcut  
> 复制T40的文件源码
> gulp  

## 使用我们自己的动画插件

[Magic动画](http://www.minimamente.com/example/magic_animations/)  
[postcss-magic-animations](https://github.com/nucliweb/postcss-magic-animations)  

> cd demo_5  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev postcss-magic-animations  
> 复制T41源码中的postcss-magic-animation文件夹和postcss-magic-data文件夹到项目的node_modules目录  
> gulp  
> 查看编译生成的dest/style.css，已经增加了@keyframes代码  

原始动画效果：  
https://github.com/miniMAC/magic/blob/master/dist/magic.css  

Motion-UI:  
https://zurb.com/playground/motion-ui  

贝塞尔曲线：  
https://cubic-bezier.com/  
