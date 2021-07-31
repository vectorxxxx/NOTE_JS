> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 包装类和字符串

## 1、三大包装类

基本数据类型：`String`、`Number`、`Boolean`、`Null`、`Undefined`

引用数据类型：`Object`

在JS中为我们提供了三大包装类，通过这三个包装类可以将基本数据类型的数据转换为对象

- `String()`可以将基本数据类型字符串转换为`String`对象
- `Number()`可以将基本数据类型的数字转换为`Number`对象
- `Boolean()`可以将基本数据类型的布尔值转换为`Boolean`对象

```javascript
var str1 = "hello";
var str2 = new String();
console.log(typeof str1); // string
console.log(typeof str2); // object
var num1 = 3;
var num2 = new Number(3);
console.log(typeof num1); // string
console.log(typeof num2); // object
var bol1 = true;
var bol2 = new Boolean(true);
console.log(typeof bol1); // string
console.log(typeof bol2); // object
```

但是注意：我们在实际应用中不会使用基本数据类型的对象，如果使用基本数据类型的对象，在做一些比较时可能会带来一些不可预期的结果

```javascript
var n1 = new Number(1);
var n2 = new Number(1);
console.log(n1 == n2); // false
var b = new Boolean(false);
if(b){
    console.log(b); // Boolean {false}
}
```

方法和属性之能添加给对象，不能添加给基本数据类型（按照视频中的解释，是先将data临时转换为了一个包装类对象，进行了属性赋值操作；打印时又临时转换为了一个新的包装类对象，因为两次不是同一个对象，而且该对象刚刚创建，还没有任何属性和方法，所以是获取不到任何值的）

```javascript
var data = 4;
data.hello = "hello";
console.log(data.hello); // undefined
```

当我们对一些基本数据类型的值去调用属性和方法时，浏览器会临时使用包装类将其转换为对象，然后在调用对象的属性和方法时，浏览器会临时使用包装类将其转换为对象，然后在调用对象的属性和方法调用完以后，在将其转换为基本数据类型

```javascript
var s = 123;
s = s.toString();
console.log(s); // 123
console.log(typeof s); // string
```



## 2、字符串方法

字符串在底层是以字符数组的形式保存的：`["H","e","l","l","o"," ","W","o","r","l","d","."]`

```javascript
var str = "Hello World.";
console.log(str[0]); // H
console.log(str[5]); //  
console.log(str[12]); // undefined
```

### length属性

可以用来获取字符串的长度

```javascript
console.log(str.length); // 12
```

### charAt()

可以返回字符串中指定位置的字符，不会对原字符串产生影响

```javascript
var result = str.charAt(0);
console.log(str); // Hello World.
console.log(result); // H
```

### charCodeAt()

获取指定位置字符的字符编码（Unicode编码），不会对原字符串产生影响

```javascript
result = str.charCodeAt(0);
console.log(str); // Hello World.
console.log(result); // 72
var str2 = "您好，世界。";
result = str2.charCodeAt(0);
console.log(result); // 24744
```

### String.formCharCode()

可以根据字符编码去获取字符

```javascript
result = String.fromCharCode(72);
console.log(result); // H
result = String.fromCharCode(24744);
console.log(result); // 您
result = String.fromCharCode(0x2682);
console.log(result); // ⚂
```

### concat()

可以用来连接两个或多个字符串，作用和`+`一样，不会对原字符串产生影响

```javascript
result = str.concat("您好","世界");
console.log(str); // Hello World.
console.log(result); // Hello World.您好世界
```

### indexof()

该方法可以检索一个字符串中是否含有指定内容，不会对原字符串产生影响

- 如果字符串中含有该内容，则返回其第一次出现的索引
- 如果没有找到指定的内容，则返回`-1`

```javascript
result = str.indexOf("o");
console.log(str); // Hello World.
console.log(result); // 4
result = str.indexOf("y");
console.log(result); // -1
```

可以指定一个第二个参数，指定开始查找的位置

```javascript
result = str.indexOf("l",3);
console.log(result); // 3
result = str.indexOf("l",4);
console.log(result); // 9
```

### lastIndexof()

该方法的用法和`indexOf()`一样，不同的是`indexOf`是从前往后找，而`lastIndexOf`是从后往前找

但返回的索引是按照从前往后计数的

```javascript
result = str.lastIndexOf("o");
console.log(result); // 7
result = str.lastIndexOf("l");
console.log(result); // 9
```

可以指定一个第二个参数，指定开始查找的位置（不过开始位置也是从后往前数的）

```javascript
result = str.lastIndexOf("l", 6);
console.log(result); // 3
```

### slice()

可以从字符串中截取指定的内容，不会影响原字符串

- 第一个参数，开始位置的索引（包括开始位置）
- 第二个参数，结束位置的索引（不包括结束位置）

```javascript
result = str.slice(0,2);
console.log(str); // Hello World.
console.log(result); // He
```

如果省略第二个参数，则会截取到后边所有的

```javascript
result = str.slice(6);
console.log(result); // World.
```

也可以传递一个负数作为参数，负数的话将会从后边计算

```javascript
result = str.slice(6,-1);
console.log(result); // World
```

### substring()

可以用来截取一个字符串，不会影响原字符串，和`slice()`类似

- 第一个参数，开始位置的索引（包括开始位置）
- 第二个参数，结束位置的索引（不包括结束位置）

```javascript
result = str.substring(0,2);
console.log(str); // Hello World.
console.log(result); // He
```

不同的是这个方法不能接受负值作为参数，如果传递了一个负值，则默认使用0

而且会自动调整参数的位置，如果第二个参数小于第一个，则自动交换

```javascript
result = str.substring(1,-1); // 自动调整为str.substring(0,1);
console.log(result); // H
result = str.substring(1,0); // 自动调整为str.substring(0,1);
console.log(result); // H
```

### substr()

用来截取字符串，不会影响原字符串，不过不建议使用

![image-20210731192139982](https://i.loli.net/2021/07/31/qSxbRr2dkcD7nFv.png)

- 第一个参数，截取开始位置的索引
- 第二个参数，截取的长度

```javascript
result = str.substr(1,3);
console.log(str); // Hello World.
console.log(result); // ell
```

### split()

可以将一个字符串拆分为一个数组，不会影响原字符串

需要一个字符串作为参数，将会根据该字符串去拆分数组

```javascript
result = str.split("o");
console.log(str); // Hello World.
console.log(result); // ["Hell", " W", "rld."]
console.log(result[0]); // Hell
console.log(result[1]); //  W
console.log(result[2]); // rld.
```

如果传递一个空串作为参数，则会将每个字符都拆分为数组中的一个元素

```javascript
result = str.split("");
console.log(result); // ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "."]
```

### toUpperCase()

将一个字符串转换为大写并返回，不会影响原字符串

```javascript
result = str.toUpperCase();
console.log(str); // Hello World.
console.log(result); // HELLO WORLD.
```

### toLowerCase()

将一个字符串转换为小写并返回，不会影响原字符串

```javascript
result = str.toLowerCase();
console.log(str); // Hello World.
console.log(result); // hello world.
```

