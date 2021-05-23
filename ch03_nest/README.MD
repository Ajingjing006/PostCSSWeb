
# 第三章 嵌套规则

BEM: Block Element Modifier  

## 嵌套简介

不要滥用嵌套。简单代码避免嵌套  
缺点：可读性差；代码不易维护  

> 最佳实践：嵌套应该在代码的关闭括号前最后定义  

## 页面导航  

1 sass示例  

> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev autoprefixer  
> npm i --save-dev gulp-sourcemaps  
> npm i --save-dev cssnano  
> npm i --save-dev gulp-rename  
> npm i --save-dev gulp-clean  
> npm i --save-dev stylelint  
> npm i --save-dev postcss-reporter  
> npm i --save-dev gulp-dart-sass  
> gulp  

示例中的文件可能会有如下警告信息：  
dest/style.css  
1:1329  !!  Lowercase letters are easier to distinguish from numbers [stylelint]  
...  
这是因为部分颜色值是十六进制格式，并且字母用了大写，与gulp定义的task [lint-style]不相符。可以改为小写，以消除这些警告。  

2 使用PostCSS插件进行过渡  

> 复制项目demo_1，并重命名为demo_2  
> npm i --save-dev postcss-nesting  
> 利用sass插件编译后，会在src目录下生成一份*.css  
> 修改autoprefixer任务，指向src/*.css  
> 添加nesting插件引用  
> gulp  

3 将示例转换成PostCSS生产模式  

> 复制项目demo_2，并重命名为demo_3，并将Tutorial6A下的style.scss复制到demo_3/src  
> 修改src/*.css文件，是nesting插件可以识别嵌套代码部分  
> gulp  
> 将生成的style.min.css和Tutorial7的示例配合，检查效果  

注意：同级元素嵌套，@nest和后面的选择器没有空格；如果是后代元素嵌套，需要空格隔开。这样，nesting插件才能识别是不是父子元素  

## 探索嵌套陷阱  

在进行页面布局的时候，尽量使用语义化元素(&lt;header&gt;,&lt;section&gt;,&lt;article&gt;,&lt;footer&gt;)，而不是通篇的&lt;div&gt;  

这样可以避免以下弊端：  
难以阅读  
编译后，会产生大量的父选择器，代码行增加  
渲染性能差  
文件大  
可维护性差  

> 最佳实践：  
> 嵌套套级别不应超过四层，推荐两层。如果两层难以实现，需要审视一下页面的设计方式  
> 注意样式的定义顺序  
> 扁平化定义代码的结构，以避免权重的影响  
> 少用继承  
> 推荐BEM  

## 切换到BEM  

命名规范：  

- .block：顶级，包含将要更改的元素  
- .block__modifier：当元素状态改变时，指定样式  
- .block__element：顶级容器内的元素  
- .block__element__modifier：当状态改变时，元素的象征性替换  

```css
.block{
    &__element{
    }
    &__modifier{
    }
}
```

## 创建一个简单的消息盒子  

> mkdir demo_4  
> cd demo_4  
> npm init  
> npm i --save-dev gulp  
> npm i --save-dev gulp-postcss  
> npm i --save-dev postcss-reporter  
> 创建样式文件src/style.css，并定义BEM规范的代码  
> npm i --save-dev postcss-bem  
> npm i --save-dev postcss-bem-linter  
> 复制Tutorial9下的文件，并修改gulpfile.js  
> gulp  
> 复制编译后的style.css文件袋css目录  
> 用浏览器打开index.html  

## 总结  

如今，插件postcss-bem已停止更新，并且无法在最新的postcss下使用  
暂未找到合适的替代插件  
另外，针对postcss-bem-linter报出的错误，可以在代码块的上一行使用以下注解避免：  
> /* postcss-bem-linter: ignore */  
