> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 定时器

## 1、定时器简介

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