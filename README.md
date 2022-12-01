<p align='left' style='font-size:30px' > 易用的注释代码 ( 准备重构注释方式 ) </p>
<p align=''> 这个是基于默认功能注释，功能优化插件 </p>
<!-- <p align=''> 中文 | <a href='./README.en-US.md'>English</a> </p> -->



## 使用方式

>CTRL+/

## 当前支持的文件(vue)

**vue html 嵌套注释功能**
```html
<template>
    <h2>eg:</h2>
     <div>
        <!-- <div></div>  -->
        <div></div>
        <!-- <div></div>  -->
     </div> 

    <h2>eg:</h2>
       <!-- <div>
        <!~~ <div></div>  ~~>
        <div></div>
        <!~~ <div></div>  ~~>
      </div>  -->
</template>
```

以上嵌套方式存在一些不够灵活的地方,如果要解开中间div还需要解开父级注释，插件下一个版本重新设计成行注释嵌套模式,感谢之前大家的使用

如下:行嵌套注释模式(我参考了webstom)
```html
<template>
    <h2>eg:</h2>
     <div>
        <!-- <div></div>  -->
        <div></div>
        <!-- <div></div>  -->
     </div> 

    <h2>eg:</h2>
       <!-- <div> -->
       <!-- <!~~ <div></div>  ~~> -->
       <!--  <div></div>   -->
       <!-- <!~~ <div></div>  ~~> -->
      <!-- </div>  -->
</template>
```


[更多功能](./example/html.md)

## 修复已知问题

修复了多层嵌套 html 未能正确取消注释

ps:注意目前未支持批量注释

```html
eg:
<!-- <div></div>  -->
<!-- <div></div> -->
<!-- <div></div> -->
```

## 下一个版本计划


未来还会加入，html属性注释，还会加入更多语言注释功能


`html,css,go,...More files`

## 关于 

[marketplace](https://marketplace.visualstudio.com/items?itemName=breakon.easy-comments-code)


## 许可证MIT

[MIT](https://opensource.org/licenses/MIT)


