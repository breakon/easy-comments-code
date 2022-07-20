
# HTML

`Introduction and testing`

# USE

> CTRL+/

# ✅ 1. Html Nested Comments (HTML嵌套)


## Before
```html
<html>
</body>
   <div> 
	<div> </div>
	<!-- <div> </div> -->
   </div>
</body>
</html>
```

## After
```html
<html>
</body>
   <!-- <div> 
	<div> </div>
	<!~~ <div> </div> ~~>
   </div> -->
</body>
</html>
```

# ✅ 2. Cancel Nesting Html(取消HTML嵌套) 

## Before
<!-- TestMark:Html-Cancel-Nesting-Html  -->
```html
<html>
</body>
   <div> 
   <!--  
     <!~~ 
       <div> 
	<!~~ <div> </div> ~~>
	<!~~ <div> </div> ~~>
        </div> 
      ~~>
   </div> -->
</body>
</html>
```


## After

```html
<html>
</body>
   <div> 
     <!-- 
       <div> 
	<!~~ <div> </div> ~~>
	<!~~ <div> </div> ~~>
        </div> 
      -->
   </div> 
</body>
</html>
```

# 👨‍💻3. (Wait for support) Property comments(属性注释) 


## trigger
Use double slash trigger 

Step 1
> // class 

Step 2
> ctrl+ /


## Before
```html
<html>
</body>
    <!-- eg-1 -->
    <div class="box" style='z-index:1' id="'1123'+1" > </div>
    <!-- eg-2 -->
    <div
	class="box" 
	style='z-index:2'
	id="'1123'+1" 
     > 
   
    </div>
</body>
</html>
```


## After

```html
<html>
</body>
    <!-- eg-1 -->
    <div > 
	<!-- //class="box" //style='z-index:1' //id="'1123'+1" -->
    </div>

     <!-- eg-2 -->
    <div
     >
     <!-- 
	  //class="box"
	  //style='z-index:2'
	  //id="'1123'+1" 
      -->
    </div>
</body>
</html>
```

