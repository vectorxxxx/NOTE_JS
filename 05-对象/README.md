> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 对象

JS中数据类型

- String 字符串
- Number数值
- Boolean 布尔值
- Null空值
- Undefined 未定义

以上这五种类型属于基本数据类型，以后我们看到的值只要不是上边的5种，全都是对象

## 1、Object 对象

基本数据类型都是单一的值`"hello" 123 true`，值和值之间没有任何的联系。

在JS中来表示一个人的信息（name gender age）：

```javascript
var name = "孙悟空";
var gender = "男";
var age = 18;
```

如果使用基本数据类型的数据，我们所创建的变量都是独立，不能成为一个整体。

对象属于一种复合的数据类型，在对象中可以保存多个不同数据类型的属性。



## 2、对象的分类

### 2.1、内建对象

由ES标准中定义的对象，在任何的ES的实现中都可以使用

 常见内建对象有以下，都可以直接通过new调用构造函数创建对象实例：

- Object、Function、Array、String、Number、Boolean、Date、RegExp
- Error（EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError）

```javascript
// Math
Math.sqrt(2);
// String
String(2);
// Number
Number("2");
```



### 2.2、宿主对象

由JS的运行环境提供的对象，目前来讲主要指由浏览器提供的对象

比如 `BOM DOM`

```javascript
// console
console.log("hello");
// document
document.write("hello");
```

JavaScript实现包括三部分：

| 组成                                       | 作用                                                   | 地位                  | 例子       |
| :----------------------------------------- | :----------------------------------------------------- | :-------------------- | :--------- |
| ES（ECMAScript）                           | 描述JS语法和基本对象                                   | 核心                  |            |
| DOM（Document Object Model 文档对象模型）  | HTML和XML的应用程序接口，处理网页内容的方法和接口      | W3C标准               | `document` |
| BOM（Browser Object Model 浏览器对象模型） | 描述与浏览器进行交互的方法和接口，处理浏览器窗口和框架 | 浏览器厂商对DOM的实现 | `window`   |

**DOM**

