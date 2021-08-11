> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 滚轮事件与键盘事件

## 1、滚轮事件

### onmousewheel、DOMMouseScroll

`onmousewheel`：鼠标滚轮滚动的事件，会在滚轮滚动时触发，但是火狐不支持该属性

`DOMMouseScroll`：在火狐中使用`DOMMouseScroll`来绑定滚动事件，注意该事件需要通过`addEventListener()`函数来绑定

### event.wheelDelta、event.detail

`event.wheelDelta`：可以获取鼠标滚轮滚动的方向：向上滚（120），向下滚（-120），这个值我们不看大小，只看正负

`event.detail`：`wheelDelta`这个属性火狐中不支持，在火狐中使用`event.detail`来获取滚动的方向：向上滚（-3），向下滚（3）

### return false、event.preventDefault()

当滚轮滚动时，如果浏览器有滚动条，滚动条会随之滚动，这是浏览器的默认行为

如果不希望发生，则可以使用`return false`来取消默认行为

使用`addEventListener()`方法绑定响应函数，取消默认行为时不能使用`return false`，需要使用`event`来取消默认行为

但是 IE8 不支持`event.preventDefault()`这个玩意，如果直接调用会报错

```javascript
window.onload = function() {
    var box1 = document.getElementById("box1");
    box1.onmousewheel = function(event) {
        event = event || window.event;
        // alert(event.wheelDelta); // IE/内置：120/-120；Chrome/Edge：150/-150；Firefox：undefined/undefined
        // alert(event.detail); // IE/内置/Chrome/Edge：0/0；Firefox：-3/3;

        // 当鼠标滚轮向下滚动时，box1变长
        // 当鼠标滚轮向上滚动时，box1变短
        if (event.wheelDelta > 0 || event.detail < 0) {
            box1.style.height = box1.clientHeight - 10 + "px";
        } else {
            if (box1.clientHeight - 10 > 0) {
                box1.style.height = box1.clientHeight + 10 + "px";
            }
        }

        // 使用addEventListener()方法绑定响应函数，取消默认行为时不能使用return false，需要使用event来取消默认行为
        // 但是IE8不支持event.preventDefault()这个玩意，如果直接调用会报错
        event.preventDefault && event.preventDefault();

        // 当滚轮滚动时，如果浏览器有滚动条，滚动条会随之滚动
        // 这是浏览器的默认行为，如果不希望发生，则可以取消默认行为
        return false;
    };
    // 兼容addEventListener
    bind(box1, "DOMMouseScroll", box1.onmousewheel);
}

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

**效果**

![滚动事件](https://i.loli.net/2021/08/09/WJu5XZojepShYEM.gif)



## 2、键盘事件

### onkeydown、onkeyup

![image-20210809225130743](https://i.loli.net/2021/08/09/79VJlsNLoxZhI3j.png)

`onkeydown`按键被按下

- 如果一直按着某个按键不松手，则事件会一直触发
- 连续触发时，第一次和第二次之间会间隔稍微长一点，其他的会非常的快，这种设计是为了防止误操作的发生

`onkeyup`按键被松开

键盘事件一般都会绑定给一些可以获取到焦点的对象或者是`document`

### 键盘事件属性

![image-20210809225738645](https://i.loli.net/2021/08/09/qAb4CpUSj3Di7c6.png)

![image-20210809225838699](https://i.loli.net/2021/08/09/qXIGjQ3OtRbUW6M.png)

可以通过`keyCode`来获取按键的编码，通过它可以判断哪个按键被按下

除了`keyCode`，事件对象中还提供了几个属性`altKey`、`ctrlKey`、`shiftKey`

这个三个用来判断`alt`、`ctrl`和`shift`是否被按下，如果按下则返回`true`，否则返回`false`

**<练习：键盘移动div>**

```javascript
// 定义速度
var speed = 10;
var box1 = document.getElementById("box1");
// 绑定键盘响应事件
document.onkeydown = function(event) {
    event = event || window.event;
    // 按ctrl加速
    speed = event.ctrlKey ? 30 : 10;
    // console.log(event.keyCode); // 左：37；上：38；右：39；下：40
    switch (event.keyCode) {
        // 左移
        case 37:
            box1.style.left = box1.offsetLeft - speed + "px";
            break;
        // 上移
        case 38:
            box1.style.top = box1.offsetTop - speed + "px";
            break;
        // 右移
        case 39:
            box1.style.left = box1.offsetLeft + speed + "px";
            break;
        // 下移
        case 40:
            box1.style.top = box1.offsetTop + speed + "px";
            break;
        default:
            break;
    }
    return false;
}
```

效果

![键盘移动div](https://i.loli.net/2021/08/11/dSiHA8yNQ1KG4tj.gif)

