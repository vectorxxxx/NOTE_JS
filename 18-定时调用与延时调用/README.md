> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 定时调用与延时调用

## 1、定时调用

![](https://i.loli.net/2021/08/11/qMQa3pymCtWTG2F.png)

JS 的程序的执行速度是非常非常快的如果希望一段程序，可以每间隔一段时间执行一次，可以使用定时调用

### setInterval()

定时调用，可以将一个函数，每隔一段时间执行一次

参数：

1. 回调函数，该函数会每隔一段时间被调用一次
2. 每次调用间隔的时间，单位是毫秒

返回值：返回一个`Number`类型的数据，这个数字用来作为定时器的唯一标识

```javascript
var num = 1;
info = document.getElementById("info");
setInterval(function(){
    info.innerHTML = num++;
}, 1000);
```

![setInterval](https://i.loli.net/2021/08/11/hT39yeQGAH4j7EV.gif)



```javascript
setInterval(function(){
    info.innerHTML = num++;
}, 100);
```

![setInterval-2](https://i.loli.net/2021/08/11/z6Y39hEmTsvxOSf.gif)

### clearInterval()

可以用来关闭一个定时器，方法中需要一个定时器的标识作为参数，这样将关闭标识对应的定时器

```javascript
var timer = setInterval(function(){
    info.innerHTML = num++;
    if(num > 100){
        clearInterval(timer);
    }
}, 10);
```

![clearInterval](https://i.loli.net/2021/08/11/Wb3LsuBa8CyNfnP.gif)

### <练习1：定时图片切换>

HTML 代码

```html
<img src="img/1.jpg" id="img" /><br>
<button type="button" id="btnStart">开始</button>
<button type="button" id="btnEnd">结束</button>
```

JS 代码

```javascript
var btnStart = document.getElementById("btnStart");
var btnEnd = document.getElementById("btnEnd");
var img = document.getElementById("img");
// 设置轮播图片数组
var imgArr = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"];
// 设置轮播图片索引
var index = 0;
// 为开始按钮绑定单击响应函数
var timer;
btnStart.onclick = function() {
    // 清除上一个定时器
    clearInterval(timer);
    // 设置定时器
    timer = setInterval(function() {
        // 切换图片
        img.src = imgArr[index++];
        // 判断索引是否超过最大索引
        index %= imgArr.length;
    }, 500);
};
// 为结束按钮绑定单击响应函数
btnEnd.onclick = function() {
    clearInterval(timer);
};
```

**效果**

![定时切换图片](https://i.loli.net/2021/08/12/fU8l49bFTtcRyOk.gif)

**注意点一：循环切换图片**

当索引超过最大索引时，需要将索引重置，以达到轮播图片之目的

```javascript
// if(index >= imgArr.length){
//     index = 0;
// }
index %= imgArr.length;
```

**注意点二：不点击开始，而直接点击结束**

`clearInterval()`可以接收任意参数

- 如果参数是一个有效的定时器的标识，则停止对应的定时器
- 如果参数不是一个有效的标识，则什么也不做

即使没有点开始，timer 为 undefined 也不会报错，可以放心大胆的去使用

**注意点三：多次点击开始按钮导致切换速度过快问题** 

目前，我们每点击一次按钮，就会开启一个定时器，点击多次就会开启多个定时器

这就导致图片的切换速度过快，并且我们只能关闭最后一次开启的定时器

在开启定时器之前，需要将当前元素上的其他定时器关闭

### <练习2：div移动优化>

```javascript
// 定义速度
var speed = 20;
// 定义方向
var direct = 0;
// 定时器只控制方向
setInterval(function(){
    switch (direct) {
        case 37:
            box1.style.left = box1.offsetLeft - speed + "px";
            break;
        case 38:
            box1.style.top = box1.offsetTop - speed + "px";
            break;
        case 39:
            box1.style.left = box1.offsetLeft + speed + "px";
            break;
        case 40:
            box1.style.top = box1.offsetTop + speed + "px";
            break;
        default:
            break;
    }
}, 50);
// 键盘按下控制速度
var box1 = document.getElementById("box1");
document.onkeydown = function(event) {
    event = event || window.event;
    // 修改速度
    speed = event.ctrlKey ? 50 : 20;
    // 捕获方向
    direct = event.keyCode;
    return false;
};
// 键盘松开清空速度和方向
document.onkeyup = function(event){
    direct = 0;
}
```

**效果**

![div移动优化](https://i.loli.net/2021/08/13/VbFKmQ7BwIhRpLO.gif)

**优化思路**

- 定时器控制方向，键盘按下控制速度和捕获方向，键盘松开清空速度和方向

这就好比一辆汽车，速度就像汽车的油门，定时器就像汽车的方向盘，而键盘就像汽车的离合和档位

油门一直在踩着，发动机就一直匀速运转，就能保证速度一直存在，启动或转向就不会出现卡顿的现象

当键盘按下时，就是松离合换挡位；当键盘松开时，就是踩离合

不过，跟现实世界不同的是，JS 的世界没有惯性，所以只要松离合，div 就不会再移动了



## 2、延时调用

### setTimeout()、clearTimeout()

延时调用，延时调用一个函数不马上执行，而是隔一段时间以后在执行，而且只会执行一次

延时调用和定时调用的区别：定时调用会执行多次，而延时调用只会执行一次

延时调用和定时调用实际上是可以互相代替的，在开发中可以根据自己需要去选择

```javascript
var num = 1;
var timer = setInterval(function(){
 	console.log(num++); // 1 2 3 4 5 ...
}, 1000);
var timer = setTimeout(function(){
    console.log(num++); // 1
}, 1000);
clearTimeout(timer);
```



## 3、定时器的应用（一）

### <练习：点击按钮div移动>

HTML 代码

```html
<button type="button" id="btn1">点击按钮box1向右移动</button>
<button type="button" id="btn2">点击按钮box1向左移动</button>
<br><br>
<div id="box1"></div>
<div id="line"></div>
```

CSS 代码

```css
* {
    margin: 0;
    padding: 0;
}

#box1 {
    width: 100px;
    height: 100px;
    background-color: red;
    /* 开启定位 */
    position: absolute;
    left: 0;
    top: 0;
}

#line {
    width: 0;
    height: 1000px;
    border: 1px solid black;
    position: absolute;
    top: 0;
    left: 800px;
    left: 0;
    top: 200px;
}
```

JS 代码

```javascript
// 自定义兼容所有浏览器获取元素样式的方法
function getStyle(obj, name) {
    return window.getComputedStyle ? getComputedStyle(obj, null)[name] : obj.currentStyle[name];
}
window.onload = function() {
    var timer;
    var speed = 19;
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var box1 = document.getElementById("box1");
    btn1.onclick = function() {
        // 清空上一个定时器
        clearInterval(timer);
        // 设置定时器
        timer = setInterval(function() {
            // 获取旧值
            var oldValue = parseInt(getStyle(box1, "left"));
            // 获取新值
            var newValue = oldValue + speed;
            // 当达到一定值时停下来
            newValue = newValue > 800 ? 800 : newValue;
            // 赋新值
            box1.style.left = newValue + "px";
            // 当值不再变化时，清空定时器
            if(newValue == 800){
                clearInterval(timer);
            }
        }, 50);
    };
    btn2.onclick = function() {
        // 清空上一个定时器
        clearInterval(timer);
        // 设置定时器
        timer = setInterval(function() {
            // 获取旧值
            var oldValue = parseInt(getStyle(box1, "left"));
            // 获取新值
            var newValue = oldValue - speed;
            // 当达到一定值时停下来
            newValue = newValue < 0 ? 0 : newValue;
            // 赋新值
            box1.style.left = newValue + "px";
            // 当值不再变化时，清空定时器
            if(newValue == 0){
                clearInterval(timer);
            }
        }, 50);
    };
}
```

![点击按钮div移动](https://i.loli.net/2021/08/14/JACEzyY3qvwm2Bh.gif)

### 优化1：封装移动方法

```javascript
// 封装移动方法
// obj：要执行动画的对象
// target：执行动画的目标位置
// speed：移动的速度（正数向右移动，负数向左移动）
var timer;
function move(obj, target, speed) {
    clearInterval(timer);
    timer = setInterval(function() {
        var oldValue = parseInt(getStyle(obj, "left"));
        var newValue = oldValue + speed;
        newValue = speed > 0 ? (newValue > target ? target : newValue) : (newValue < target ? target : newValue);
        obj.style.left = newValue + "px";
        if (newValue == target) {
            clearInterval(timer);
        }
    }, 50);
}
```

### 优化2：智能判断方向

```javascript
function move(obj, target, speed) {
    clearInterval(timer);
    var current = parseInt(getStyle(obj, "left"));
    // 智能判断方向
    speed = target < current ? -speed : speed;
    timer = setInterval(function() {
        var oldValue = parseInt(getStyle(obj, "left"));
        var newValue = oldValue + speed;
        newValue = speed > 0 ? (newValue > target ? target : newValue) : (newValue < target ? target : newValue);
        obj.style.left = newValue + "px";
        if (newValue == target) {
            clearInterval(timer);
        }
    }, 50);
}
```

### 优化3：消除多个div影响

![点击按钮div移动2](https://i.loli.net/2021/08/14/miVw4jqu2n6MQR9.gif)

目前我们的定时器的标识由全局变量 timer 保存，所有的执行正在执行的定时器都在这个变量中保存

那么我们就不能定义全局的了，而是需要向执行动画的对象中添加一个 timer 属性，用来保存它自己的定时器的标识

```javascript
function move(obj, target, speed) {
    clearInterval(obj.timer);
    var current = parseInt(getStyle(obj, "left"));
    // 智能判断速度的方向
    speed = target < current ? -speed : speed;
    obj.timer = setInterval(function() {
        var oldValue = parseInt(getStyle(obj, "left"));
        var newValue = oldValue + speed;
        newValue = speed > 0 ? (newValue > target ? target : newValue) : (newValue < target ? target :
                                                                          newValue);
        obj.style.left = newValue + "px";
        if (newValue == target) {
            clearInterval(obj.timer);
        }
    }, 50);
}
```

![点击按钮div移动3](https://i.loli.net/2021/08/14/Lf2lukSN8IHzPhd.gif)

这样，执行动画的对象之间就不会再互相产生影响了

### 优化4：支持多属性

只需要将`left`相关的属性改为变量传入

```javascript
// obj：要执行动画的对象
// attr：要执行动画的样式
// target：执行动画的目标位置
// speed：移动的速度（正数向右移动，负数向左移动）
function move(obj, attr, target, speed) {
    clearInterval(obj.timer);
    var current = parseInt(getStyle(obj, attr));
    // 智能判断速度的方向
    speed = target < current ? -speed : speed;
    obj.timer = setInterval(function() {
        var oldValue = parseInt(getStyle(obj, attr));
        var newValue = oldValue + speed;
        newValue = speed > 0 ? (newValue > target ? target : newValue) : (newValue < target ? target :
                                                                          newValue);
        obj.style[attr] = newValue + "px";
        if (newValue == target) {
            clearInterval(obj.timer);
        }
    }, 50);
}
```

调用修改后的函数

```javascript
btn1.onclick = function() {
    move(box1, "left", 800, speed);
};
btn2.onclick = function() {
    move(box1, "left", 0, speed);
};
btn3.onclick = function() {
    move(box2, "top", 500, speed);
};
btn4.onclick = function() {
    move(box3, "height", 500, speed);
};
```

![点击按钮div移动4](https://i.loli.net/2021/08/14/dtqMlPFViU5Jbv7.gif)

### 优化5：添加回调函数

```javascript
// obj：要执行动画的对象
// attr：要执行动画的样式
// target：执行动画的目标位置
// speed：移动的速度（正数向右移动，负数向左移动）
// callback：回调函数
function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer);
    var current = parseInt(getStyle(obj, attr));
    // 智能判断速度的方向
    speed = target < current ? -speed : speed;
    obj.timer = setInterval(function() {
        var oldValue = parseInt(getStyle(obj, attr));
        var newValue = oldValue + speed;
        newValue = speed > 0 ? (newValue > target ? target : newValue) : (newValue < target ? target :
                                                                          newValue);
        obj.style[attr] = newValue + "px";
        if (newValue == target) {
            clearInterval(obj.timer);
            callback && callback(); // 即使不传回调函数也不会报错
        }
    }, 50);
}
```

调用回调函数

```javascript
btn4.onclick = function() {
    move(box3, "height", 500, speed, function(){
        move(box3, "width", 500, speed, function(){
            move(box3, "height", 100, speed, function(){
                move(box3, "width", 100, speed, function(){

                });
            });
        });
    });
};
```

![点击按钮div移动5](https://i.loli.net/2021/08/14/rUgXBfkOHbAueRN.gif)

### 优化6：封装JS文件

新建 js 文件夹，新建 tools.js 文件，复制 move 相关方法

```javascript
// 自定义兼容所有浏览器获取元素样式的方法
function getStyle(obj, name) {
	return window.getComputedStyle ? getComputedStyle(obj, null)[name] : obj.currentStyle[name];
}
// 封装移动方法
// obj：要执行动画的对象
// attr：要执行动画的样式
// target：执行动画的目标位置
// speed：移动的速度
// callback：回调函数
function move(obj, attr, target, speed, callback) {
	clearInterval(obj.timer);
	var current = parseInt(getStyle(obj, attr));
	speed = target < current ? -speed : speed;
	obj.timer = setInterval(function() {
		var oldValue = parseInt(getStyle(obj, attr));
		var newValue = oldValue + speed;
		newValue = speed > 0 ? (newValue > target ? target : newValue) : (newValue < target ? target :
			newValue);
		obj.style[attr] = newValue + "px";
		if (newValue == target) {
			clearInterval(obj.timer);
			callback && callback();
		}
	}, 50);
}
```

最后再引入 js 文件，大功告成

```html
<script src="js/tools.js" type="text/javascript" charset="utf-8"></script>
```



## 4、定时器应用（二）

### <练习：轮播图>

HTML 代码

```html
<div id="outer">
    <ul id="pic-list">
        <li><img src="img/1.jpg" /></li>
        <li><img src="img/2.jpg" /></li>
        <li><img src="img/3.jpg" /></li>
        <li><img src="img/4.jpg" /></li>
        <li><img src="img/5.jpg" /></li>
        <li><img src="img/1.jpg" /></li>
    </ul>
    <ul id="nav-list">
        <li><a href="javascript:;"></a></li>
        <li><a href="javascript:;"></a></li>
        <li><a href="javascript:;"></a></li>
        <li><a href="javascript:;"></a></li>
        <li><a href="javascript:;"></a></li>
    </ul>
</div>
```

CSS 代码

```css
/* 去除浏览器默认样式 */
* {
	margin: 0;
	padding: 0;
}

ul {
	list-style: none;
}

a{
	text-decoration: none;
}

/* 总体布局 */
#outer {
	width: 500px;
	height: 332px;
	margin: 100px auto;
	box-shadow: 10px 10px 5px rgba(0, 0, 0, .2);
	position: relative;
	overflow: hidden;
}

/* 轮播图片 */
#pic-list {
	width: 2550px;
	position: absolute;
	left: 0;
	top: 0;
	/* 添加过渡效果 */
	/* transition: left 0.3s; */
}

#pic-list li {
	float: left;
	margin-right: 10px;
}

/* 轮播按钮 */
#nav-list {
	position: absolute;
	left: 187.5px;
	bottom: 10px;
}

#nav-list li{
	float: left;
	width: 15px;
	height: 15px;
	background-color: red;
	opacity: 0.5;
	margin: 0 5px;
}

#nav-list a:hover{
	background-color: black;
}

#nav-list li a{
	display: block;
	height: 100%;
	line-height: 100%;
}
```

JS 代码

```js
window.onload = function() {
    var outer = document.getElementById("outer");
    var picList = document.getElementById("pic-list");
    var imgArr = document.getElementsByTagName("img");
    var navList = document.getElementById("nav-list");
    var aArr = document.getElementsByTagName("a");
    var index = 0;
    
    // 动态调整picList的宽度，以自适应图片的数量变化
    picList.style.width = (outer.clientWidth + 10) * imgArr.length + "px";
    // 动态调整navList的水平偏移量
    navList.style.left = (outer.clientWidth - 25 * aArr.length) / 2 + "px";
    // 设置第一个轮播按钮悬浮颜色
    aArr[index].style.backgroundColor = "black";

    // 点击按钮切换图片
    for (var i = 0; i < aArr.length; i++) {
        aArr[i].index = i;
        aArr[i].onclick = function() {
            // 设置index
            index = this.index;
            // 清空定时器
            clearInterval(timer);
            move(picList, "left", -(outer.clientWidth + 10) * index, 100, function() {
                // 开启定时器
                autoSwitch();
            });
            setColor();
        };
    }

    autoSwitch();

    // 自动切换图片
    var timer;
    function autoSwitch() {
        timer = setInterval(function() {
            index++;
            index %= imgArr.length;
            move(picList, "left", -(outer.clientWidth + 10) * index, 100, function() {
                if (index >= imgArr.length - 1) {
                    picList.style.left = "0px";
                }
                setColor();
            });
        }, 3000);
    }

    // 设置轮播按钮悬浮颜色
    function setColor() {
        // 重置所有轮播按钮颜色：由于修改的是内联样式，优先级较高，会把css样式覆盖，导致悬浮效果失效
        // 那么这里不使用内联样式，将其置为空，这样就会找css样式
        for (var i = 0; i < aArr.length; i++) {
            aArr[i].style.backgroundColor = "";
        }
        index %= aArr.length;
        aArr[index].style.backgroundColor = "black";
    }
};
```

![轮播图](https://i.loli.net/2021/08/14/YqVdsO9umlE4krF.gif)



## 5、类的操作

### 修改class属性

HTML 代码

```html
<button type="button" id="btn1">点击按钮修改box1样式</button>
<br><br>
<div id="box1" class="b1"></div>
```

CSS 代码

```css
.b1{
    width: 100px;
    height: 100px;
    background-color: red;
}
```

JS 代码

```js
box1.style.width = "200px";
box1.style.height = "200px";
box1.style.backgroundColor = "yellow";
```

通过`style`属性来修改元素的样式，每修改一个样式，浏览器就需要重新渲染一次页面

这样执行的性能是比较差的，而且这种形式当我们要修改多个样式时，也不太方便

**那怎么办呢？**

我们可以先事先定义好一个 class 属性，里面写好我们需要变化的样式

```css
.b2{
    width: 200px;
    height: 200px;
    background-color: yellow;
}
```

然后在 JS 中修改`className`属性即可

```js
box1.className = "b2";
```

效果是一样的

![修改class属性](https://i.loli.net/2021/08/14/bWHfjL8iD2SAazQ.gif)

我们可以通过修改元素的`class`属性来间接的修改样式

这样一来，我们只需要修改一次，即可同时修改多个样式

浏览器只需要重新渲染页面一次，性能比较好，并且这种方式，可以使表现和行为进一步的分离

### 添加class属性

我们可以在此样式基础之上，定义一个函数，用来向一个元素中添加指定的 class 属性值

```js
// 参数：
// obj 要添加class属性的元素
// cn  要添加的class值
function addClass(obj, cn){
    obj.className += " " + cn;
}
```

```js
//.b3{
//    position: absolute;
//    left: 100px;
//}
addClass(box1, "b3");
```

![添加class属性](https://i.loli.net/2021/08/15/XwOz4VmKWD6GJh5.gif)

但是也存在一个问题，虽然从效果上来看没有什么不同，但多次点击后会重复添加相同的 class 属性，而这个操作是多余的

![类的操作3](https://i.loli.net/2021/08/15/rO9wiP2nUtdhAsC.gif)

我们就需要在写一个函数来判断是否已经存在 class 属性

```js
function hasClass(obj, cn) {
    // return obj.className.indexOf(cn) != -1;
    var reg = new RegExp("\\b"+cn+"\\b");
    return reg.test(obj.className);
}
function addClass(obj, cn) {
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}
```

![类的操作4](https://i.loli.net/2021/08/15/XQ6xkV7ZEAUDMHg.gif)

### 删除class属性

删除一个元素中的指定的 class 属性

```js
function removeClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "");
}
```

![删除class属性](https://i.loli.net/2021/08/15/lh7omcWbgUtYIxp.gif)

### 切换class属性

```js
// toggleClass可以用来切换一个类
// 如果元素中具有该类，则删除
// 如果元素中没有该类，则添加
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}
```

![ 切换class属性](https://i.loli.net/2021/08/15/rYVGuIyRxjhFJWf.gif)

### <练习：二级菜单>

HTML 代码

```html
<div id="my_menu" class="sdmenu">
    <div>
        <span class="menuSpan">在线工具</span>
        <a href="#">图像优化</a>
        <a href="#">收藏夹图标生成器</a>
        <a href="#">邮件</a>
        <a href="#">htaccess密码</a>
        <a href="#">梯度图像</a>
        <a href="#">按钮生成器</a>
    </div>
    <div class="collapsed">
        <span class="menuSpan">支持我们</span>
        <a href="#">推荐我们</a>
        <a href="#">链接我们</a>
        <a href="#">网络资源</a>
    </div>
    <div class="collapsed">
        <span class="menuSpan">合作伙伴</span>
        <a href="#">JavaScript工具包</a>
        <a href="#">CSS驱动</a>
        <a href="#">CodingForums</a>
        <a href="#">CSS例子</a>
    </div>
    <div class="collapsed">
        <span class="menuSpan">测试电流</span>
        <a href="#">Current or not</a>
        <a href="#">Current or not</a>
        <a href="#">Current or not</a>
        <a href="#">Current or not</a>
    </div>
</div>
```

CSS 代码

```css
@charset "utf-8";

/* sdmenu */

div.sdmenu {
	width: 150px;
	margin: 0 auto;
	font-family: Arial, sans-serif;
	font-size: 12px;
	padding-bottom: 10px;
	background: url(bottom.gif) no-repeat right bottom;
	color: #fff;
}

div.sdmenu div {
	background: url(title.gif) repeat-x;
	overflow: hidden;
}

div.sdmenu div:first-child {
	background: url(toptitle.gif) no-repeat;
}

div.sdmenu div.collapsed {
	height: 25px;
}

div.sdmenu div span {
	display: block;
	height: 15px;
	line-height: 15px;
	overflow: hidden;
	padding: 5px 25px;
	font-weight: bold;
	color: white;
	background: url(expanded.gif) no-repeat 10px center;
	cursor: pointer;
	border-bottom: 1px solid #ddd;
}

div.sdmenu div.collapsed span {
	background-image: url(collapsed.gif);
}

div.sdmenu div a {
	padding: 5px 10px;
	background: #eee;
	display: block;
	border-bottom: 1px solid #ddd;
	color: #066;
}

div.sdmenu div a.current {
	background: #ccc;
}

div.sdmenu div a:hover {
	background: #066 url(linkarrow.gif) no-repeat right center;
	color: #fff;
	text-decoration: none;
}
```

JS 代码

```js
// 为兼容IE8，用querySelectorAll
var menuSpan = document.querySelectorAll(".menuSpan");
var myMenu = document.getElementById("my_menu");
var thisNode;
// 定义一个变量，来保存当前打开的菜单
var openNode = menuSpan[0].parentNode;
for (var i = 0; i < menuSpan.length; i++) {
    // 一级菜单绑定单击响应函数
    menuSpan[i].onclick = function() {
        thisNode = this.parentNode;
        // 切换collapsed的class属性
        toggleClass(thisNode, "collapsed");
        // 打开菜单以后，应该关闭之前打开的菜单
        if (openNode != thisNode && !hasClass(openNode, "collapsed")) {
            // 为了可以统一处理动画过渡效果，我们希望在这将addClass改为toggleClass
            // addClass(openNode, "collapsed");
            // 此处toggleClass()不需要有移除的功能
            toggleClass(openNode, "collapsed");
        }
        openNode = thisNode;
    };
}
```

![二级菜单1](https://i.loli.net/2021/08/15/HAcVCq8sIul4wvM.gif)

添加动画的过渡效果

```js
var beginHeight;
var endHeight;
for (var i = 0; i < menuSpan.length; i++) {
    menuSpan[i].onclick = function() {
        thisNode = this.parentNode;
        // 切换前高度
        beginHeight = thisNode.offsetHeight;
        // 切换
        toggleClass(thisNode, "collapsed");
        // 切换后高度
        endHeight = thisNode.offsetHeight;
        // 动画执行前内联高度
        thisNode.style.height = beginHeight + "px";
        // 设置动画效果
        move(thisNode, "height", endHeight, 30, function(){

        });
        if (openNode != thisNode && !hasClass(openNode, "collapsed")) {
            toggleClass(openNode, "collapsed");
        }
        openNode = thisNode;
    };
}
```

![二级菜单2](https://i.loli.net/2021/08/15/OjcHNzCEZMhYr1K.gif)

因为我们执行动画前添加了一个内联高度，而内联属性的优先级是最高的

当添加`collapsed`的 class 属性后不会起作用，因此同时需要在动画执行完毕后去除内联样式

```js
move(thisNode, "height", endHeight, 30, function(){
    // 动画执行后内联高度
    thisNode.style.height = "";
});
```

![二级菜单3](https://i.loli.net/2021/08/15/t6SyAU9hkqHI7fz.gif)

我们只对展开添加了动画效果，折叠时并没有添加动画

因为添加动画的逻辑是一致的，所以这里我们可以封装一个函数，用来执行带有动画效果的折叠和展开动作

```js
// 带有动画效果的折叠和展开动作
function toggleMenu(obj) {
    // 切换前高度
    beginHeight = obj.offsetHeight;
    // 切换
    toggleClass(obj, "collapsed");
    // 切换后高度
    endHeight = obj.offsetHeight;
    // 动画执行前内联高度
    obj.style.height = beginHeight + "px";
    // 设置动画效果
    move(obj, "height", endHeight, 30, function() {
        // 动画执行后内联高度
        obj.style.height = "";
    });
}
```

调用 toggleMenu 函数

```js
for (var i = 0; i < menuSpan.length; i++) {
    menuSpan[i].onclick = function() {
        thisNode = this.parentNode;
        // 切换
        toggleMenu(thisNode);
        // 关闭其他div
        if (openNode != thisNode && !hasClass(openNode, "collapsed")) {
            toggleMenu(openNode);
        }
        openNode = thisNode;
    };
}
```

![二级菜单4](https://i.loli.net/2021/08/15/um1XBdjYKkhne6r.gif)

