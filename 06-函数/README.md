> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 函数

## 1、函数的简介

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

### 使用函数声明来创建一个函数

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

使用函数表达式（匿名函数）来创建一个函数

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



## 2、函数的参数

定义一个用来求两个数和的函数

可以在函数的`()`中来指定一个或多个形参（形式参数）多个形参之间使用`,`隔开，声明形参就相当于在函数内部声明了对应的变量

在调用函数时，可以在`()`中指定实参（实际参数）

- 调用函数时解析器不会检查**实参的类型**。所以要注意，是否有可能会接收到非法的参数，如果有可能则需要对参数进行类型的检查

- 调用函数时，解析器也不会检查**实参的数量**，多余实参不会被赋值。如果实参的数量少于形参的数量，则没有对应实参的形参将是`undefined`

```javascript
// 创建一个函数，用来计算三个数的和
function sum(a, b, c) {
    alert(a + b + c);
}
sum(1, 2, 3, 4); // 6
```



## 3、函数的返回值

可以使用`return`来设置函数的返回值语法：`return 值`

`return`后的值将会作为函数的执行结果返回，可以定义一个变量，来接收该结果

在函数中`return`后的语句都不会执行

如果`return`语句后不跟任何值，就相当于返回一个`undefined`；如果函数中不写`return`，则也会返回`undefined`

`return`后可以跟任意类型的值

```javascript
// 创建一个函数，用来计算三个数的和
function sum(a, b, c) {
    // var result = a + b + c;
    // return result;
    return a + b + c;
}

// 调用函数
// 变量result的值就是函数的执行结果
// 函数返回什么result的值就是什么
var result = sum(1, 2, 3);
console.log("result = " + result);
```

**练习**

```javascript
// 1、定义一个函数，判断一个数字是否是偶数，如果是返回true，否则返回false
function isEven(num){
    // if(num % 2 == 0){
    //    return true;
    // }
    // return false;
    return num % 2 == 0;
}

var result = isEven(6);
console.log(result); // true
result = isEven(7);
console.log(result); // false

// 2、定义一个函数，可以根据半径计算一个圆的面积，并返回计算结果
function calCirc(radius) {
    return 3.14 * Math.square(radius);
}

var result = calCirc(2); // 
```

实参可以是任意的数据类型，也可以是一个对象。当我们的参数过多时，可以将参数封装到一个对象

```javascript
function sayHello(o){
    console.log("我是" + o.name
                + "，今年我" + o.age 
                + "岁了，我是一个" + o.gender 
                + "人，我住在" + o.address);
}			
var obj = {
    name: "孙悟空",
    age: 1000,
    gender: "男",
    address: "花果山"
};
sayHello(obj); // 我是孙悟空，今年我1000岁了，我是一个男人，我住在花果山
```

实参可以是一个对象，也可以是一个函数

```javascript
function calCirc(radius) {
    return Math.PI * Math.pow(radius, 2);
}
function fun(a){
    console.log("a = " + a);
}
fun(calCirc);  
// a = function calCirc(radius) {
//     return Math.PI * Math.pow(radius, 2);
// }
fun(calCirc(10)); // a = 314.1592653589793
```

`calCirc(10)`

- 调用函数
- 相当于使用的函数的返回值

`calCirc`

- 函数对象
- 相当于直接使用函数对象

函数也是一个对象，特殊在其具有功能

**break、continue、return对比**

- `break`可以退出当前的循环
- `continue`用于跳过当次循环
- `return`可以结束整个函数

**在函数内部再声明一个函数**

```javascript
function fun3(){
    function fun4(){
        console.log("I'm fun4.");
    }
    fun4();
}
fun3(); // I'm fun4.

function fun5(){
    function fun6(){
        console.log("I'm fun6.");
    }
    return fun6;
}
var a = fun5(); 
a(); // I'm fun6.
fun5()();  // I'm fun6.
```



## 4、立即执行函数

函数定义完，立即被调用，这种函数叫做立即执行函数

立即执行函数往往只会执行一次

```javascript
// 函数对象()
(function(){
    console.log("I'm anoymous function.");
})(); // I'm anoymous function.
(function(a, b){
    console.log(a + b);
})(2,3); // 5
```

