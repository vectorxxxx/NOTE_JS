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

### 量词

![image-20210801094306628](https://i.loli.net/2021/08/01/NHQP4FVk1ATS3vC.png)

通过量词可以设置一个内容出现的次数

量词只对它前边的一个内容起作用

- `{n}`正好出现n次

  ```javascript
  // 创建一个正则表达式检查一个字符串中是否含有aaa
  var reg = /a{3}/;
  console.log(reg.test("aaabc")); // true
  // 创建一个正则表达式检查一个字符串中是否含有ababab
  reg = /ab{3}/;
  console.log(reg.test("ababab")); // false
  console.log(reg.test("aaabbb")); // true
  reg = /(ab){3}/;
  console.log(reg.test("ababab")); // true
  ```

- `{m,n}`出现m-n次

  ```javascript
  reg = /ab{3,4}c/;
  console.log(reg.test("abbc")); // false
  console.log(reg.test("abbbc")); // true
  console.log(reg.test("abbbbc")); // true
  console.log(reg.test("abbbbbc")); // false
  ```

- `{m,}` 出现m次以上

  ```javascript
  reg = /ab{3,}c/;
  console.log(reg.test("abbbc")); // true
  console.log(reg.test("abbbbbc")); // true
  ```

- `+`至少一个，相当于`{1,}`

  ```javascript
  reg = /ab+c/;
  console.log(reg.test("ac")); // false
  console.log(reg.test("abc")); // true
  console.log(reg.test("abbbc")); // true
  ```

- `*`0个或多个，相当于`{0,}`

  ```javascript
  reg = /ab*c/;
  console.log(reg.test("ac")); // true
  console.log(reg.test("abbc")); // true
  console.log(reg.test("abbbc")); // true
  ```

- `?`0个或1个，相当于`{0,1}`

  ```javascript
  reg = /ab?c/;
  console.log(reg.test("ac")); // true
  console.log(reg.test("abc")); // true
  console.log(reg.test("abbc")); // false
  ```

- `^`表示开头

  ```javascript
  // 检查一个字符串中是否以a开头
  reg = /^a/;
  console.log(reg.test("ac")); // true
  console.log(reg.test("bac")); // false
  ```

- `$`表示结尾

  ```javascript
  // 检查一个字符串中是否以a结尾
  reg = /a$/;
  console.log(reg.test("abac")); // false
  console.log(reg.test("abaca")); // true
  ```

- 如果在正则表达式中同时使用`^`、`$`，要求字符串必须完全符合正则表达式

  ```javascript
  // 以a开头，并立即以a结尾
  reg = /^a$/;
  console.log(reg.test("aba")); // false
  console.log(reg.test("a")); // true
  // 以a开头，或者以a结尾
  reg = /^a|a$/;
  console.log(reg.test("aba")); // true
  console.log(reg.test("a")); // true
  ```

**练习：**创建一个正则表达式，用来检查一个字符串是否是一个合法的手机号

- 第二位：以1开头
- 第二位：3-9任意数字
- 三位以后：任意数字9个

```javascript
reg = /^1[3-9][0-9]{9}$/;
console.log(reg.test("a14567876543")); // false
console.log(reg.test(1456787)); // false
console.log(reg.test(12567876543)); // false
console.log(reg.test(13567876543)); // true
```

**小结**

| 量词     | 描述                            |
| :------- | :------------------------------ |
| `n+`     | 匹配任何包含至少一个n的字符串   |
| `n*`     | 匹配任何包含零个或多个n的字符串 |
| `n?`     | 匹配任何包含零个或一个n的字符串 |
| `n{X}`   | 匹配包含X个n的序列的字符串      |
| `n{X,Y}` | 匹配包含X或Y个n的序列的字符串   |
| `n{X,}`  | 匹配包含至少X个n的序列的字符串  |
| `n$`     | 匹配任何结尾为n的字符串         |
| `^n`     | 匹配任何开头为n的字符串         |

### 元字符

![image-20210801104551084](https://i.loli.net/2021/08/01/buwlvEJMs42pdCa.png)

检查一个字符串中是否含有`.`

```javascript
var reg = /./;
console.log(reg.test("ab")); // true
console.log(reg.test("a.b")); // true
```

`.`表示任意字符

在正则表达式中使用`\`作为转义字符

- `\.`来表示`.`

  ```javascript
  reg = /\./;
  console.log(reg.test("ab")); // false
  console.log(reg.test("a.b")); // true
  ```

- `\\`表示`\`

  ```javascript
  reg = /\\/;
  console.log(reg.test("ab")); // false
  console.log(reg.test("a\")); // Uncaught SyntaxError: Invalid or unexpected token
  console.log(reg.test("a\b")); // false
  console.log(reg.test("a\\b")); // true
  ```

**注意：**使用构造函数时，由于它的参数是一个字符串，而`\`是字符串中转义字符

```javascript
reg = new RegExp("\."); // 相当于 reg = /./，即包含任意字符
console.log(reg); //  /./
console.log(reg.test("ab")); // true
console.log(reg.test("a\b")); // true
console.log(reg.test("a\\b")); // true
console.log(reg.test("a.b")); // true
```

如果要使用`\`，则需要使用`\\`来代替

```javascript
reg = new RegExp("\\."); // 相当于 reg = /\./，即包含`.`
console.log(reg); //  /\./
console.log(reg.test("ab")); // false
console.log(reg.test("a\b")); // false
console.log(reg.test("a\\b")); // false
console.log(reg.test("a.b")); // true
```

如果要使用`\\`，则需要使用`\\\\`来代替

```javascript
reg = new RegExp("\\\\."); // 相当于 reg = /\\./，即包含`\任意字符`
console.log(reg); //  /\\./
console.log(reg.test("ab")); // false
console.log(reg.test("a\b")); // false
console.log(reg.test("a\\b")); // true
console.log(reg.test("a.b")); // false
```

- `\w	`任意字母、数字、`_`，相当于`[A-z0-9_]`

  ```javascript
  reg = /\w/;
  console.log(reg.test("abc")); // true
  console.log(reg.test(123)); // true
  console.log(reg.test("_")); // true
  console.log(reg.test("!@#$%^&*()")); // false
  ```

- `\W	`除了字母、数字、`_`，相当于`[^A-z0-9_]`

  ```javascript
  reg = /\W/;
  console.log(reg.test("abc")); // false
  console.log(reg.test(123)); // false
  console.log(reg.test("_")); // false
  console.log(reg.test("!@#$%^&*()")); // true
  ```

- `\d	`任意数字，相当于`[0-9]`

  ```javascript
  reg = /\d/;
  console.log(reg.test("abc")); // false
  console.log(reg.test(123)); // true
  console.log(reg.test("_")); // false
  console.log(reg.test("!@#$%^&*()")); // false
  ```

- `\D	`除了数字，相当于`[^0-9]`

  ```javascript
  reg = /\D/;
  console.log(reg.test("abc")); // true
  console.log(reg.test(123)); // false
  console.log(reg.test("_")); // true
  console.log(reg.test("!@#$%^&*()")); // true
  ```

- `\s	`空格

  ```javascript
  reg = /\s/;
  console.log(reg.test("abc")); // false
  console.log(reg.test(123)); // false
  console.log(reg.test("_")); // false
  console.log(reg.test("!@#$%^&*()")); // false
  console.log(reg.test("d35@ d")); // true
  ```

- `\S	`除了空格

  ```javascript
  reg = /\S/;
  console.log(reg.test("abc")); // true
  console.log(reg.test(123)); // true
  console.log(reg.test("_")); // true
  console.log(reg.test("!@#$%^&*()")); // true
  console.log(reg.test(" ")); // false
  ```

- `\b	`单词边界

  ```javascript
  reg = /child/;
  console.log(reg.test("child")); // true
  console.log(reg.test("hello children")); // true
  reg = /\bchild\b/;
  console.log(reg.test("child")); // true
  console.log(reg.test("hello children")); // false
  console.log(reg.test("hello child ren")); // true
  ```

- `\B	`除了单词边界

  ```javascript
  reg = /\Bchild\b/;
  console.log(reg.test("child")); // false
  console.log(reg.test("hello children")); // false
  console.log(reg.test("hello child ren")); // false
  console.log(reg.test("hellochild ren")); // true
  ```



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

**练习：**去除用户输入中的前后空格

```javascript
// 接收一个用户的输入
var str = "    hello world  ";
console.log(str); //     hello world  
// 去除掉字符串中的空格
// 去除空格就是使用""来替换空格
var result = str.replace(/\s/g,""); 
console.log(result); // helloworld  
// 去除前面的空格
result = str.replace(/^\s+/,""); 
console.log(result); // hello world  
// 去除后面的空格
result = str.replace(/\s+$/,""); 
console.log(result); //     hello world
// 去除前面和后面的空格
result = str.replace(/^\s+|\s$/g,""); 
console.log(result); // hello world
```



## 5、邮件正则

`任意字母数字下划线(.任意字母数字下划线){0个或多个}@任意字母数字.任意字母（2-5位）(.任意字母（2-5位）){0个或多个}`

```javascript
var reg = /^\w+(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5})+$/;
str = "Vector123_.xxx.163@outLOOK123.Com.cn";
console.log(reg.test(str)); // true
str = "Vector123_.xxx.163@outLOOK123.com123.cn";
console.log(reg.test(str)); // false
str = "#$%^&*()Vector123_.xxx.163@outLOOK123.com123.cn";
console.log(reg.test(str)); // false
```



---



## 附录：常用正则表达式[^1]

### 校验数字的表达式

```javascript
数字：^[0-9]*$
n位的数字：^\d{n}$
至少n位的数字：^\d{n,}$
m-n位的数字：^\d{m,n}$
零和非零开头的数字：^(0|[1-9][0-9]*)$
非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$
带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})?$
正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$
有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$
非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$
非负整数：^\d+$ 或 ^[1-9]\d*|0$
非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$
```

### 校验字符的表达式

```javascript
汉字：^[\u4e00-\u9fa5]{0,}$
英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$
长度为3-20的所有字符：^.{3,20}$
由26个英文字母组成的字符串：^[A-Za-z]+$
由26个大写英文字母组成的字符串：^[A-Z]+$
由26个小写英文字母组成的字符串：^[a-z]+$
由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$
中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$
中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+
禁止输入含有~的字符：[^~\x22]+
```

### 特殊需求表达式

```javascript
Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?
InternetURL：[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$
手机号码：^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$ (由于工信部放号段不定时，所以建议使用泛解析 ^([1][3,4,5,6,7,8,9])\d{9}$)
电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$ 
国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7} 
18位身份证号码(数字、字母x结尾)：^((\d{18})|([0-9x]{18})|([0-9X]{18}))$
帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$  
日期格式：^\d{4}-\d{1,2}-\d{1,2}
一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$
一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$ 
钱的输入格式：
    1.有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：^[1-9][0-9]*$ 
    2.这表示任意一个不以0开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：^(0|[1-9][0-9]*)$ 
    3.一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：^(0|-?[1-9][0-9]*)$ 
    4.这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧.下面我们要加的是说明可能的小数部分：^[0-9]+(.[0-9]+)?$ 
    5.必须说明的是,小数点后面至少应该有1位数,所以"10."是不通过的,但是 "10" 和 "10.2" 是通过的：^[0-9]+(.[0-9]{2})?$ 
    6.这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：^[0-9]+(.[0-9]{1,2})?$ 
    7.这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$ 
    8.1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$ 
    备注：这就是最终结果了,别忘了"+"可以用"*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$
中文字符的正则表达式：[\u4e00-\u9fa5]
双字节字符：[^\x00-\xff]    (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
空白行的正则表达式：\n\s*\r    (可以用来删除空白行)
HTML标记的正则表达式：<(\S*?)[^>]*>.*?</\1>|<.*? />    (网上流传的版本太糟糕，上面这个也仅仅能部分，对于复杂的嵌套标记依旧无能为力)
首尾空白字符的正则表达式：^\s*|\s*$或(^\s*)|(\s*$)    (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
腾讯QQ号：[1-9][0-9]{4,}    (腾讯QQ号从10000开始)
中国邮政编码：[1-9]\d{5}(?!\d)    (中国邮政编码为6位数字)
IP地址：\d+\.\d+\.\d+\.\d+    (提取IP地址时有用)
IP地址：((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))    (由@飞龙三少 提供,感谢共享)
```

> 作者：[zxin](http://www.cnblogs.com/zxin/)
>
> 出处：[http://zxin.cnblogs.com/](http://www.cnblogs.com/zxin/)
>
> 本文版权归作者和博客园共有，欢迎转载，但未经作者同意必须保留此段声明，且在文章页面明显位置给出原文连接，否则保留追究法律责任的权利。

---

**参考资料**

[^1]: 最全的常用正则表达式大全——包括校验数字、字符、一些特殊的需求等等 [https://www.cnblogs.com/zxin/archive/2013/01/26/2877765.html](https://www.cnblogs.com/zxin/archive/2013/01/26/2877765.html)

