> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# JSON

JS 中的对象只有 JS 自己认识，其他的语言都不认识

`JSON`就是一个特殊格式的字符串，这个字符串可以被任意的语言所识别，并且可以转换为任意语言中的对象，`JSON`在开发中主要用来数据的交互



## JSON简介

![image-20210815161757491](https://i.loli.net/2021/08/15/7vAu4g1pPcOBzNt.png)

JavaScript Object Notation，JS 对象表示法

`JSON` 和 JS 对象的格式一样，只不过 `JSON `字符串中的属性名必须加双引号，其他的和JS语法一致



## JSON分类

- `对象{}`
- `数组[]`

```js
var obj = {
    "name": "孙悟空",
    "age": 1000,
    "gender": "男"
};
console.log(typeof obj); // object
var jsonObjStr = '{"name": "孙悟空","age": 1000,"gender": "男"}';
console.log(typeof jsonObjStr); // string
var jsonArrStr = '[1,2,3,"hello", true]';
console.log(typeof jsonArrStr); // string
```



## JSON中允许的值

- 字符串
- 数值
- 布尔值
- `null`
- 对象
- 数组

```js
// json对象可以包含json数组
var obj1 = '{"arr":[1,2,3]}';
// json数组可以包含json对象
var obj2 = '[{"name": "孙悟空","age": 1000,"gender": "男"},{"name": "孙悟空","age": 1000,"gender": "男"}]';
```



## JSON和JS间转换

在 JS 中，为我们提供了一个工具类，就叫`JSON`

这个对象可以帮助我们将一个`JSON`转换为 JS 对象，也可以将一个 JS 对象转换`JSON`

### JSON.parse()

可以将`JSON`字符串转换为 JS 中的对象

需要一个`JSON`字符串作为参数，会将该字符串转换为 JS 对象并返回

```js
var jsonObj = JSON.parse(jsonObjStr);
console.log(typeof jsonObj); // object
console.log(jsonObj); // { name: "孙悟空", age: 1000, gender: "男" }
console.log(jsonObj.name); // 孙悟空
console.log(jsonObj.age); // 1000
console.log(jsonObj.gender); // 男

var jsonArr = JSON.parse(jsonArrStr);
console.log(typeof jsonArr); // object
console.log(jsonArr); // (5) [ 1, 2, 3, "hello", true ]
console.log(jsonArr[0]); // 1
console.log(jsonArr[3]); // hello
console.log(jsonArr[4]); // true
```

### JSON.stringify()

可以将一个 JS 对象转换为`JSON`字符串

需要一个 JS 对象作为参数，会返回一个`JSON`字符串

```js
var obj2 = {
    name: "猪八戒",
    age: 2000,
    gender: "男"
};
var obj2JSONStr = JSON.stringify(obj2);
console.log(typeof obj2JSONStr); // string
console.log(obj2JSONStr); // {"name":"猪八戒","age":2000,"gender":"男"}
```

`JSON`对象在 IE7 及以下的浏览器中不支持，所以在这些浏览器中调用时会报错

![image-20210815155616771](https://i.loli.net/2021/08/15/yHtogF2fDuORYLi.png)

### eval()

这个函数可以用来执行一段字符串形式的 JS 代码，并将执行结果返回

```js
var str = 'alert("hello")';
eval(str);
```

![image-20210815160227547](https://i.loli.net/2021/08/15/6iezRpgfl3bB2Uu.png)

如果使用`eval()`执行的字符串中含有`{}`，它会将`{}`当成是代码块

```js
var jsonObjStr = '{"name": "孙悟空","age": 1000,"gender": "男"}';
eval(jsonObjStr);
```

![image-20210815160250908](https://i.loli.net/2021/08/15/AWUjuMbFRkIHyiw.png)

如果不希望将其当成代码块解析，则需要在字符串前后各加一个`()`

```js
var jsonObjStr = '{"name": "孙悟空","age": 1000,"gender": "男"}';
var result = eval("(" + jsonObjStr + ")");
console.log(result); // {age: 1000, gender: "男", name: "孙悟空"}
```

`eval()`这个函数的功能很强大，可以直接执行一个字符串中的 JS 代码

但是在开发中尽量不要使用，首先它的执行性能比较差，然后它还具有安全隐患

![img](https://i.loli.net/2021/08/15/pYUqRwjneiygHAh.jpg)

### 兼容IE7

如果需要兼容 IE7 及以下的`JSON`操作，则可以通过引入一个外部的 JS 文件来处理

```html
<script src="js/json2.js" type="text/javascript" charset="utf-8"></script>
```

然后在 IE7 浏览器中调用`JSON`相关方法就不会报错了

```js
console.log(JSON.parse(jsonObjStr)); // {age: 1000, gender: "男", name: "孙悟空"}
```

一开始介绍`JSON`时，说`JSON `字符串中的属性名必须加双引号

如果我就是不加呢？

```js
var jsonObjStr = '{name: "孙悟空","age": 1000,"gender": "男"}';
console.log(JSON.parse(jsonObjStr));
```

那就是一堆错误等着你了

![image-20210815161357814](https://i.loli.net/2021/08/15/yVFgMt35lAPBjkm.png)

![image-20210815161624439](https://i.loli.net/2021/08/15/yeRCo4rlS37KP9M.png)

![image-20210815161719543](https://i.loli.net/2021/08/15/UNmpB4MvdRIXKbl.png)