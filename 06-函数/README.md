> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

## 函数

函数也是一个对象，可以封装一些功能（代码），在需要时可以执行这些功能（代码），可以保存一些代码在需要的时候调用

使用`typeof`检查一个函数对象时，会返回`function`

```javascript
// 创建一个函数对象
// 可以将要封装的代码以字符串的形式传递给构造函数
var fun = new Function("console.log('Hello World.');");
// 封装到函数中的代码不会立即执行
// 函数中的代码会在函数调用的时候执行
// 调用函数语法：函数对象（）
// 当调用函数时，函数中封装的代码会按照顺序执行
fun(); // Hello World.
```

**使用函数声明来创建一个函数**

```javascript
function 函数名([形参1, 形参2...形参N]) {
	语句...
}
// 调用函数
函数名();
```

**示例**

```javascript
function fun1(){
    console.log("Hello world.");
    alert("Hello World!");
    document.write("Helloworld");
}
fun1();
```

**使用函数表达式（匿名函数）来创建一个函数**

```javascript
var 函数名 = function([形参1, 形参2...形参N]) {
	语句...
};
// 调用函数
函数名();    
```

**示例**

```javascript
var fun1 = function(){
    console.log("Hello world.");
    alert("Hello World!");
    document.write("Helloworld");
};
fun1();
```

