> 笔记来源：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# JS运算

## 1、运算符

运算符也叫操作符，通过运算符可以对一个或多个值进行运算，并获取运算结果

比如：`typeof`就是运算符，可以来获得一个值的类型

它会将该值的类型以字符串的形式返回 `number string boolean undefined object`



## 2、算数运算符

- 当对非Number类型的值进行运算时，会将这些值转换为Number然后再运算
- 任何值和`NaN`做运算都得`NaN`

算数运算符

- `+` 可以对两个值进行加法运算，并将结果返回

  - 如果对两个字符串进行加法运算，则会将两个字符串拼接为一个字符串，并返回
  - 任何的值和字符串做加法运算，都会先转换为字符串，然后再和字符串做拼串的操作

  ```javascript
  var a1 = 123 + 456;
  console.log(a1); // 579
  var a2 = "123" + "456";
  console.log(a2); // 123456
  var a3 = "123" + 456;
  console.log(a3); // 123456
  var a4 = 123 + "456";
  console.log(a4); // 123456
  var a5 = 123 + true;
  console.log(a5); // 124
  var a6 = 123 + "";
  console.log(a6); // 123
  var a7 = 123 + null;
  console.log(a7); // 123
  var a8 = 123 + undefined;
  console.log(a8); // NaN
  var a9 = 123 + NaN;
  console.log(a9); // NaN
  var a10 = "123" + NaN;
  console.log(a10); // 123NaN
  ```

- `-` 可以对两个值进行减法运算，并将结果返回

  ```javascript
  var b1 = 456 - 123;
  console.log(b1); // 333
  var b2 = 456 - "123";
  console.log(b2); // 333
  var b3 = 456 - true;
  console.log(b3); // 455
  var b4 = 456 - "";
  console.log(b4); // 456
  var b5 = 456 - null;
  console.log(b5); // 456
  var b6 = 456 - "abc";
  console.log(b6); // NaN
  var b7 = 456 - NaN;
  console.log(b7); // NaN
  var b8 = 456 - undefined;
  console.log(b8); // NaN
  ```

- `*` 可以对两个值进行乘法运算，并将结果返回

- `/` 可以对两个值进行除法运算，并将结果返回

- `%` 可以对两个值进行取模运算，并将结果返回

根据这些特点，我们可以利用`+""`将Number转为String，利用`-0`、`*1`、`/1`将String转为Number



## 3、一元运算符

一元运算符，只需要一个操作数

- `+` 正号：正号不会对数字产生任何影响
- `-` 负号：负号可以对数字进行负号的取反

对于非Number类型的值，它会将先转换为Number，然后再运算

可以对一个其他的数据类型使用`+`，来将其转换为Number，它的原理和`Number()`函数一样

```javascript
var a = "10";
var result = +a;
console.log(typeof result);    // number
console.log("result="+result); // result=10
result = -a;
console.log("result="+result); // result=-10
a = true;
result = +a;
console.log("result="+result); // result=1
a = "";
result = +a;
console.log("result="+result); // result=0
a = null;
result = +a;
console.log("result="+result); // result=0
a = undefined;
result = +a;
console.log("result="+result); // result=NaN
a = NaN;
result = +a;
console.log("result="+result); // result=NaN
```



## 4、自增和自减

### 自增++

通过自增可以使变量在自身的基础上增加1

自增分成两种：后++（`a++`）和前++（`++a`）

无论是`a++`还是`++a`，都会立即使原变量的值自增1

不同的是`a++`和`++a`的值不同

- `a++`是变量的原值（自增前的值）
- `++a`是变量的新值（自增后的值）

```javascript
var a,b;
a = 1;
b = a++;
console.log("a++ = " + b + ", a = " + a); // a++ = 1, a = 2
a = 1;
b = ++a;
console.log("++a = " + b + ", a = " + a); // ++a = 2, a = 2
```

### 自减--

通过自减可以使变量在自身的基础上减少1

自减分成两种：后--（`a--`）和前--（`--a`）

无论是`a--`还是`--a`，都会立即使原变量的值自减1

不同的是`a--`和`--a`的值不同

- `a--`是变量的原值（自减前的值）
- `--a`是变量的新值（自减后的值）

```javascript
var a,b;
a = 1;
b = a--;
console.log("a-- = " + b + ", a = " + a); // a-- = 1, a = 0
a = 1;
b = --a;
console.log("--a = " + b + ", a = " + a); // --a = 0, a = 0
```

**练习**

