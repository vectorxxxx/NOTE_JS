> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# call、apply和argument



## call()和apply()

这两个方法都是函数对象的方法，需要通过函数对象来调用

当对函数调用` call()`和`apply()`都会调用函数执行

在调用`call()`和`apply()`可以将一个对象指定为第一个参数此时这个对象将会成为函数执行时的`this`

- `call()`方法可以将实参在对象之后依次传递
- `apply()`方法需要将实参封装到一个数组中统一传递



## `this`的情况

1. 以函数的形式调用时，`this`永远都是`window`
2. 以方法的形式调用时，`this`是调用方法的对象
3. 以构造函数的形式调用时，`this`是新创建的那个对象
4. 使用`call`和`apply`调用时，`this`是指定的那个对象

