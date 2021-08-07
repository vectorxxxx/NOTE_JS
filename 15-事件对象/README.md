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

