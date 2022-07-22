
# HTML

`Introduction and testing`

## USE

> CTRL+/

## ✅ 1. Html Nested Comments (HTML嵌套)
<hr>

## Before
```html
   <div> 
	<!-- <div> </div> -->
   </div>
```

## After

```html
   <!-- <div>  
	<!~~ <div> </div> ~~>
    </div>  -->
```

## ✅ 2. Cancel Nesting Html(取消HTML嵌套) 
<hr>

### Before
<!-- TestMark:HtmlCancelNestingHtml-Before  -->
```html
  <!-- <main> 
<!~~ 
   <div></div>
      ~~>
		
   <!~~ test3 
	
	~~>
    test4
	 <!~~ 
   <div>
	<!~~ test3 
	
	~~>
	
	 <!~~ 
   <div></div>
      ~~>
	</div>
      ~~>
	 
   <!~~ 
   <div>
	<!~~ test3 
	
	~~>
	
	 <!~~ 
   <div></div>
      ~~>
	</div>
      ~~> 
   </main> 
	
	-->
```
**Process-转换过程**

The first layer of nested under the parent level will be canceled code block

在父级下嵌套的第一层将取消代码块 `<!~~`  switch `<!--`

### After
<!-- TestMark:HtmlCancelNestingHtml-After  -->
```html
 
 <main> 
<!-- 
   <div></div>
      -->

   <!-- test3 

        -->
    test4
         <!~~ 
   <div>
        <!~~ test3 

        ~~>

         <!~~ 
   <div></div>
      ~~>
        </div>
      ~~>
         
   <!~~ 
   <div>
        <!-- test3 

        -->

         <!-- 
   <div></div>
      -->
        </div>
      ~~> 
   </main> 
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