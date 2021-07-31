> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# call、apply和argument



## call()和apply()

这两个方法都是函数对象的方法，需要通过函数对象来调用

当对函数调用` call()`和`apply()`都会调用函数执行

```javascript
var obj = {
    name: "obj"
};
var obj2 = {
    name:"obj2"
}
function fun(){
    console.log(this.name);
}
fun.call(obj); // obj
fun.call(obj2); // obj2
```

在调用`call()`和`apply()`可以将一个对象指定为第一个参数此时这个对象将会成为函数执行时的`this`

- `call()`方法可以将实参在对象之后依次传递
- `apply()`方法需要将实参封装到一个数组中统一传递

```javascript
function fun(a, b){
    console.log("a = " + a + ", b = " + b);
}
fun.call(obj, 2, 3); // a = 2, b = 3
fun.apply(obj, [2, 3]); // a = 2, b = 3
```



## this的情况

1. 以函数的形式调用时，`this`永远都是`window`
2. 以方法的形式调用时，`this`是调用方法的对象
3. 以构造函数的形式调用时，`this`是新创建的那个对象
4. 使用`call`和`apply`调用时，`this`是指定的那个对象



## argument

在调用函数时，浏览器每次都会传递进两个隐含的参数：

- 函数的上下文对象`this`
- 封装实参的对象`arguments`

`arguments`是一个**类数组对象**（并非数组），可以通过索引来操作数据，也可以获取长度

```javascript
function fun1(){
    console.log(arguments instanceof Array); // false
    console.log(Array.isArray(arguments));   // false
}
fun1();
```

在调用函数时，我们所传递的实参都会在`arguments`中保存

我们即使不定义形参，也可以通过`arguments`来使用实参，只不过比较麻烦

- `arguments[0]`表示第一个实参
- `arguments[1]`表示第二个实参

```javascript
function fun2(a,b,c){
    console.log("arguments.length = " + arguments.length + ", arguments[0] = " + arguments[0]); 
}
fun2("hello"); // arguments.length = 1, arguments[0] = hello
fun2(true, "hello"); // arguments.length = 2, arguments[0] = true
```

它里边有一个属性叫做`callee`，这个属性对应一个函数对象，就是当前正在执行的函数对象

```javascript
function fun3(){
    console.log(arguments.callee);
    // function fun3(){
    //     console.log(arguments.callee);
    // }
    console.log(arguments.callee == fun3); // true
}
fun3();
```

