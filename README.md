<p align='left' style='font-size:30px' > 易用的注释代码 </p>
<p align=''> 这个是基于默认功能注释，功能优化插件 </p>
<!-- <p align=''> 中文 | <a href='./README.en-US.md'>English</a> </p> -->

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/breakon.easy-comments-code)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/breakon.easy-comments-code)
![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/breakon.easy-comments-code)
![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/breakon.easy-comments-code)
![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/breakon.easy-comments-code)
![GitHub last commit](https://img.shields.io/github/last-commit/breakon/easy-comments-code)
![GitHub](https://img.shields.io/github/license/breakon/easy-comments-code?color=green)
## 使用方式

>CTRL+/

## 🎉当前支持的文件

- vue(支持标签嵌套，css-postcss,css)

- wxml

- xml

- css

- postcss

- jsx / tsx


- html(支持标签嵌套，css嵌套待支持)



```html
<template>
注释之前
    <div>
        <!-- <div></div>  -->
                <div></div>
        <!-- <div></div>  -->
     </div>
注释之后
<!--     <div> -->
<!--         <!~~ <div></div>  ~~> -->
<!--                 <div></div> -->
<!--         <!~~ <div></div>  ~~> -->
<!--      </div> -->

</template>
```

react

```jsx

注释前
{/* <div></div> */}
<div></div>
{/* <div></div> */}


注释后
{/* <!~~ <div></div> ~~> */}
{/* <div></div> */}
{/* <!~~ <div></div> ~~> */}

```



## 下个版本计划

markdown等格式和其他注释优化等功能，自定义等等功能


[更多功能](./example/html-line-by-line.md)

## 关于 

[marketplace](https://marketplace.visualstudio.com/items?itemName=breakon.easy-comments-code)

## 许可证MIT

[MIT](https://opensource.org/licenses/MIT)


