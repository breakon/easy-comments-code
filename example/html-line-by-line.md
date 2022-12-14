
# HTML

## USE

> CTRL+/

##  1. 单行注释
<hr>

## Before-1
<!-- test:lineByLine-1-before  -->
```html
    <div></div>
```
## After-1
<!-- test:lineByLine-1-after  -->
```html
<!--      <div></div> -->
```

## Before-2
<!-- test:lineByLine-2-before  -->
```html
<div></div>
```
## After-2
<!-- test:lineByLine-2-after  -->
```html
<!--      <div></div> -->
```

##  2. 多行注释
<hr>

## Before
<!-- test:multiLine-before  -->
```html
    <!-- <div>多行注释</div> -->
    <div></div>
```
## After
<!-- test:multiLine-after  -->
```html
<!--     <!~~ <div>多行注释</div> ~~> -->
<!--     <div></div> -->
```

##  3. 多行注释-嵌套
<hr>

只要被选中的div里面包含未被注释的 按下CTRL+/ 那就是注释

只有全被注释了才是解除注释

## Before-1
<!-- test:nestedMultiLine-1-before  -->
```html
    <div></div>
<!-- <div></div> -->
    <div></div>
```
## After-1
<!-- test:nestedMultiLine-1-after  -->
```html
<!--     <div></div> -->
<!-- <!~~ <div></div> ~~> -->
<!--     <div></div> -->
```


## Before-2
<!-- test:nestedMultiLine-2-before  -->
```html
    <div></div>
    <!-- <div><!~~ <div><!~~ <div>666</div> ~~></div> ~~></div> -->
```
## After-2
<!-- test:nestedMultiLine-2-after  -->
```html
<!-- <div></div> -->
<!-- <!~~ <div><!~~ <div><!~~ <div>666</div> ~~></div> ~~></div> ~~> -->
```


## Before-3
<!-- test:nestedMultiLine-3-before  -->
```html
    <div>
        <!-- <div> -->
        <img />
        <!-- err</div>-->
        <div></div>
    </div>
```
## After-3
<!-- test:nestedMultiLine-3-after  -->
```html
<!--     <div> -->
<!--         <!~~ <div> ~~> -->
<!--         <img /> -->
<!--         <!~~ err</div>~~> -->
<!--         <div></div> -->
<!--     </div> -->
```

		
