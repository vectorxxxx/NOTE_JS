> 笔记来源：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# JS基础

## 1、JS编写位置

可以将js代码编写到标签的`onclick`属性中当我们点击按钮时，js代码才会执行

```html
<button onclick="alert(\"Fuck! Do not touch me!\")"></button>
```

可以将js代码写在超链接的`href`属性中，这样当点击超链接时，会执行js代码

```html
<a href="alert(\"What's up, man?\")">Try to click me</a>
```

虽然可以写在标签的属性中，但是他们属于结构与行为耦合，不方便维护，不推荐使用

可以将js代码编写到`script`标签

```html
<script type="text/javascript">
    alert("I'm inner script.");
</script>
```

可以将js代码编写到外部js文件中，然后通过`script`标签引入

```html
<script src="/js/script.js" type="text/javascript"></script>
```

`script`标签一旦用于引入外部文件了，就不能在编写代码了，即使编写了浏览器也会忽略

如果需要则可以在创建一个新的`script`标签用于编写内部代码



## 2、JS注释

### 多行注释

多行注释，注释中的内容不会被执行，但是可以在源代码中查看

```javascript
/*
   多行注释...
   多行注释...
   多行注释...
*/
```

### 单行注释

```javascript
// 单行注释
```



## 3、注意点

1. JS中严格区分大小写

2. JS中每一条语句以分号`;`结尾

   如果不写分号，浏览器会自动添加，但是会消耗一些系统资源，而且有些时候，浏览器会加错分号，所以在开发中分号必须写

3. JS中会忽略多个空格和换行，所以我们可以利用空格和换行对代码进行格式化



## 4、字面量与变量

### 字面量

字面量，都是一些不可改变的值

字面量都是可以直接使用，但是我们一般都不会直接使用字面量

### 变量

变量可以用来保存字面量，而且变量的值是可以任意改变的变量更加方便我们使用

所以在开发中都是通过变量去保存一个字面量，而很少直接使用字面量

可以通过变量对字面量进行描述

```javascript
// 声明变量: 在js中使用var关键字来声明一个变量
var a;
// 为变量赋值
a = 123;
a = 456;
a = 123124223423424;
// 声明和赋值同时进行
var b = 789;
var c = 0;
var age = 80;
console.log(age);
```



## 5、标识符

在JS中所有的可以由我们自主命名的都可以称为是标识符

例如：变量名、函数名、属性名都属于标识符

命名一个标识符时需要遵守如下的规则：

1. 标识符中可以含有字母、数字、_、$
2. 标识符不能以数字开头
3. 标识符不能是ES中的关键字或保留字
4. 标识符一般都采用驼峰命名法
   - 首字母小写，每个单词的开头字母大写，其余字母小写

### 关键字

| **if**      | **else**     | **do**     | **while**    | **for**        |
| :---------- | :----------- | :--------- | :----------- | :------------- |
| **break**   | **continue** | **try**    | **catch**    | **finally**    |
| **throw**   | **true**     | **false**  | **function** | **return**     |
| **switch**  | **case**     | **null**   | **typeof**   | **instanceof** |
| **new**     | **var**      | **void**   | **in**       | **with**       |
| **default** | **debugger** | **delete** | **this**     |                |

### 保留字

| **class**     | **enum**       | **extends**   | **super**   | **const**  | **export** |
| :------------ | :------------- | :------------ | :---------- | :--------- | :--------- |
| **import**    | **implements** | **let**       | **private** | **public** | **yield**  |
| **interface** | **package**    | **protected** | **static**  |            |            |

### 其他不建议使用的标识符

| **boolean**     | **byte**       | **short**              | **char**               | **int**         | **long**      |
| --------------- | -------------- | ---------------------- | ---------------------- | --------------- | ------------- |
| **float**       | **double**     | **String**             | **Boolean**            | **Number**      | **Object**    |
| **Date**        | **Array**      | **Math**               | **Error**              | **SyntaxError** | **EvalError** |
| **TypeError**   | **URIError**   | **RangeError**         | **ReferenceError**     | **encodeURI**   | **decodeURI** |
| **parselnt**    | **parseFloat** | **NaN**                | **isNaN**              | **undefined**   | **transient** |
| **throws**      | **native**     | **goto**               | **eval**               | **JSON**        | **Infinity**  |
| **arguments**   | **isFinite**   | **volatile**           | **abstract**           | **RegExp**      | **Function**  |
| **synchronize** | **final**      | **encodeURICOmponent** | **decodeURIComponent** |                 |               |

JS底层保存标识符时实际上是采用的Unicode编码，所以理论上讲，所有的utf-8中含有的内容都可以作为标识符



## 6、数据类型

数据类型指的就是字面量的类型，在JS中一共有六种数据类型

