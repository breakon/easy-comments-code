# JSX(下一版本支持) 



```jsx
{ /* <!~~ <Link to="/about">About</Link>  ~~> */}
```

## USE

> CTRL+/

##  1. 单行注释
<hr>

## Before-1
<!-- test:lineByLine-1-before  -->
```jsx
    <div></div>
```
## After-1
<!-- test:lineByLine-1-after  -->
```jsx
    {/* <div></div> */}
``` 

##  2. 多行注释
<hr>

## Before
<!-- test:multiLine-before  -->
```jsx
    {/* <div>多行注释</div> */}
    <div></div>
```
## After
<!-- test:multiLine-after  -->
```jsx
    {/* <!~~ <div>多行注释</div> ~~> */}
    {/* <div></div> */}
```


