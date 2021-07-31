> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 正则表达式

正则表达式用于定义一些字符串的规则，计算机可以根据正则表达式，来检查一个字符串是否符合规则，获取将字符串中符合规则的内容提取出来

## 1、正则对象

语法：`var 变量 = new RegExp("正则表达式", "匹配模式");`

```javascript
// 这个正则表达式可以来检查一个字符串中是否含有a
var reg = new RegExp("a");
console.log(reg); // /a/
```

使用`typeof`检查正则对象，会返回`object`

```javascript
console.log(typeof reg); // object
```



## 2、正则方法

正则表达式的方法：`test()`

使用这个方法可以用来检查一个字符串是否符合正则表达式的规则，如果符合则返回`true`，否则返回`false`

```javascript
var result = reg.test("abd");
console.log(result); // true
result = reg.test("hgf");
console.log(result); // false
result = reg.test("Abd");
console.log(result); // false
```

在构造函数中可以传递一个匹配模式作为第二个参数，可以是

- `i` ignoreCase，忽略大小写
- `g` global，全局匹配模式

```javascript
reg = new RegExp("a","i");
result = reg.test("Abd");
console.log(result); // true
```



## 3、正则语法

使用字面量来创建正则表达式，语法：`var 变量 = /正则表达式/匹配模式;`

使用字面量的方式创建更加简单；使用构造函数创建更加灵活

```javascript
reg = /a/i;
result = reg.test("Abd");
console.log(result); // true
```

使用`|`表示或者的意思

```javascript
// 创建一个正则表达式，检查一个字符串中是否有a或b或c
reg = /a|b|c/i;
result = reg.test("Abcd");
console.log(result); // true
result = reg.test("bcd");
console.log(result); // true
result = reg.test("cd");
console.log(result); // true
result = reg.test("d");
console.log(result); // false
```

`[]`里的内容也是或的关系：`[abc] == a|b|c`

```javascript
reg = /[abc]/i;
result = reg.test("bcd");
console.log(result); // true
```

`[a-z]`任意小写字母

```javascript
reg = /[a-z]/;
result = reg.test("Abc");
console.log(result); // true
result = reg.test("ABC");
console.log(result); // false
```

`[A-Z]`任意大写字母

```javascript
reg = /[A-Z]/;
result = reg.test("abc");
console.log(result); // false
result = reg.test("ABC");
console.log(result); // true
```

`[A-z]`任意字母

```javascript
reg = /[A-z]/;
result = reg.test("abc");
console.log(result); // true
result = reg.test("ABC");
console.log(result); // true
```

`[0-9]`任意数字

```javascript
reg = /[0-9]/;
result = reg.test("123");
console.log(result); // true
result = reg.test("abc");
console.log(result); // false
```

**练习：**检查一个字符串中是否含有abc或adc或aec

```javascript
reg = /a[bde]c/;
result = reg.test("adc");
console.log(result); // true
result = reg.test("addc");
console.log(result); // false
```

`[^ ]`除了

```javascript
reg = /[^a]/; // 除了a以外的字符
result = reg.test("a");
console.log(result); // false
result = reg.test("b");
console.log(result); // true
```

`[^0-9]`除了数字

```javascript
reg = /[^0-9]/;
result = reg.test("123");
console.log(result); // false
result = reg.test("abc");
console.log(result); // true
```

**小结**

| 表达式            | 描述                         |
| :---------------- | :--------------------------- |
| `[abc]`           | 查找方括号之间的任何字符     |
| `[^abc]`          | 查找任何不在方括号之间的字符 |
| `[0-9]`           | 查找任何从0至9的数字         |
| `[a-z]`           | 查找任何从小写a到小写z的字符 |
| `[A-Z]`           | 查找任何从大写A到大写Z的字符 |
| `[A-z]`           | 查找任何从大写A到小写z的字符 |
| `[ojbk]`          | 查找给定集合内的任何字符     |
| `[^ojbk]`         | 查找给定集合外的任何字符     |
| `(ed|blue|green)` | 查找任何指定的选项           |



## 4、字符串和正则相关的方法

![image-20210731202642886](https://i.loli.net/2021/07/31/tMZjXSe8UwbEJxa.png)

### split()

可以将一个字符串拆分为一个数组，不会影响原字符串

方法中可以传递一个正则表达式作为参数，这样方法将会根据正则表达式去拆分字符串

`split()`方法即使不指定全局匹配，也会全都拆分

```javascript
// 根据任意字母来将字符串拆分
var str = "1a2b3c4d5e6f7g8h9i0";
var result = str.split(/[A-z]/);
console.log(str); // 1a2b3c4d5e6A7B8C9D0
console.log(result); // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
```

### search()

可以搜索字符串中是否含有指定内容，不会影响原字符串

如果搜索到指定内容，则会返回第一次出现的索引，如果没有搜索到返回-1

它可以接受一个正则表达式作为参数，然后会根据正则表达式去检索字符串

`search()`只会查找第一个，即使设置全局匹配也没用

```javascript
str = "Hello abc Hello afc agc";
result = str.search(/a[A-z]c/);
console.log(str); // 1a2b3c4d5e6A7B8C9D0
console.log(result); // 6
```

### match()

可以根据正则表达式，从一个字符串中将符合条件的内容提取出来，不会影响原字符串

默认情况下我们的match只会找到第一个符合要求的内容，找到以后就停止检索

```javascript
str = "1a2b3c4d5e6A7B8C9D0";
result = str.match(/[a-z]/);
console.log(str); // 1a2b3c4d5e6A7B8C9D0
console.log(result); // ["a", index: 1, input: "1a2b3c4d5e6A7B8C9D0", groups: undefined]
```

可以设置正则表达式为全局匹配模式，这样就会匹配到所有的内容

```javascript
result = str.match(/[a-z]/g);
console.log(result); // ["a", "b", "c", "d", "e"]
```

可以为一个正则表达式设置多个匹配模式，且顺序无所谓

```javascript
result = str.split(/[a-z]/ig);
console.log(result); // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
```

`match()`会将匹配到的内容封装到一个数组中返回，即使只查询到一个结果

```javascript
console.log(Array.isArray(result)); // true
console.log(result[0]); // a
console.log(result[5]); // A
```

### replace()

可以将字符串中指定内容替换为新的内容，不会影响原字符串

参数：

1. 被替换的内容，可以接受一个正则表达式作为参数
2. 新的内容

```javascript
result = str.replace("a","@_@");
console.log(str); // 1a2b3c4d5e6A7B8C9D0
console.log(result); // 1@_@2b3c4d5e6A7B8C9D0
```

默认只会替换第一个，可以使用正则表达式的全局匹配模式

```javascript
str = "1a2a3a4a5a6A7B8C9D0";
result = str.replace("a","@_@");
console.log(result); // 1@_@2a3a4a5a6A7B8C9D0
result = str.replace(/a/g,"@_@");
console.log(result); // 1@_@2@_@3@_@4@_@5@_@6A7B8C9D0
result = str.replace(/a/gi,"@_@");
console.log(result); // 1@_@2@_@3@_@4@_@5@_@6@_@7B8C9D0
result = str.replace(/[a-z]/gi,"@_@");
console.log(result); // 1@_@2@_@3@_@4@_@5@_@6@_@7@_@8@_@9@_@0
result = str.replace(/[a-z]/gi,"");
console.log(result); // 1234567890
```

**小结**

- `split()`方法用于拆分，即使不指定全局匹配，也会全都拆分
- `search`方法用于搜索，只会查找第一个，即使设置全局匹配也没用
- `match`方法用于提取
- `replace`方法用于替换