| **基本数据类型** | **String**    | **字符串** |
| :--------------- | ------------- | :--------- |
|                  | **Number**    | **数值**   |
|                  | **Boolean**   | **布尔值** |
|                  | **Null**      | **空值**   |
|                  | **Undefined** | **未定义** |
| **引用类型**     | **Object**    | **对象**   |

其中`String`、`Number`、`Boolean`、`Null`、`Undefined`属于基本数据类型，而`Object`属于引用数据类型

### String字符串

在JS中，字符串需要使用引号引起来，使用单引号或双引号都可以，但不要混合使用

同一种引号不能嵌套，双引号不能放双引号，单引号不能放单引号

在字符串中我们可以使用`\`作为转义字符，当表示一些特殊符号时可以使用`\`进行转义

- `\"`表示`"`
- `\'`表示`'`
- `\n`表示换行
- `\t`制表符
- `\\`表示`\`

### Number数值

在JS中，所有的数值都是`Number`类型，包括整数和浮点数（小数）

可以使用一个运算符`typeof`，来检查一个变量的类型。语法：`typeof 变量`

- 检查字符串时，会返回`string`
- 检查数值时，会返回`number`

**MAX_VALUE**

JS中可以表示的数字的最大值 `Number.MAX_VALUE=1.7976931348623157e+308`

如果使用`Number`表示的数字超过了最大值，则会返回一个`Infinity`

```javascript
var a = Number.MAX_VALUE * Number.MAX_VALUE;
console.log(a); // Infinity
```

**MIN_VALUE**

大于0的最小值 `Number.MIN_VALUE=5e-324`

```javascript
var a = Number.MIN_VALUE * Number.MIN_VALUE;
console.log(a); // 0
```

**Infinity**

- `Infinity`表示正无穷
- `-Infinity` 表示负无穷

使用`typeof`检查，`Infinity`会返回`Number`

```javascript
var a = Number.MAX_VALUE * Number.MAX_VALUE;
console.log(typeof a); // number
```

**NaN**

`NaN`是一个特殊的数字，表示`Not A Number`

```javascript
var a = 'abc' * 'def';
console.log(a); // NaN
```

使用`typeof`检查一个`NaN`也会返回`number`

```javascript
var a = 'abc' * 'def';
console.log(typeof a); // number
```

**运算精度**

在JS中整数的运算基本可以保证精确

如果使用JS进行浮点运算，可能得到一个不精确的结果

```javascript
var a = 0.1 + 0.2;
console.log(a); // 0.30000000000000004
```

所以千万不要使用JS进行对精确度要求比较高的运算

### Boolean布尔值

布尔值只有两个，主要用来做逻辑判断

- `true`表示真
- `false`表示假

使用`typeof`检查一个布尔值时，会返回`boolean`

### Null

Null类型的值只有一个，就是`null`

`null`这个值专门用来表示一个为空的对象

使用`typeof`检查一个`null`值时，会返回`object`

```javascript
var a3 = null;
console.log(a3); // null
console.log(typeof a3); // object
```

### Undefined

Undefined（未定义）类型的值只有一个，就是`undefind`

当声明一个变量，但是并不给变量赋值时，它的值就是`undefined`

使用typeof检查一个`undefined`时，也会返回`undefined`

```javascript
var a4;
console.log(a4); // undefind
console.log(typeof a4); // undefind
```



## 7、强制类型转换

指将一个数据类型强制转换为其他的数据类型

类型转换主要指，将其他的数据类型，转换为`String`、`Number`、`Boolean`

### 7.1、其他数据类型转换为String

#### 方式一：调用被转换数据类型的toString()方法

该方法不会影响到原变量，它会将转换的结果返回

```javascript
// Number转换为String
var a1 = 123;
var b1 = a1.toString();
console.log(typeof a1); // number
console.log(typeof b1); // string
// Boolean转换为String
var a2 = true;
var b2 = a2.toString();
console.log(typeof a2); // boolean
console.log(typeof b2); // string
```

但是注意：`null`和`undefined`这两个值没有`toString()`，如果调用他们的方法，会报错

```javascript
// Null转换为String
var a3 = null;
var b3 = a3.toString(); // UncaughtTypeError: Cannot read property 'toString' of null
console.log(typeof a3); 
console.log(typeof b3);
// Undefined转换为String
var a4 = undefined;
var b4 = a4.toString(); // UncaughtTypeError: Cannot read property 'toString' of undefined
console.log(typeof a4); 
console.log(typeof b4);
```

#### 方式二：调用String()函数，并将被转换的数据作为参数传递给函数

使用`String()`函数做强制类型转换时，对于`Number`和`Boolean`实际上就是调用的`toString()`方法

但是对于`null`和`undefined`，就不会调用`toString()`方法，而是将

- `null`直接转换为`"null"`
- `undefined` 直接转换为`"undefined"`

```javascript
// Number转换为String
var a1 = 123;
var b1 = String(a1);
console.log(typeof a1); // number
console.log(typeof b1); // string
// Boolean转换为String
var a2 = true;
var b2 = String(a2);
console.log(typeof a2); // boolean
console.log(typeof b2); // string
// Null转换为String
var a3 = null;
var b3 = String(a3);
console.log(typeof a3); // object
console.log(typeof b3); // string
// Undefined转换为String
var a4 = undefined;
var b4 = String(a4);
console.log(typeof a4); // undefined
console.log(typeof b4); // string
```

### 7.2、其他数据类型转换为Number

#### 方式一：使用Number()函数

- 字符串 --> 数字
  - 如果是纯数字的字符串，则直接将其转换为数字
  - 如果字符串中有非数字的内容，则转换为`NaN`
  - 如果字符串是一个空串或者是一个全是空格的字符串，则转换为`0`
  
  ```javascript
  // **转换方式一：使用Number()函数**
  // 纯数字的字符串
  var a1 = '123';         
  a1 = Number(a1);
  console.log(typeof a1); // number
  console.log(a1); 	    // 123
  // 非数字的内容
  // var a2 = 'abc';         
  var a2 = undefined;
  a2 = Number(a2);
  console.log(typeof a2); // number
  console.log(a2);        // NaN 
  // 空串
  // var a3 = ' ';      
  var a3 = null;       
  a3 = Number(a3);        
  console.log(typeof a3); // number
  console.log(a3);        // 0
  ```

- 布尔 --> 数字
  - `true`转成`1`
  - `false`转成`0`
  
  ```javascript
  var a4 = true;
  a4 = Number(a4);
  console.log(typeof a4); // number
  console.log(a4);        // 1
  var a5 = false;
  a5 = Number(a5);
  console.log(typeof a5); // number
  console.log(a5);        // 0
  ```

#### 方式二：专门用来对付字符串

- `parseInt()`把一个字符串转换为一个整数：可以将一个字符串中的有效整数部分取出来，然后转换为Number
- `parseFloat()`把一个字符串转换为一个浮点数：可以将一个字符串中的有效小数部分取出来，然后转换为Number
- 如果对非String使用`parseInt()`或`parseFloat()`，它会先将其转换为String，然后再操作

```javascript
var a1 = "123";
a1 = parseInt(a1);
console.log(typeof a1); // number
console.log(a1);        // 123
var a2 = "123.456";
a2 = parseInt(a2);
console.log(typeof a2); // number
console.log(a2);        // 123
var a3 = "123px";
a3 = parseInt(a3);
console.log(typeof a3); // number
console.log(a3);        // 123 
// var a4 = null;
// var a4 = undefined;
// var a4 = '';
// var a4 = 'abc';
// var a4 = true;
var a4 = false;
a4 = parseInt(a4);
console.log(typeof a4); // number
console.log(a4);        // NaN
```

### 7.3、其他数据类型转换为Boolean

#### 方式一：使用`Boolean()`函数

- 数字-—->布尔
  - 除了`0`和`NaN`，其余的都是`true`
- 字符串-—->布尔
  - 除了空串，其余的都是`true`
- `null`和`undefined`都会转换为`false`
- 对象也会转换为`true`

```javascript
// - 数字-—->布尔
//   - 除了`0`和`NaN`，其余的都是`true`
// var a1 = 0;
var a1 = NaN;
a1 = Boolean(a1);
console.log(a1); // false
var a2 = 123;
a2 = Boolean(a2);
console.log(a2); // true
// - 字符串-—->布尔
//   - 除了空串，其余的都是`true`
var a3 = "123";
a3 = Boolean(a3);
console.log(a3); // true
var a4 = " ";
a4 = Boolean(a4);
console.log(a4); // true
var a5 = "";
a5 = Boolean(a5);
console.log(a5); // false
// - `null`和`undefined`都会转换为`false`
// var a6 = null;
var a6 = undefined;
a6 = Boolean(a6);
console.log(a6); // false
```

#### 方式二：隐式类型转换

为任意的数据类型做两次非运算，即可将其转换为布尔值（下一节会介绍）

```javascript
var a = "123";
var b = !!a;
console.log("a="+a+",b="+b); // a=true,b=true
```



## 8、补充

在js中，如果需要表示16进制的数字，则需要以`0x`开头

如果需要表示8进制的数字，则需要以`0`开头

如果需要表示2进制的数字，则需要以`0b`开头，但是不是所有的浏览器都支持

```javascript
// 十六进制数字
var a = 0x10;
console.log(a); // 16
a = 0xff;
console.log(a); // 255
a = 0xCafe;
console.log(a); // 51966
a = "0x70";
a = parseInt(a,16);
console.log(a); // 112
// 八进制数字
a = 070;
console.log(a); // 56
a = "070";
a = parseInt(a,8);
console.log(a); // 56
// 二进制数字
a = 0b10;
console.log(a); // 2
```