![img](https://i.loli.net/2021/07/14/jpVOLT42KarizhP.png)

**BOM**

![img](https://i.loli.net/2021/07/14/p7AXdHUntDFq4PB.png)

**DOM 和 BOM 的关系**

![JavaScript的Dom和Bom](https://i.loli.net/2021/07/14/5zjFWRyJe9ZuDq1.jpg)



### 2.3、自定义对象

由开发人员自己创建的对象

使用`new`关键字调用的函数，是构造函数`constructor`，构造函数是专门用来创建对象的

函数使用`typeof`检查一个对象时，会返回`object`

在对象中保存的值称为属性

- 添加或修改对象属性的语法：`对象.属性名=属性值;`
- 读取对象属性的语法：`对象.属性名`
- 删除对象属性的语法：`delete 对象.属性名;`

```javascript
var obj = new Object();
// 向obj中添加一个name属性
obj.name = "孙悟空";
// 向obj中添加一个gender属性
obj.gender = "男";
// 向obj中添加一个age属性
obj.age = "18";
// 打印obj
console.log(typeof obj); // object
console.log(obj); // {"age":"18","gender":"男","name":"孙悟空"}
console.log(obj.name); // 孙悟空
```

#### 属性名

对象的属性名不强制要求遵守标识符的规范，什么乱七八糟的名字都可以使用，但是我们使用是还是尽量按照标识符的规范去做

如果要使用特殊的属性名，不能采用`.`的方式来操作，而需要使用另一种语法：`对象["属性名"]=属性值`，读取时也需要采用这种方式

```javascript
obj["name"] = "齐天大圣";
console.log(obj["name"]); // 齐天大圣
```

使用`[]`这种形式去操作属性，更加的灵活，在`[]`中可以直接传递一个变量，这样变量值是哪个就会读取哪个属性

```javascript
var n = "nihao";
obj[n] = "你好";
console.log(obj[n]); // 你好
```

**回顾**：`.`、`[]`、`new`这几个运算符的优先级是最高的

#### 属性值

JS对象的属性值，可以是任意的数据类型，包括对象

```javascript
var obj2 = new Object();
obj2.name = "猪八戒";
obj.bro = obj2;
console.log(obj.bro.name); // 猪八戒
```

**`in`运算符**

通过该运算符可以检查一个对象中是否含有指定的属性

如果有则返回`true`，没有则返回`false`

语法：`"属性名" in 对象`

```javascript
console.log("test" in obj); // false
console.log("name" in obj); // true
```



## 3、基本数据类型和引用数据类型

基本数据类型 `String Number Boolean Null Undefined`

引用数据类型 `Object`

### 基本数据类型

- JS中的变量都是保存到栈内存中的，基本数据类型的值直接在栈内存中存储
- 值与值之间是独立存在，修改一个变量不会影响其他的变量

```javascript
var a = 1;
var b = a;
console.log("a=" + a + ", b=" + b); // a=1, b=1
b = 2;
console.log("a=" + a + ", b=" + b); // a=1, b=2
```



### 引用数据类型

- 对象是保存到堆内存中的
- 每创建一个新的对象，就会在堆内存中开辟出一个新的空间，而变量保存的是对象的内存地址（对象的引用）
- 如果两个变量保存的是同一个对象引用，当一个通过一个变量修改属性时，另一个也会受到影响

```javascript
var obj3 = obj;
obj3.name = "斗战胜佛";
console.log(obj.name);  // 斗战胜佛
console.log(obj3.name); // 斗战胜佛
```

**比较**

- 当比较两个基本数据类型的值时，就是比较值。
- 而比较两个引用数据类型时，它是比较的对象的内存地址，如果两个对象是一摸一样的，但是地址不同，它也会返回`false`

```javascript
var o1 = new Object();
var o2 = new Object();
o1["name"] = "周瑜";
o2["name"] = "周瑜";
console.log(o1 == o2); // false
```



## 4、对象字面量

使用对象字面量，可以在创建对象时，直接指定对象属性的语法：`{属性名: 属性值, 属性名: 属性值...}`

对象字面量的属性名可以加引号也可以不加（建议不加），如果要使用一些特殊的名字，则必须加引号

属性名和属性值是一组一组的名值对结构，名和值之间使用`:`连接，多个名值对之间使用`,`隔开

如果一个属性之后没有其他的属性了，就不要写`,`了

```javascript
var obj = {
    name: "孙悟空",
    age: 1000,
    gender: "男",
    bor:{
        name: "猪八戒"
    }
}
console.log(obj); // {"age":1000,"bor":{"name":"猪八戒"},"gender":"男","name":"孙悟空"}
```



## 5、方法

对象的属性值可以是任何的数据类型，也可以是个函数（下一节知识）

函数也可以称为对象的属性，如果一个函数作为一个对象的属性保存，那么我们称这个函数是这个对象的方法

调用函数就说调用对象的方法，但是它只是名称上的区别没有其他的区别

```javascript
var obj2 = {
    name: "猪八戒",
    age: 18,
    sayName: function() {
        console.log(obj2.name);
    }
};
obj2.sayName(); // 猪八戒
```



## 6、枚举对象中的属性

使用`for...in`语句语法：

```javascript
for(var 变量 in 对象) {
	语句...
}
```

`for...in`语句对象中有几个属性，循环体就会执行几次

每次执行时，会将对象中的一个属性的名字赋值给变量

```javascript
var obj = {
    name: "孙悟空",
    age: 1000,
    gender: "男",
    address: "花果山"
};
for(var key in obj){
    console.log(key + "=" + obj.key);
    // name=undefined
    // age=undefined
    // gender=undefined
    // address=undefined
    console.log(key + "=" + obj[key]);
    // name=孙悟空
    // age=1000
    // gender=男
    // address=花果山
}
```

