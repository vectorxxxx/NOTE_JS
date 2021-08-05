> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# DOM

## 1、DOM简介

DOM，全称Document Object Model **文档对象模型**。

JS中通过DOM来对HTML文档进行操作。只要理解了DOM就可以随心所欲的操作WEB页面。

### 文档

文档表示的就是整个的HTML网页文档

### 对象

对象表示将网页中的每一个部分都转换为了一个对象

### 模型

使用模型来表示对象之间的关系，这样方便我们获取对象

![image-20210801152925307](https://i.loli.net/2021/08/01/7o8bmgeQHFXhly9.png)

DOM树体现了节点与节点之间的关系

![image-20210801153018626](https://i.loli.net/2021/08/01/soiEQhjyu3AzNJ1.png)



## 2、节点

节点Node，是构成我们网页的最基本的组成部分，网页中的每一个部分都可以称为是一个节点

比如：html标签、属性、文本、注释、整个文档等都是一个节点

虽然都是节点，但是实际上他们的具体类型是不同的。比如：

- 标签称为元素节点
- 属性称为属性节点
- 文本称为文本节点
- 文档称为文档节点

节点的类型不同，属性和方法也都不尽相同

### 节点类型

节点：Node——构成HTML文档最基本的单元

常用节点分为四类

- 文档节点：整个HTML文档
- 元素节点：HTML文档中的HTL标签
- 属性节点：元素的属性
- 文本节点：HTML标签中的文本内容

![image-20210801153554420](https://i.loli.net/2021/08/01/R1AOaxYnNyDi2mH.png)

### 节点属性

![image-20210801153633118](https://i.loli.net/2021/08/01/wfuSynGj5DVaKbt.png)

### 文档节点（Document）

文档节点`document`，代表的是整个HTML文档，网页中的所有节点都是它的子节点

`document`对象作为`window`对象的属性存在的，我们不用获取可以直接使用

通过该对象我们可以在整个文档访问内查找节点对象，并可以通过该对象创建各种节点对象

### 元素节点（Element）

HTML中的各种标签都是元素节点，这也是我们最常用的一个节点

浏览器会将页面中所有的标签都转换为一个元素节点，我们可以通过`document`的方法来获取元素节点

比如：`document.getElementById()` 根据id属性值获取一个元素节点对象。

### 文本节点（Text）

文本节点表示的是HTML标签以外的文本内容，任意非HTML的文本都是文本节点

它包括可以字面解释的纯文本内容

文本节点一般是作为元素节点的子节点存在的

获取文本节点时，一般先要获取元素节点，再通过元素节点获取文本节点。例如：`元素节点.firstChild;`

获取元素节点的第一个子节点，一般为文本节点

### 属性节点（Attr）

属性节点表示的是标签中的一个一个的属性，这里要注意的是属性节点并非是元素节点的子节点，而是元素节点的一部分

可以通过元素节点来获取指定的属性节点。例如：`元素节点.getAttributeNode("属性名");`

**注意：我们一般不使用属性节点**

浏览器已经为我们提供文档节点对象，这个对象是`window`

属性可以在页面中直接使用，文档节点代表的是整个网页

```javascript
// 获取button对象
var btn = document.getElementById("btn");
console.log(btn); // <button type="button" id="btn">我是一个按钮</button>
// 修改btn的文本节点内容
btn.innerHTML = "I'm a button.";
```



## 3、事件

事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间

JavaScript与HTML之间的交互是通过事件实现的

对于Web应用来说，有下面这些代表性的事件：点击某个元素、将鼠标移动至某个元素上方、按下键盘上某个键，等等

![image-20210801155425259](https://i.loli.net/2021/08/01/61nwvAuQcM7lDUb.png)

我们可以在事件对应的属性中设置一些js代码，这样当事件被触发时，这些代码将会执行

```javascript
<button type="button" id="btn" onclick="alert('Fuck');">我是一个按钮</button>
```

这种写法我们称为结构和行为耦合，不方便维护，不推荐使用

可以为按钮的对应事件绑定处理函数的形式来响应事件，这样当事件被触发时，其对应的函数将会被调用

```javascript
// 绑定一个单击事件
btn.onclick = function(){
    alert("Don't touch me.");
}
```

像这种为单击事件绑定的函数，我们称为单击响应函数



## 4、文档的加载

当我们把`script`标签放到`head`中时，会报错`UncaughtTypeError: Cannot set property 'innerHTML' of null`，这是为什么呢？

浏览器在加载一个页面时，是按照自上向下的顺序加载的，读取到一行就运行一行，如果将`script`标签写到页面的上边，在代码执行时，页面还没有加载，DOM对象也没有加载，会导致无法获取到DOM对象

![image-20210801160850690](https://i.loli.net/2021/08/01/iKbxesXkY5BVTIc.png)

如果非要这么干，也不是没有办法

`onload`事件会在整个页面加载完成之后才触发，可以为`window`对象绑定一个`onload`事件

```javascript
window.onload = function(){
    // 获取button对象
    var btn = document.getElementById("btn");
    // 绑定一个单击事件
    btn.onclick = function(){
        alert("Don't touch me.");
    }
}
```

该事件对应的响应函数将会在页面加载完成之后执行，这样可以确保我们的代码执行时所有的DOM对象已经加载完毕了



## 5、DOM查询

### 获取元素节点

![image-20210803222352914](https://i.loli.net/2021/08/03/tuBpZTmWkhsE6nV.png)

通过document对象调用

为了方便，定义一个通用的函数，专门用来为指定元素绑定单击响应函数

```javascript
// 参数：
// 	idstr	要绑定单击响应函数的对象的id属性值
// 	fun		事件的回调函数，当单击元素时，该函数将会被触发
function myClick(idStr, fun){
    var btn = document.getElementById(idStr);
    btn.onclick = fun;
}
```

- `getElementById()` 通过id属性获取**一个**元素节点对象

  ```javascript
  myClick("btn01", function () {
      // innerHTML 通过这个属性可以获取到元素内部的html代码
      alert(document.getElementById("bj").innerHTML); // 北京
  });
  ```
  
- `getElementsByTagName()` 通过标签名获取**一组**元素节点对象

  ```javascript
  myClick("btn02", function () {
      // getElementsByTagName()可以根据标签名来获取一组元素节点对象
      // 这个方法会给我们返回一个类数组对象，所有查询到的元素都会封装到对象中
      // 即使查询到的元素只有一个，也会封装到数组中返回
      var li_list = document.getElementsByTagName("li");
      alert(li_list.length); // 14
      
      var arr = [];
      for(var i=0;i<li_list.length;i++){
          arr.push(li_list[i].innerHTML);
      }
      alert(arr); // 北京,上海,东京,首尔,红警,实况,极品飞车,魔兽,IOS,Android,Windows Phone,IOS,Android,Windows Phone
  });
  ```
  
- `getElementsByName()` 通过name属性获取**一组**元素节点对象

  ```javascript
  myClick("btn03", function () {
      var inputs = document.getElementsByName("gender");
      alert(inputs.length); // 2
      
      var arr = [];
      for(var i=0;i<inputs.length;i++){
          // innerHTML用于获取元素内战的HTML代码的
          // 如果需要读取元素节点属性，直接使用`元素.属性名`
          // 例子：`元素.id`  `元素.name`  `元素.value`
          arr.push(inputs[i].value); 
          // 注意：class属性不能采用这种方式，读取class属性时需要使用`元素.className`
          arr.push(inputs[i].className);
      }
      alert(arr); // male,hello,female,hello
  });
  ```

**练习：图片切换**

HTML代码

```html
<div class="outer">
    <p id="info">共5张图片，当前第1张</p>
    <img src="img/1.jpg" alt="冰棍"/>
    <button type="button" id="prev">上一张</button>
    <button type="button" id="next">下一张</button>
</div>
```

CSS代码

```css
*{
    margin:0;
    padding:0;
}

.outer{
    width: 500px;
    margin: 50px auto;
    padding: 10px;
    background-color: greenyellow;
    /* 文本居中：内联样式当成是文本 */
    text-align: center;
}
```

JS代码

```javascript
// 上一张
var prev = document.getElementById("prev");
// 下一张
var next = document.getElementById("next");
// 图片
var img = document.getElementsByTagName("img")[0];
// 信息
var info = document.getElementById("info");
// 图片集合
var imgArr = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"];
// 记录第几张
var index = 0;
// 上一张绑定单击相应事件
prev.onclick = function(){
    // 循环切换
    index = (index < 0) ? imgArr.length - 1 : index;
    // 修改img的src属性，以切换图片
    img.src = imgArr[index];
    // 修改文字提示
    info.innerHTML = "共" + imgArr.length + "张图片，当前第" + (index + 1) + "张";
    // 切换上一张
    index--;
};
// 下一张绑定单击相应事件
next.onclick = function(){
    // 循环切换			
    index = (index > imgArr.length - 1) ? 0 :index;
    // 修改img的src属性，以切换图片
    img.src = imgArr[index];
    // 修改文字提示
    info.innerHTML = "共" + imgArr.length + "张图片，当前第" + (index + 1) + "张";
    // 切换下一张
    index++;
};
```

效果

![图片切换](https://i.loli.net/2021/08/02/iMh6CoVk4rq7jzO.gif)

### 获取元素节点的子节点

![image-20210803222419830](https://i.loli.net/2021/08/03/wRicLYSWEshzxBX.png)

通过具体的元素节点调用

- `getElementsByTagName()`方法，返回当前节点的指定标签名后代节点

  ```javascript
  myClick("btn04", function () {
      var city = document.getElementById("city");
      // 获取city下1i节点
      var list = city.getElementsByTagName("li");
      alert(list.length); // 4
      
      var arr = [];
      for(var i=0;i<list.length;i++){
          arr.push(list[i].innerHTML);
      }
      alert(arr); // 北京,上海,东京,首尔
  });
  ```

- `childNodes`属性，表示当前节点的所有子节点

  ```javascript
  myClick("btn05", function () {
      var city = document.getElementById("city");
      // childNodes属性会获取包括文本节点在内的所有节点
      // 根据DOM标签标签间空白也会当成文本节点
      // 注意：在IE8及以下的浏览器中，不会将空白文本当成子节点
      // 所以该属性在IE8中会返回4个子元素，而其他浏览器是9个
      var list = city.childNodes;
      alert(list.length); // 9
      
      var arr = [];
      for(var i=0;i<list.length;i++){
          arr.push(list[i]);
      }
      alert(arr); // [object Text],[object HTMLLIElement],[object Text],[object HTMLLIElement],[object Text],[object HTMLLIElement],[object Text],[object HTMLLIElement],[object Text]
  });
  myClick("btn05", function () {
      var city = document.getElementById("city");
      // children属性可以获取当前元素的所有子元素
      var list = city.children;
      alert(list.length); // 4
      
      var arr = [];
      for(var i=0;i<list.length;i++){
          arr.push(list[i].innerHTML);
      }
      alert(arr); // 北京,上海,东京,首尔
  });
  ```

- `firstChild`属性，表示当前节点的第一个子节点

  ```javascript
  myClick("btn06", function () {
      var phone = document.getElementById("phone");
      // firstChild可以获取到当前元素的第一个子节点（包括空白文本节点）
      var firstChild = phone.firstChild;				
      alert(firstChild); // [object HTMLLIElement]
      alert(firstChild.innerHTML); // IOS
  });
  myClick("btn06", function () {
      var phone2 = document.getElementById("phone2");
      // firstChild可以获取到当前元素的第一个子节点（包括空白文本节点）
      var firstChild = phone2.firstChild;				
      alert(firstChild); // [object Text]
      alert(firstChild.innerHTML); // undefined
  });
  myClick("btn06", function () {
      var phone2 = document.getElementById("phone2");
      // firstElementchild不支持IE8及以下的浏览器，如果需要兼容他们尽量不要使用
      var firstElementChild = phone2.firstElementChild;				
      alert(firstElementChild); // [object HTMLLIElement]
      alert(firstElementChild.innerHTML); // IOS
  });
  ```

- `lastChild`属性，表示当前节点的最后一个子节点

  ```javascript
  document.getElementById("btn062").onclick = function () {
      var phone = document.getElementById("phone");
      // children属性可以获取当前元素的所有子元素
      var lastChild = phone.lastChild;				
      alert(lastChild); // [object HTMLLIElement]
      alert(lastChild.innerHTML); // Windows Phone
  });
  ```

### 获取父节点和兄弟节点

![image-20210803222448362](https://i.loli.net/2021/08/03/go8P6iSVcHqYzLU.png)

通过具体的节点调用

- `parentNode`属性，表示当前节点的父节点

  ```javascript
  myClick("btn07", function () {
      var bj = document.getElementById("bj");
      var parentNode = bj.parentNode;				
      alert(parentNode); // [object HTMLUListElement]
      alert(parentNode.innerHTML);
      // <li id="bj">北京</li>
      // <li>上海</li>
      // <li>东京</li>
      // <li>首尔</li>
      
      // innerText
      // -该属性可以获取到元素内部的文本内容
      // -它和innerHTML类似，不同的是它会自动将htm1去除
      alert(parentNode.innerText);
      // 北京
      // 上海
      // 东京
      // 首尔
  });
  ```

- `previousSibling`属性，表示当前节点的前一个兄弟节点

  ```javascript
  myClick("btn08", function () {
      var android = document.getElementById("android");
      // 返回#android的前一个兄弟节点（也可能获取到空白的文本）
      var previousSibling = android.previousSibling;				
      alert(previousSibling); // [object HTMLLIElement]
      alert(previousSibling.innerHTML); // IOS
  });
  myClick("btn08", function () {
      var android2 = document.getElementById("android2");
      // 返回#android的前一个兄弟节点（也可能获取到空白的文本）
      var previousSibling = android2.previousSibling;				
      alert(previousSibling); // [object Text]
      alert(previousSibling.innerHTML); // undefined
  });
  myClick("btn08", function () {
      var android2 = document.getElementById("android2");
      // previousElementSibling获取前一个兄弟元素，IE8及以下不支持
      var previousElementSibling = android2.previousElementSibling;				
      alert(previousElementSibling); // [object HTMLLIElement]
      alert(previousElementSibling.innerHTML); // IOS
  });
  ```

- `nextSibling`属性，表示当前节点的后一个兄弟节点

  ```javascript
  myClick("btn082", function () {
      var android = document.getElementById("android");
      // 返回#android的前一个兄弟节点（也可能获取到空白的文本）
      var nextSibling = android.nextSibling;				
      alert(nextSibling); // [object HTMLLIElement]
      alert(nextSibling.innerHTML); // Windows Phone
  });
  ```

  

## 6、全选练习

**HTML代码**

```html
<form method="post" action="">
    你爱好的运动是？<input type="checkbox" id="checkedAllBox" />全选/全不选 

    <br />
    <input type="checkbox" name="items" value="足球" />足球
    <input type="checkbox" name="items" value="篮球" />篮球
    <input type="checkbox" name="items" value="羽毛球" />羽毛球
    <input type="checkbox" name="items" value="乒乓球" />乒乓球
    <br />
    <input type="button" id="checkedAllBtn" value="全　选" />
    <input type="button" id="checkedNoBtn" value="全不选" />
    <input type="button" id="checkedRevBtn" value="反　选" />
    <input type="button" id="sendBtn" value="提　交" />
</form>
```

### 全选

```javascript
document.getElementById("checkedAllBtn").onclick = function(){
    var items = document.getElementsByName("items");
    for(var i=0;i<items.length;i++){
        // 通过多选框的checked属性可以来获取或设置多选框的选中状态
        items[i].checked = true;
    }
    // 全选按钮也要同步选中
    document.getElementById("checkedAllBox").checked = true;
}
```

### 全不选

```javascript
document.getElementById("checkedNoBtn").onclick = function(){
    var items = document.getElementsByName("items");
    for(var i=0;i<items.length;i++){
        items[i].checked = false;
    }
    // 全选按钮也要同步不选中
    document.getElementById("checkedAllBox").checked = false;
}
```

### 反选

```javascript
document.getElementById("checkedRevBtn").onclick = function(){
    var items = document.getElementsByName("items");
    var flag = true;
    for(var i=0;i<items.length;i++){
        items[i].checked = !items[i].checked;
        if(!items[i].checked){
            flag = false;
        }
    }
    // 全选按钮也要同步选中或不选中
    document.getElementById("checkedAllBox").checked = flag;
}
```

### 提交

```javascript
document.getElementById("sendBtn").onclick = function(){
    var items = document.getElementsByName("items");
    var arr = [];
    for(var i=0;i<items.length;i++){
        if(items[i].checked){
            arr.push(items[i].value);
        }
    }
    alert(arr);
}
```

### 全选/全不选

```javascript
document.getElementById("checkedAllBox").onclick = function(){
    var items = document.getElementsByName("items");
    for(var i=0;i<items.length;i++){
        // 在事件的响应函数中，响应函数是给谁绑定的this就是谁
        items[i].checked = this.checked; 
    }
}
```

### items

```javascript
var flag;
var items = document.getElementsByName("items");
for(var i=0;i<items.length;i++){
    items[i].onclick = function(){
        flag = true;
        for(var j=0;j<items.length;j++){
            if(!items[j].checked){
                flag = false;
                break;
            }
        }
        document.getElementById("checkedAllBox").checked = flag;
    }
}
```

**效果**

![image-20210804215409752](https://i.loli.net/2021/08/04/bGFQ2ZXTJDBwCAo.png)

![image-20210804215455471](https://i.loli.net/2021/08/04/iHnB9SytKUFWw6V.png)

![image-20210804215513918](https://i.loli.net/2021/08/04/HCpfRazkY3sEAcS.png)



## 7、DOM查询的剩余方法

### document.body

在`document`中有一个属性`body`，它保存的是`body`的引用

```javascript
// 注意：如果script标签是定义在head中的，则这里需要window.onload = function(){}包裹，否则会出现null的情况
var body = document.getElementsByTagName("body");
console.log(body); // HTMLCollection [body]
body = document.body;
console.log(body); // <body></body>
console.log(typeof body); // object
```

### document.documentElement

`document.documentElement`保存的是`html`根标签

```javascript
var html = document.documentElement;
console.log(html);
```

### document.all

`document.all`代表页面中所有的元素

```javascript
var all = document.all;
console.log(all); // HTMLAllCollection(11) [html, head, meta, title, script, script, script, body, script, script, script]
console.log(all.length); // 11
console.log(typeof all); // undefined
for(var i=0;i<all.length;i++){
    console.log(all[i]);
}

var el = document.getElementsByTagName("*");
console.log(el); // HTMLCollection(11) [html, head, meta, title, script, script, script, body, script, script, script]
console.log(all.length); // 11
console.log(typeof all); // undefined
for(var i=0;i<el.length;i++){
    console.log(el[i]);
}
```

### document.getElementsByClassName()

根据元素的`class`属性值查询一组元素节点对象

`getElementsByClassName()`可以根据`class`属性值获取一组元素节点对象，但是该方法不支持IE8及以下的浏览器

```javascript
var boxs = document.getElementsByClassName("box");
console.log(boxs); // HTMLCollection(3) [div.box, div.box, div.box]
console.log(boxs.length); // 3
console.log(typeof boxs); // object
```

### document.querySelector()

需要一个选择器的字符串作为参数，可以根据一个CSS选择器来查询一个元素节点对象

虽然IE8中没有`getElementsByClassName()`但是可以使用`querySelector()`代替

使用该方法总会返回唯一的一个元素，如果满足条件的元素有多个，那么它只会返回第一个

```javascript
var div = document.querySelector(".box div");
console.log(div.innerHTML); // I'm first div.
boxs = document.querySelector(".box");
console.log(boxs); 
// <div class="box">
// 		<div>I'm first div.</div>
// </div>
```

### document.querySelectorAll()

该方法和`querySelector()`用法类似，不的是它会将符合条件的元素封装到一个数组中返回

即使符合条件的元素只有一个，它也会返回数组

```javascript
boxs = document.querySelectorAll(".box");
console.log(boxs); // NodeList(3) [div.box, div.box, div.box]
console.log(boxs.length); //3
```



## 8、DOM增删改

![image-20210804215312180](https://i.loli.net/2021/08/04/Y4M79fLcsUFOHv1.png)

### document.createElement()

可以用于创建一个元素节点对象，它需要一个标签名作为参数，将会根据该标签名创建元素节点对象，并将创建好的对象作为返回值返回

### document.createTextNode()

可以用来创建一个文本节点对象，它需要一个文本内容作为参数，将会根据该内容创建文本节点，并将新的节点返回

### appendChild()

向一个父节点中添加一个新的子节点，用法：`父节点.appendChild(子节点);`

### insertBefore()

可以在指定的子节点前插入新的子节点，语法：`父节点.insertBefore(新节点, 旧节点);`

### replaceChild()

可以使用指定的子节点替换已有的子节点，语法：`父节点.replaceChild(新节点, 旧节点);`

### removeChild()

可以删除一个子节点，语法：`父节点.removeChild(子节点);`、`子节点.parentNode.removeChild(子节点);`

```javascript
// 创建一个"广州"节点,添加到#city下
var city = document.getElementById("city");
myClick("btn01",function(){
    // 创建元素节点
    var li = document.createElement("li");
    // 创建文本节点
    var gz = document.createTextNode("广州");
    // 将文本节点添加到元素节点中
    li.appendChild(gz);
    // 将元素节点添加至#city下
    city.appendChild(li);
});
// 将"广州"节点插入到#bj前面	
var bj = document.getElementById("bj");
myClick("btn02",function(){
    var li = document.createElement("li");
    var gz = document.createTextNode("广州");
    li.appendChild(gz);
    // 将元素节点插入到#bj前面
    city.insertBefore(li,bj);
});
// 使用"广州"节点替换#bj节点
myClick("btn03",function(){
    var li = document.createElement("li");
    var gz = document.createTextNode("广州");
    li.appendChild(gz);
    // 将元素节点替换#bj节点
    city.replaceChild(li,bj);
});
// 删除#bj节点
myClick("btn04",function(){
    // 将元素节点替换#bj节点
    // city.removeChild(bj);
    // 更常用，不需要知道父节点是什么	
    bj.parentNode.removeChild(bj);
});
// 使用innerHTML将"广州"节点添加到#city下
myClick("btn07",function(){
    // 使用innerHTML也可以完成DOM的增删改的相关操作
    // city.innerHTML += "<li>广州</li>";
    // 不过这种方式会先删除再替换，耗费性能，所以一般我们会两种方式结合使用
    var li = document.createElement("li");
    li.innerHTML = "广州";
    city.appendChild(li);
});
```



### 9、增删练习

准备

![image-20210805221937924](https://i.loli.net/2021/08/05/8OeaRbZcf9YHAnG.png)

HTML代码

```html
<table id="employeeTable">
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Salary</th>
        <th>&nbsp;</th>
    </tr>
    <tr>
        <td>Tom</td>
        <td>tom@tom.com</td>
        <td>5000</td>
        <td><a href="deleteEmp?id=001">Delete</a></td>
    </tr>
    <tr>
        <td>Jerry</td>
        <td>jerry@sohu.com</td>
        <td>8000</td>
        <td><a href="deleteEmp?id=002">Delete</a></td>
    </tr>
    <tr>
        <td>Bob</td>
        <td>bob@tom.com</td>
        <td>10000</td>
        <td><a href="deleteEmp?id=003">Delete</a></td>
    </tr>
</table>

<div id="formDiv">
    <h4>添加新员工</h4>
    <table>
        <tr>
            <td class="word">name: </td>
            <td class="inp">
                <input type="text" name="empName" id="empName" />
            </td>
        </tr>
        <tr>
            <td class="word">email: </td>
            <td class="inp">
                <input type="text" name="email" id="email" />
            </td>
        </tr>
        <tr>
            <td class="word">salary: </td>
            <td class="inp">
                <input type="text" name="salary" id="salary" />
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <button id="addEmpButton" value="abc">
                    Submit
                </button>
            </td>
        </tr>
    </table>
</div>
```

JS代码

```javascript
// a的单击相应函数
function delRow() {
    // 添加提示信息
    grandPrentNode = this.parentNode.parentNode;
    var name = grandPrentNode.children[0].innerHTML;
    if (confirm("确认删除" + name + "吗？")) {
        // 删除祖先节点
        grandPrentNode.parentNode.removeChild(grandPrentNode);
    }
    // 点击超链接以后，超链接会跳转页面，这个是超链接的默认行为，
    // 但是此时我们不希望出现默认行为，可以通过在响应函数的最后return false来取消默认行为
    return false;
}

window.onload = function() {
    // 1、删除
    // 为delete绑定单击相应函数
    var a;
    var grandPrentNode;
    var aList = document.getElementsByTagName("a");
    for (var i = 0; i < aList.length; i++) {
        aList[i].onclick = delRow;
    }

    // 2、添加
    document.getElementById("addEmpButton").onclick = function() {
        // 获取name/email/salary
        var empName = document.getElementById("empName").value;
        var email = document.getElementById("email").value;
        var salary = document.getElementById("salary").value;

        // 校验数据是否为空
        if (!empName || !email || !salary) {
            alert("有数据为空，无法添加！");
            return;
        }

        // 创建文本节点
        var empName_text = document.createTextNode(empName);
        var email_text = document.createTextNode(email);
        var salary_text = document.createTextNode(salary);
        var delete_text = document.createTextNode("Delete");

        // 创建元素节点
        var tr = document.createElement("tr");
        var empName_td = document.createElement("td");
        var email_td = document.createElement("td");
        var salary_td = document.createElement("td");
        var a_td = document.createElement("td");
        var a = document.createElement("a");

        // 添加内容
        a.href = "javascript:;";
        a.onclick = delRow;

        // 添加子节点
        empName_td.appendChild(empName_text);
        email_td.appendChild(email_text);
        salary_td.appendChild(salary_text);
        a.appendChild(delete_text);
        a_td.appendChild(a);
        tr.appendChild(empName_td);
        tr.appendChild(email_td);
        tr.appendChild(salary_td);
        tr.appendChild(a_td);

        // 将tr添加至table中
        // document.getElementById("employeeTable").appendChild(tr);
        // 注意：浏览器生成的table结构会在内部套一层tbody，为了以防万一，也为了结构一致性和样式一致性，应该将其添加至tbody中
        var employeeTable = document.getElementById("employeeTable");
        var tbody = employeeTable.getElementsByTagName("tbody")[0];
        tbody.appendChild(tr);
    }
```

**添加优化**

结合`createElement`和`innerHTML`，优化修改上述添加代码逻辑

```javascript
document.getElementById("addEmpButton").onclick = function() {
    // 获取name/email/salary
    var empName = document.getElementById("empName").value;
    var email = document.getElementById("email").value;
    var salary = document.getElementById("salary").value;

    // 校验数据是否为空
    if (!empName || !email || !salary) {
        alert("有数据为空，无法添加！");
        return;
    }

    // 创建元素节点
    var tr = document.createElement("tr");

    // 添加子节点
    var empNameTd = "<td>" + empName + "</td>";
    var emailTd = "<td>" + email + "</td>";
    var salaryTd = "<td>" + salary + "</td>";
    var aTd = "<td><a href=\"javascript:;\">Delete</a></td>";
    tr.innerHTML = empNameTd + emailTd + salaryTd + aTd;

    // 为a绑定单击相应函数
    tr.getElementsByTagName("a")[0].onclick = delRow;

    // 将tr添加至table中
    // document.getElementById("employeeTable").appendChild(tr);
    // 注意：浏览器生成的table结构会在内部套一层tbody，为了以防万一，也为了结构一致性和样式一致性，应该将其添加至tbody中
    var employeeTable = document.getElementById("employeeTable");
    var tbody = employeeTable.getElementsByTagName("tbody")[0];
    tbody.appendChild(tr);
}
```

