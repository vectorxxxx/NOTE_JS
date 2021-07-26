> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 作用域

作用域指一个变量的作用的范围

在JS中一共有两种作用域：

- 全局作用域
- 函数作用域

## 1、全局作用域

直接编写在script标签中的JS代码，都在全局作用域

全局作用域在页面打开时创建，在页面关闭时销毁

在全局作用域中有一个全局对象`window`，它代表的是一个浏览器的窗口，由浏览器创建，可以直接使用

在全局作用域中：

- 创建的变量都会作为window对象的属性保存
- 创建的函数都会作为window对象的方法保存

全局作用域中的变量都是全局变量，在页面的任意的部分都可以访问的到

```javascript
var a = 3;
console.log(window.a); //3
console.log(a); //3

b = 3;
console.log(b); //3
```

### 1.1、变量的声明提前

使用`var`关键字声明的变量，会在所有的代码执行之前被声明

但是如果声明变量时不适用`var`关键字，则变量不会被声明提前

```javascript
// 1、变量的声明提前
console.log("a = " + a); // a = undefined
var a = "abc";
// ======相当于======
var a;
console.log("a = " + a); // a = undefined
a = "abc";

// 2、没有变量的声明提前，报错
console.log("b = " + b); // UncaughtReferenceError: b is not defined
b = "abc";
// ======相当于======
console.log("b = " + b); // UncaughtReferenceError: b is not defined
window.b = "abc";
```

### 1.2、函数的声明提前

使用**函数声明**形式创建的函数`function`

```javascript
函数(){
	语句...
}
```

它会在所有的代码执行之前就被创建，所以我们可以在函数声明前来调用函数

```javascript
fun1(); // fun1...
fun2(); // UncaughtTypeError: fun2 is not a function
// 函数声明，会被提前创建
function fun1(){
    console.log("fun1...");
}
// 函数表达式，不会被提前创建（变量会被提前声明，但函数不会被提前创建）
var fun2 = function(){
    console.log("fun2...");
}
```



## 2、函数作用域

调用函数时创建函数作用域，函数执行完毕以后，函数作用域销毁

每调用一次函数就会创建一个新的函数作用域，他们之间是互相独立的

- 在函数作用域中可以访问到全局作用域的变量
- 在全局作用域中无法访问到函数作用域的变量

当在函数作用域操作一个变量时，它会先在自身作用域中寻找，

- 如果有就直接使用
- 如果没有则向上一级作用域中寻找，直到找到全局作用域
- 如果全局作用域中依然没有找到，则会报错

在函数中要访问全局变量可以使用`window`对象

```javascript
var a = 10;
function fun2(){
    var a = 20;

    function fun3(){
        var a = 30;
        console.log("fun3 ==> a = " + a);  // fun3 ==> a = 30
    }

    fun3();

    console.log("fun2 ==>a = " + a); // fun2 ==>a = 20
    console.log("a = " + window.a); // a = 10
}
fun2(); 
console.log("a = " + a); // a = 10
```

在函数作用域也有声明提前的特性，使用`var`关键字声明的变量，会在函数中所有的代码执行之前被声明

函数声明也会在函数中所有的代码执行之前执行

```javascript
// 在函数作用域也有声明提前的特性，使用`var`关键字声明的变量，会在函数中所有的代码执行之前被声明
function func1(){
    console.log(a);
    var a = "func1";

    // 函数声明也会在函数中所有的代码执行之前执行
    func2(); // fun2...
    function func2(){
        console.log("fun2...");
    }
}
func1(); // undefined
```

在函数中，不适用`var`声明的变量都会成为全局变量

```javascript
// 函数声明且调用
func3();
function func3() {
    a = 4;
}
console.log("a = " + window.a);  // a = 4
console.log("a = " + window["a"]);   // a = 4
console.log("a = " + a);    // a = 4
// 函数声明不调用
function func4() {
    b = 4;
}
console.log("b = " + window.b);  // b = 4
console.log("b = " + window["b"]);   // b = 4
console.log("b = " + b);    // UncaughtReferenceError: b is not defined
```

定义形参就相当于在函数作用域中声明了变量

```javascript
var e = 10;
function fun5(e){
    console.log(e);
}
fun5(); // undefined
fun5(55);  // 55
```

**练习**

```javascript
// 说出以下代码的执行结果
var a = 123; 
function fun(){
    console.log(a);
}
fun(); 			// 123
// =====================
var a = 123; 
function fun(){
    console.log(a);
    var a = 456;
}
fun(); 			// undefined
console.log(a);  // 123
// =====================
var a = 123; 
function fun(){
    console.log(a);
    a = 456;
}
fun(); 			// 123
console.log(a);  // 456
// =====================
var a = 123; 
function fun(a){
    console.log(a);
    a = 456;
}
fun();			// undefined
console.log(a);  // 123
// =====================
var a = 123; 
function fun(a){
    console.log(a);
    a = 456;
}
fun(789);		// 789
console.log(a);  // 123
```



## 3、this

解析器在调用函数每次都会向函数内部传递进一个隐含的参数，这个隐含的参数就是`this`

`this`指向的是一个对象，这个对象我们称为函数执行的上下文对象

根据函数的调用方式的不同，`this`会指向不同的对象

- 以函数的形式调用时，`this`永远都是`window`
- 以方法的形式调用时，`this`就是调用方法的那个对象

```javascript
// - 以函数的形式调用时，`this`永远都是`window`
function fun(){
    console.log(this.name);
}
var name = "ddd"; // ddd
fun();
// - 以方法的形式调用时，`this`就是调用方法的那个对象
var obj = {
    name: "孙悟空",
    sayName: fun
}
obj.sayName(); // 孙悟空
```