```javascript
a = 10;
b = a++ + ++a + a; // 10 + 12 + 12;
console.log('a = ' + a + ', b = ' + b); // a = 12, b = 34
```



## 5、逻辑运算符

JS中为我们提供了三种逻辑运算符

- `!` 非
- `&&` 与
- `||` 或

### 非运算

`!`可以用来对一个值进行非运算

所谓非运算就是值对一个布尔值进行取反操作，`true`变`false`，`false`变`true`

- 如果对一个值进行两次取反，它不会变化
- 如果对非布尔值进行运算，则会将其转换为布尔值，然后再取反

所以我们可以利用该特点，来将一个其他的数据类型转换为布尔值

可以为一个任意数据类型取两次反，来将其转换为布尔值，原理和`Boolean()`函数一样

```javascript
var a,b;
a = true;
b = !a;
console.log("a="+a+",b="+b); // a=true,b=false
b = !!a;
console.log("a="+a+",b="+b); // a=true,b=true
```

### 与运算

`&&`可以对符号两侧的值进行与运算并返回结果

运算规则

- 两个值中只要有一个值的`false`就返回`false`；只有两个值都为`true`时，才会返回`true`
- JS中的“与”属于短路的与，如果第一个值为`false`，则不会检查第二个值

```javascript
var a;
a = true && true;   // true
console.log(a);
a = true && false;  // false
console.log(a);
a = false && true;  // false
console.log(a);
a = false && false; // false
console.log(a);
```

### 或运算

`||`可以对符号两侧的值进行或运算并返回结果

运算规则：

- 两个值中只要有一个`true`，就返回`true`；如果两个值都为`false`，才返回`false`
- JS中的“或”属于短路的或，如果第一个值为`true`，则不会检查第二个值

```javascript
var a;
a = true || true;   // true
console.log(a);
a = true || false;  // true
console.log(a);
a = false || true;  // true
console.log(a);
a = false || false; // false
console.log(a);
```

### &&、|| 非布尔值的情况

对于非布尔值进行与或运算时，会先将其转换为布尔值，然后再运算，并且返回原值

与运算

- 如果第一个值为`true`，则必然返回第二个值
- 如果第一个值为`false`，则直接返回第一个值

```javascript
var result;
result = 1 && 2;
console.log(result);   // 2
result = 2 && 1;
console.log(result);   // 1
result = 1 && 0;
console.log(result);   // 0
result = 0 && 1;
console.log(result);   // 0
result = "" && 1;
console.log(result);   //
result = 1 && "";
console.log(result);   //
result = null && 1;
console.log(result);   // null
result = 1 && null;
console.log(result);   // null
result = undefined && 1;
console.log(result);   // undefined	
result = 1 && undefined;
console.log(result);   // undefined
```

或运算

- 如果第一个值为`true`，则直接返回第一个值
- 如果第一个值为`false`，则返回第二个值

```javascript
var result;
result = 1 || 2;
console.log(result);   // 1
result = 2 || 1;
console.log(result);   // 2
result = 1 || 0;
console.log(result);   // 1
result = 0 || 1;
console.log(result);   // 1
result = "" || 1;
console.log(result);   // 1
result = 1 || "";
console.log(result);   // 1
result = null || 1;
console.log(result);   // 1
result = 1 || null;
console.log(result);   // 1
result = undefined || 1;
console.log(result);   // 1	
result = 1 || undefined;
console.log(result);   // 1	
```



## 6、赋值运算符

`=` 可以将符号右侧的值赋值给符号左侧的变量

- `+=` `a+=5`等价于`a=a+5`
- `-=` `a-=5`等价于`a=a-5`
- `*=` `a*=5`等价于`a=a*5`
- `/=` `a/=5`等价于`a=a/5`
- `%=` `a%=5`等价于`a=a%5`



## 7、关系运算符

通过关系运算符可以比较两个值之间的大小关系，如果关系成立它会返回`true`，如果关系不成立则返回`false`

- `>`：大于号，判断符号左侧的值是否大于右侧的
- `>=`：大于等于号，判断符号左侧的值是否大于等于右侧的
- `<`：小于号，判断符号左侧的值是否小于右侧的
- `<=`：小于等于号，判断符号左侧的值是否小于等于右侧的

任何值和NaN做任何比较都是`false`

**非数值的情况**

对于非数值进行比较时，会将其转换为数字然后再比较

如果符号两侧的值都是字符串时，不会将其转换为数字进行比较，而是分别比较字符串中字符的Unicode编码

