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

  

