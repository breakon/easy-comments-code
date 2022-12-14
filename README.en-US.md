# Easy Comments Code


This is on the basis of the original function optimization running comments plugin

## Use

>CTRL+/

## Currently support functions

**Vue HTML Nested Comments**
```html
<template>
Before
    <div>
        <!-- <div></div>  -->
                <div></div>
        <!-- <div></div>  -->
     </div>
After
<!--     <div> -->
<!--         <!~~ <div></div>  ~~> -->
<!--                 <div></div> -->
<!--         <!~~ <div></div>  ~~> -->
<!--      </div> -->
</template>
```

[Functional details](./example/html-line-by-line.md)



##  About

[marketplace](https://marketplace.visualstudio.com/items?itemName=breakon.easy-comments-code)


## License

[MIT](https://opensource.org/licenses/MIT)