```javascript
console.log(1>true);      // false
console.log(1>=true);     // true
console.log(1>"0");       // true
console.log(10>null);     // true 
// 任何值和NaN做任何比较都是`false`
console.log(10<="hello"); // false
// 比较两个字符串时，比较的是字符串的字符编码
console.log("a" < "b");   // true
// 比较字符编码时是一位一位进行比较
// 如果两位一样，则比较下一位，所以借用它来对英文进行排序
console.log("bcd" < "b"); // false
console.log("11" < "5");  // true
// 比较中文时没有意义
console.log("我" < "你"); // false
// 如果比较的两个字符串型的数字，可能会得到不可预期的结果
// 注意：在比较两个字符串型的数字时，一定一定一定要转型
console.log("12345675432" < +"5"); // false
```



## 8、相等运算符

### `==` 相等

相等运算符用来比较两个值是否相等，如果相等会返回`true`，否则返回`false`

使用`==`来做相等运算：当使用`==`来比较两个值时，如果值的类型不同，则会自动进行类型转换，将其转换为相同的类型然后在比较

```javascript
// undefined 衍生自null，所以这两个值做相等判断时，会返回true
console.log(null == undefined); // true
// NaN不和任何值相等，包括他本身
console.log(NaN == NaN); // false
// 可以通过isNaN()函数来判断一个值是否是NaN
// 如果该值是NaN则返回true，否则返回false
console.log(isNaN(NaN)); // true
```

### `!=` 不想等

不相等运算符用来判断两个值是否不相等，如果不相等返回`true`，否则返回`false`

使用`!=`来做不相等运算：不相等也会对变量进行自动的类型转换，如果转换后相等它也会返回`false`

### `===` 全等

用来判断两个值是否全等，它和相等类似，不同的是它不会做自动的类型转换，如果两个值的类型不同，直接返回`false`

### `!==`不全等

用来判断两个值是否不全等，和不等类似，不同的是它不会做自动的类型转换，如果两个值的类型不同，直接返回`false`

```javascript
console.log("123" === 123); // false
console.log("123" !== 123); // true
```

关于改运算符，可以参考下图

![img](https://i.loli.net/2021/07/11/sjW1ErMbcz4OZpD.png)



## 9、条件运算符

条件运算符也叫三元运算符 `条件表达式 ? 语句1: 语句2;`

执行的流程：条件运算符在执行时，首先对条件表达式进行求值

- 如果该值为`true`，则执行`语句1`，并返回执行结果
- 如果该值为`false`，则执行`语句2`，并返回执行结果

```javascript
var a = 30;
var b = 40;
var c = 90;
// 两数中取MAX
var max = a > b ? a : b;
console.log("max="+max);
// 三数中取MAX
max = a > b ? (a > c ? a : c) : (b > c ? b : c);
console.log("max="+max);
```

如果条件的表达式的求值结果是一个非布尔值，则会将其转换为布尔值，然后再运算

```javascript
"hello" ? alert("111111") : alert("2222222");
```



## 10、运算符优先级

就和数学中一样，在JS中运算符也有优先级，比如：先乘除后加减

在JS中有一个运算符优先级的表，在表中越靠上优先级越高，优先级越高越优先计算，如果优先级一样，则从左往右计算

但是这个表我们并不需要记忆，如果遇到优先级不清楚可以使用`()`来改变优先级

| **`.`、`[]`、`new`**                                         |
| :----------------------------------------------------------- |
| **`()`**                                                     |
| **`++`、`--`**                                               |
| **`!`、`～`、`+`（单目）、`-`（单目）、`typeof`、`void`、`delete `** |
| **`%`、`*`、`/`**                                            |
| **`+`（双目）、`-`（双目）**                                 |
| **` <<`、`>>`、`>>>`**                                       |
| **`<`、`<=`、`>`、`>=`**                                     |
| **`==`、`!==`、`=== `**                                      |
| **`&`**                                                      |
| **`^`**                                                      |
| **`|`**                                                      |
| **`&&`**                                                     |
| **`||`**                                                     |
| **`?:`**                                                     |
| **`=`、`+=`、`-=`、`*=`、`/=`、`%=`、`<<=`、`>>=`、`>>>=`、`&=`、`^=`、`|=`** |
| **`,`**                                                      |



## 补充：Unicode编码表

Unicode官网：[https://home.unicode.org/](https://home.unicode.org/)

在字符串中使用转义字符输入Unicode编码：`\u四位编码`

在网页中使用Unicode编码：`&#编码;` 这里的编码需要的是10进制

