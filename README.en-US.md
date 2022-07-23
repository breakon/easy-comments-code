# Easy Comments Code


This is on the basis of the original function optimization running comments plugin

## Use

>CTRL+/

## Currently support functions

**Vue HTML Nested Comments**
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

[Functional details](./example/html.md)

## Fix

Note that no batch annotation is currently supported

```html
eg:
<!-- <div></div>  -->
<!-- <div></div> -->
<!-- <div></div> -->
```




## The Next Version

The future will support HTML attribute annotations

`html,css,go,...More files`

##  About

[marketplace](https://marketplace.visualstudio.com/items?itemName=breakon.easy-comments-code)


## License

[MIT](https://opensource.org/licenses/MIT)
