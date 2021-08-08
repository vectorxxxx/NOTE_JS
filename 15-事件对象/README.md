> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 事件对象

## 1、事件对象

**<前情提要>**

### 事件对象

- 当事件的响应函数被触发时，浏览器每次都会将一个事件对象作为实参传递进响应函数
- 在事件对象中封装了当前事件相关的一切信息，比如：鼠标的坐标、键盘哪个按键被按下、鼠标滚轮滚动的方向。。。

### 事件属性

![image-20210807213954253](https://i.loli.net/2021/08/07/S6DFxRmHP913Wpf.png)

### 鼠标/键盘属性

![image-20210807214712717](https://i.loli.net/2021/08/07/3dX4fLwNvPOQTqt.png)

**<练习1：当鼠标在areaDiv中移动时，在showMsg中来显示鼠标的坐标>**

HTML 代码

```html
<div id="areaDiv"></div>
<div id="showMsg"></div>
```

CSS 代码

```css
#areaDiv {
    border: 1px solid black;
    width: 300px;
    height: 50px;
    margin-bottom: 10px;
}

#showMsg {
    border: 1px solid black;
    width: 300px;
    height: 20px;
}
```

JS 代码

```javascript
var areaDiv = document.getElementById("areaDiv");
var showMsg = document.getElementById("showMsg");
// 绑定鼠标移动事件
areaDiv.onmousemove = function(event){
    console.log(event); // IE8：undefined
    // clientX可以获取鼠标指针的水平坐标
    // cilentY可以获取鼠标指针的垂直坐标
    var x = event.clientX;
    var y = event.clientY;
    showMsg.innerHTML = "x = " + x + ", y = " + y;
}
```

**效果**

内置浏览器

![image-20210807215044666](https://i.loli.net/2021/08/07/xajWs52P6ucgeJT.png)

Chrome

![image-20210807215134476](https://i.loli.net/2021/08/07/CTeUYOWwtb7nrud.png)

Edge

![image-20210807215203532](https://i.loli.net/2021/08/07/w1GrToFaup4YHqM.png)

IE11

![image-20210807215256351](https://i.loli.net/2021/08/07/y6OYWJ8px4GXstB.png)

IE8

![image-20210807215328802](https://i.loli.net/2021/08/07/KigLWZhxl8HmRGe.png)

在IE8中，响应函数被触发时，浏览器不会传递事件对象

在IE8及以下的浏览器中，是将事件对象作为`window`对象的属性保存的

那么按照之前学习到的思路，我们可以对其进行兼容性改造

```javascript
var x;
var y;
if (event) {
    x = event.clientX;
    y = event.clientY;
}
else{
    x = window.event.clientX;
    y = window.event.clientY;
}
showMsg.innerHTML = "x = " + x + ", y = " + y;
```

IE8测试

![image-20210807215801842](https://i.loli.net/2021/08/07/NR8kW6rnpIDGJ7t.png)

感觉上述代码不优雅，对上述代码进行二次改造

```javascript
//if (!event) {
//    event = window.event;
//}
event = event || window.event;
var x = event.clientX;
var y = event.clientY;
```

**<练习2：div跟随鼠标移动>**

```javascript
// 兼容性写法
event = event || window.event;
var left = event.clientX;
var top = event.clientY;
// div随鼠标移动，注意style属性是有单位的
box1.style.left = (left - box1.clientWidth / 2) + "px";
box1.style.top = (top - box1.clientHeight / 2) + "px";
```

![div随鼠标移动](https://i.loli.net/2021/08/07/IUmfarCg3ijND9W.gif)

但是，当我们给body设置一个较大`height`属性值时，会发现一个问题，就是鼠标指针与 div 之间存在一定距离

![div随鼠标移动2](https://i.loli.net/2021/08/07/a5GtzE2NSebVjOq.gif)

这是为什么呢？

- `clientX`和`clientY`用于获取鼠标在当前的可见窗口的坐标 div 的偏移量，是相对于整个页面的
- `pageX`和`pageY`可以获取鼠标相对于当前页面的坐标，但是这个两个属性在IE8中不支持，所以如果需要兼容IE8，则不要使用

```javascript
var left = event.pageX;
var top = event.pageY;
```

再试下效果

![div随鼠标移动3](https://i.loli.net/2021/08/07/hFubIlnwO5drqgS.gif)

貌似好了哈，那直接测试下 IE8？

![image-20210807233339306](https://i.loli.net/2021/08/07/jl4gdbSV8TDOzYW.png)

这要怎么办？

我们现在给 body 设置了一个`height`，红色框表示可见区域大小，蓝色框表示 body 的实际区域大小

![image-20210807233458455](https://i.loli.net/2021/08/07/cQRxbYMKBfoei2L.png)

既然我们没办法使用`pageX`和`pageY`兼容IE8，那暂时只能使用`clientX`和`clientY`了，而`clientX`和`clientY`是按照可见区域大小计算的，那让 div 的水平和垂直偏移量也按照可见区域大小计算不就行了吗？但是我们又暂时没办法让 div 总是参考可见区域大小的原点作为定位的原点，难道就没有办法了吗？

我们之前学习过，`scrollTop`表示滚动条的垂直滚动距离，而div位置原点 与鼠标指针原点的差距应该刚好是滚动条垂直滚动的距离，那么是不是可以利用这两个属性来“弥补” 这两者之间的距离差呢？

```javascript
box1.style.top = (document.body.scrollTop + top - box1.clientHeight / 2) + "px";
```

![div随鼠标移动4](https://i.loli.net/2021/08/07/XyiUOtdpuez3cws.gif)

发现还是不行，要知道我们是给 body 设置的`height`属性，之所以出现滚动条是因为 body 的父元素容不下 body 了，所以应该获取谁的`scrollTop`属性？body 的父元素，即 html

```javascript
box1.style.top = (document.documentElement.scrollTop + top - box1.clientHeight / 2) + "px";
```

Chrome

![div随鼠标移动6](https://i.loli.net/2021/08/08/LVJUElaz5RI6PG9.gif)

IE8

![div随鼠标移动5](https://i.loli.net/2021/08/08/SAzFPq8tjyUG7Oc.gif)

---

在视频中，测试的结果是Chrome和火狐等浏览器获取`scrollTop`的对象不一致，需要做兼容

> chrome认为浏览器的滚动条是body的，可以通过body.scrollTop来获取火狐等浏览器认为浏览器的滚动条是html的，

```javascript
var st = document.body.scrollTop || document.documentElement.scrollTop;
```

但是不知道什么原因（浏览器对`scrollTop`和`scrollLeft`都统一兼容了？毕竟视频是几年前的了），我这里并没有这个问题，所以上述问题存疑，待考究，后面以我实际代码测试结果为准

---

同理，当水平方向有滚动条时，也要消除水平方向上的距离差，所以综合代码如下

```javascript
box1.style.left = (document.documentElement.scrollLeft + left - box1.clientWidth / 2) + "px";
box1.style.top = (document.documentElement.scrollTop + top - box1.clientHeight / 2) + "px";
```

我这里通过`documentElement`获取的`scrollLeft`和`scrollTop`在 Chrome、Edge、IE11、IE8 中均正常



## 2、事件的冒泡（Bubble）

HTML 代码

```html
<div id="box1">
    我是div 
    <span id="s1">
        我是span
    </span>
</div>
```

CSS 代码

```css
#box1{
    width:200px;
    height:	200px;
    background-color: #99FF99;
}
#s1{
    background-color: yellowgreen;
}
```

JS 代码

```javascript
document.getElementById("s1").onclick = function(){
    alert("我是span"); // 我是span 我是div 我是body 我是HTML
};
document.getElementById("box1").onclick = function(){
    alert("我是div"); // 我是div 我是body 我是HTML
};
document.body.onclick = function(){
    alert("我是body"); // 我是body 我是HTML
};
document.documentElement.onclick = function(){
    alert("我是HTML"); // 我是HTML
};
```

所谓的**冒泡**指的就是事件的向上传导，当后代元素上的事件被触发时，其祖先元素的相同事件也会被触发

在开发中大部分情况冒泡都是有用的，如果不希望发生事件冒泡可以通过事件对象来**取消冒泡**

可以将事件对象的`cancelBubble`设置为`true`，即可取消冒泡

```javascript
document.getElementById("s1").onclick = function(event){
    // 兼容event
    event = event || window.event;
    alert("我是span"); // 我是span
    event.cancelBubble = true;
};
```



## 3、事件的委派（Delegate）

HTML 代码

```html
<button type="button" id="btn">Add</button>
<ul id="ulDiv">
    <li><a href="javascript:;">超链接1</a></li>
    <li><a href="javascript:;">超链接2</a></li>
    <li><a href="javascript:;">超链接3</a></li>
</ul>
```

JS 代码

```javascript
function clickFun(){
    alert("超链接");
}

window.onload = function(){
    // 为每一个超链接都绑定一个单击响应函数
    var aList = document.getElementsByTagName("a");
    for(var i=0;i<aList.length;i++){
        aList[i].onclick = clickFun;
    }
    var btn = document.getElementById("btn");
    var ulDiv = document.getElementById("ulDiv");
    btn.onclick = function(){
        var li = document.createElement("li");
        li.innerHTML = "<a href=\"javascript:;\">add超链接</a>";
        ulDiv.appendChild(li);
    };
};
```

这里我们为每一个超链接都绑定了一个单击响应函数，这种操作比较麻烦

而且这些操作只能为已有的超链接设置事件，而新添加的超链接必须重新绑定

我们希望，只绑定一次事件，即可应用到多个的元素上，即使元素是后添加的

我们可以尝试将其绑定给元素的共同的祖先元素

```javascript
ulDiv.onclick = function(){
    alert("事件委派超链接");
};
```

**事件委派**是指将事件统一绑定给元素的共同的祖先元素

这样当后代元素上的事件触发时，会一直冒泡到祖先元素，从而通过祖先元素的响应函数来处理事件

<mark>事件委派是利用了冒泡，通过委派可以减少事件绑定的次数，提高程序的性能</mark>

但是也有个问题，我们是给整个 ul 绑定的单击响应事件，ul 是块元素，在超链接所在行点击任何位置都会触发事件

![事件委派](https://i.loli.net/2021/08/08/ZOPGilX97kR4Ugp.gif)

那怎么办呢？我们就需要再加一层判断： 如果触发事件的对象是我们期望的元素，则执行否则不执行

那怎么知道触发事件的对象是什么呢？

![image-20210808143058357](https://i.loli.net/2021/08/08/jw2lTFGr95CqIOp.png)

```javascript
ulDiv.onclick = function(event){
    event = event || window.event;
    // 如果触发事件的对象是我们期望的元素，则执行否则不执行
    // alert(event.target); // 点击超链接外：[object HTMLLIElement]; 点击超链接：javascript:;
    if(event.target.className == "link"){
        alert("事件委派超链接");
    }
};
```

但是这种写法有点问题，当其`class`属性有多个时，就不对了

```html
<li><a href="javascript:;" class="link hello">超链接1</a></li> <!-- 失效 -->
<li><a href="javascript:;" class="link">超链接2</a></li>
<li><a href="javascript:;" class="link">超链接3</a></li>
```

我这里将`tagName`代替`className`作为判断条件进行判断

```javascript
ulDiv.onclick = function(event){
    event = event || window.event;
    if(event.target.tagName == "A" || event.target.tagName == "a"){
        alert("事件委派超链接");
    }
};
```



## 4、事件的绑定（Bind）

### on事件名

使用`对象.事件 = 函数`的形式绑定响应函数，它只能同时为一个元素的一个事件绑定一个响应函数

不能绑定多个，如果绑定了多个，则后边会覆盖掉前边的

```javascript
var btn = document.getElementById("btn");
// 为btn绑定一个单击响应函数
btn.onclick = function() {
    alert(1);
};
// 为btn绑定第二个响应函数
btn.onclick = function() {
    alert(2); // 2
};
```

### addEventListener()

`addEventListener()`通过这个方法也可以为元素绑定响应函数，参数：

- 事件的字符串，不要`on`
- 回调函数，当事件触发时该函数会被调用
- 是否在捕获阶段触发事件，需要一个布尔值，一般都传`false`

使用`addEventListener()`可以同时为一个元素的相同事件同时绑定多个响应函数

这样当事件被触发时，响应函数将会按昭函数的绑定顺序执行

```javascript
btn.addEventListener("click", function(){
    alert(1); // 1
}, false);
btn.addEventListener("click", function(){
    alert(2); // 2
}, false);
btn.addEventListener("click", function(){
    alert(3); // 3
}, false);
```

我们直接在 IE8 中进行测试，这个方法不支持IE8及以下的浏览器

![image-20210808145926568](https://i.loli.net/2021/08/08/jwZJmRWSBVPGDoq.png)

那说了半天，IE8 需要用什么方法替代呢？

### attachEvent()

`attachEvent()`在 IE8 中可以用来绑定事件，参数：

- 事件的字符串，要`on`
- 回调函数

```javascript
btn.attachEvent("onclick", function(){
    alert(1); // 1
});
btn.attachEvent("onclick", function(){
    alert(2); // 2
});
btn.attachEvent("onclick", function(){
    alert(3); // 3
});
```

继续测试，在 IE8 中没有报错，但是执行顺序却是相反的，而且其他浏览器中直接就不行了

![image-20210808152803255](https://i.loli.net/2021/08/08/VvUikjuLbZYtNDa.png)

**总结：** 这个方法也可以同时为一个事件绑定多个处理函数，不同的是它是后绑定先执行，执行顺序和`addEventListener()`相反

看起来，我们还是要自己封装一个方法来兼容不同的浏览器

```javascript
// 定义一个函数，用来为指定元素绑定响应函数
// 参数：
// - obj 要绑定事件的对象
// - eventStr 事件的字符串
// - callback 回调函数
function bind(obj, eventStr, callback) {
    if (obj.addEventListener) {
        obj.addEventListener(eventStr, callback, false);
    } else {
        obj.attachEvent("on" + eventStr, callback);
    }
}
```

我们调用下只能自定义的`bind`函数

```javascript
bind(btn, "click", function() {
    alert(1);
});
```

测试下效果，发现在 IE8 和其他浏览器中均支持

![image-20210808152623132](https://i.loli.net/2021/08/08/lq3zWmyGifCoJAd.png)

好，我们接着再看个问题

```javascript
bind(btn, "click", function() {
    alert(this); // IE8: [object window]；非IE8：[object HTMLButtonElement]
});
```

测试发现，在 Chrome 中打印的是`[object HTMLButtonElement]`

![image-20210808152944028](https://i.loli.net/2021/08/08/mwWtAioF8I7dB1p.png)

而在 IE8 中打印的却是`[object window]`

![image-20210808153020678](https://i.loli.net/2021/08/08/WAIZ1lkUwOD4baQ.png)

`addEventListener()`中的`this`是绑定事件的对象，`attachEvent()`中的`this`是`window`，需要统一两个方法`this`

我们之前讲过`call`和`apply`方法，`this`是指定的那个对象，是不是可以利用`call`或者`apply`方法对`bind`函数进行优化呢？

```javascript
function bind(obj, eventStr, callback) {
    if (obj.addEventListener) {
        obj.addEventListener(eventStr, callback, false);
    } else {
        // this是谁由调用方式决定
        // callback.call(obj)
        obj.attachEvent("on" + eventStr, function(){
            // 在匿名函数中调用回调函数
            callback.call(obj);
        });
    }
}
```



## 5、事件的传播

关于事件的传播网景公司和微软公司有不同的理解

- 微软公司认为事件应该是由内向外传播，也就是当事件触发时，应该先触发当前元素上的事件，然后再向当前元素的祖先元素上传播，也就说件应该在 **冒泡阶段** 执行
- 网景公司认为事件应该是由外向内传播的，也就是当前事件触发时，应该先触发当前元素的最外层的祖先元素的事件，然后在向内传播给后代元素
- W3C综合了两个公司的方案，将事件传播分成了三个阶段
  1. **捕获阶段**：在捕获阶段时从最外层的祖先元素，向目标元素进行事件的捕获，但是默认此时不会触发事件
  2. **目标阶段**：事件捕获到目标元素，捕获结束开始在目标元素上触发事件
  3. **冒泡阶段**：事件从目标元素向他的祖先元素传递，依次触发祖先元素上的事件

![image-20210808155725476](https://i.loli.net/2021/08/08/8ksUo7nPCiyAGVL.png)

如果希望在捕获阶段就触发事件，可以将`addEventListener()`的第三个参数设置为`true`

一般情况下我们不会希望在捕获阶段触发事件，所以这个参数一般都是`false`

IE8 及以下的浏览器中没有捕获阶段



## 6、拖拽

### 拖拽的流程

1. 当鼠标在被拖拽元素上按下时，开始拖拽 `onmousedown`
2. 当鼠标移动时被拖拽元素跟随鼠标移动 `onmousemove`
3. 当鼠标松开时，被拖拽元素固定在当前位置 `onmouseup`

![image-20210808160841285](https://i.loli.net/2021/08/08/qKwpCAOUmJnGZj3.png)

HTML 代码

```html
<div id="box1"></div>
<div id="box2"></div>
```

CSS 代码

```css
#box1 {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
}
#box2 {
    width: 100px;
    height: 100px;
    background-color: yellow;
    position: absolute;
    left: 300px;
    top: 300px;
}
```

JS 代码

```javascript
var box1 = document.getElementById("box1");
// 1. 当鼠标在被拖拽元素上按下时，开始拖拽 `onmousedown`
box1.onmousedown = function(event) {
    event = event || window.event;
    var boxLeft = event.clientX - box1.offsetLeft; // 鼠标水平坐标 - 元素水平偏移量 = 鼠标原点和元素原点水平距离
    var boxTop = event.clientY - box1.offsetTop; // 鼠标垂直坐标 - 元素垂直偏移量 = 鼠标原点和元素原点垂直距离
    // 2. 当鼠标移动时被拖拽元素跟随鼠标移动 `onmousemove`
    document.onmousemove = function(event) {
        event = event || window.event;
        box1.style.left = event.clientX - boxLeft + "px";
        box1.style.top = event.clientY - boxTop + "px";
    };
    // 3. 当鼠标松开时，被拖拽元素固定在当前位置 `onmouseup`
    document.onmouseup = function(event) {
        // 取消document的onmousemove事件
        document.onmousemove = null;
        // 取消document的onmouseup事件
        document.onmouseup = null;
    };
};
```

效果

![拖拽](https://i.loli.net/2021/08/08/EU7ZCnrgJ1DjTQO.gif)

当我们拖拽一个网页中的内容时，浏览器会默认去搜索引擎中搜索内容，此时会导致拖拽功能的异常，这个是浏览器提供的默认行为

![拖拽1](https://i.loli.net/2021/08/08/msd5ohLVjrQB2UJ.gif)

如果不希望发生这个行为，则可以通过`return false`来取消默认行为

![拖拽2](https://i.loli.net/2021/08/08/rtNSke1Ja9pxZFY.gif)

但是这招对 IE8 不起作用

![拖拽3](https://i.loli.net/2021/08/08/JQpf5zyIGXWmBHi.gif)

那有什么方法可以兼容 IE8 呢？我们先接着往下看

### setCapture()

```javascript
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");

btn1.onclick = function() {
    alert(1);
}
btn2.onclick = function() {
    alert(2);
}
// 设置btn1对鼠标按下相关的事件进行捕获
// 当调用一个元素的setCapture()方法以后，这个元素将会把下一次所有的鼠标按下相关的事件捕获到自身上
btn1.setCapture();
```

我们点击 btn2 按钮，发现只有刷新后的第一次点击的提示为1，再次点击就变成了2

![image-20210808182709374](https://i.loli.net/2021/08/08/ObPKuogN5QmfdSc.png)

我们可以利用`setCapture()`方法对 IE8 浏览器的默认行为进行限制吗？当拖拽元素时捕获事件，取消拖拽时释放对事件的捕获

```javascript
var box1 = document.getElementById("box1");
// 1. 当鼠标在被拖拽元素上按下时，开始拖拽 `onmousedown`
box1.onmousedown = function(event) {
    // 设置box1捕获所有鼠标按下的事件
    // 只有IE支持，但是在火狐中调用时不会报错，而如果使用Chrome调用，会报错
    box1.setCapture && box1.setCapture();

    event = event || window.event;
    var boxLeft = event.clientX - box1.offsetLeft; // 鼠标水平坐标 - 元素水平偏移量 = 鼠标原点和元素原点水平距离
    var boxTop = event.clientY - box1.offsetTop; // 鼠标垂直坐标 - 元素垂直偏移量 = 鼠标原点和元素原点垂直距离
    // 2. 当鼠标移动时被拖拽元素跟随鼠标移动 `onmousemove`
    document.onmousemove = function(event) {
        event = event || window.event;
        box1.style.left = event.clientX - boxLeft + "px";
        box1.style.top = event.clientY - boxTop + "px";
    };
    // 3. 当鼠标松开时，被拖拽元素固定在当前位置 `onmouseup`
    document.onmouseup = function(event) {
        // 取消document的onmousemove事件
        document.onmousemove = null;
        // 取消document的onmouseup事件
        document.onmouseup = null;
        // 当鼠标松开时，取消对事件的捕获
        box1.releaseCapture && box1.releaseCapture();
    };
    // 取消默认行为
    return false;
};
```

测试在 IE8 中的效果

![拖拽4](https://i.loli.net/2021/08/08/YBMmdCHDiVaA4Gt.gif)

如果我想拖动 div2呢？这个时候我们需要封装一个函数，方便我们直接传参调用

```javascript
// 拖拽方法封装成一个函数
function draw(obj){
    obj.onmousedown = function(event) {
        obj.setCapture && obj.setCapture();
        event = event || window.event;
        var boxLeft = event.clientX - obj.offsetLeft;
        var boxTop = event.clientY - obj.offsetTop;
        document.onmousemove = function(event) {
            event = event || window.event;
            obj.style.left = event.clientX - boxLeft + "px";
            obj.style.top = event.clientY - boxTop + "px";
        };
        document.onmouseup = function(event) {
            document.onmousemove = null;
            document.onmouseup = null;
            obj.releaseCapture && obj.releaseCapture();
        };
        return false;
    };
}
```

HTML 代码

```html
<div id="box1"></div>
<div id="box2"></div>
<img src="img/an.jpg" id="img" style="width: 320px;height: 320px;position: absolute;left:200px;top:400px;"/>
```

JS 代码调用函数

```javascript
var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var img = document.getElementById("img");
draw(box1);
draw(box2);
draw(img);
```

**效果**

Chrome

![拖拽5](https://i.loli.net/2021/08/08/1KmQDalbfAInJCS.gif)

IE8

![拖拽6](https://i.loli.net/2021/08/08/mu7tgS9HpsIzojf.gif)
