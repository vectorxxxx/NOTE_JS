> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# Date和Math

## 1、Date

在JS中使用`Date`对象来表示一个时间

### 创建一个时间对象

如果直接使用构造函数创建一个`Date`对象，则会封装为当前代码执行的时间

```javascript
// 创建一个Date对象
// 如果直接使用构造函数创建一个Date对象，则会封装为当前代码执行的时间
var d = new Date();
console.log(d); // Fri Jul 30 2021 21:51:37 GMT+0800 (中国标准时间)
```

### 创建一个指定的时间对象

需要在构造函数中传递一个表示时间的字符串作为参数

日期的格式：`月/日/年 时:分:秒`

```javascript
d = new Date("08/01/2021 12:34:56");
console.log(d); // Sun Aug 01 2021 12:34:56 GMT+0800 (中国标准时间)
d = new Date("08/01/21 12:34:56"); // 为了避免在不同浏览器中产生歧义，尽量指定完整年份
console.log(d); // IE：Mon Aug 01 1921 12:34:56 GMT+0800 (中国标准时间)
```

### Date方法

![image-20210730220407701](https://i.loli.net/2021/07/30/zKbtL3HJSXDjqmW.png)

#### getDate()

获取当前日期对象是几日

```javascript
var date = d.getDate();
console.log("date = " + date); // date = 30
```

#### getDay()

获取当前日期对象时周几，会返回一个**0-6**的值

- 0 表示 周日
- 1 表示 周一
- ......
- 6 表示 周六

```javascript
var day = d.getDay();
console.log("day = " + day); // day = 5
```

#### getMonth()

获取当前时间对象的月份-会返回一个**0-11**的值

- 0 表示 1月
- 1 表示 2月
- ......
- 11 表示 12月

```javascript
var month = d.getMonth();
console.log("month = " + month); // month = 6
console.log("month = " + (month + 1)); // month = 7
```

#### getFullYear()

获取当前日期对象的年份

```javascript
var year = d.getFullYear();
console.log("year = " + year); // year = 2021
```

#### getTime()

获取当前日期对象的**时间戳**

时间戳，指的是从格林威治标准时间的**1970年1月1日0时0分0秒**到当前日期所花费的毫秒数

计算机底层在保存时间时使用都是时间戳

```javascript
// 示例：表示从1970年1月1日0时0分0秒到2021年22时25分26秒所花费的毫秒数
var time = d.getTime();
console.log(d); // Fri Jul 30 2021 22:25:26 GMT+0800 (中国标准时间)
console.log("time = " + time); // time = 1627655017435
```

既然时间是从格林威治标准时间开始计算的，是不是就意味着**1970年1月1日0时0分0秒**的时间戳就是0呢？

```javascript
var d2 = new Date("01/01/1970 00:00:00");
var time = d2.getTime();
console.log("time = " + time); // time = -28800000
```

我们发现事实并非如此，为什么呢？

这是因为我们的系统是中文系统，采用的是东八区时间，如何验证呢？

```javascript
console.log("距离格林威治时间还有" + -time/1000/60/60 + "小时"); // 距离格林威治时间还有8小时
```

**获取当前的时间戳**

```javascript
var currentTime = Date.now();
console.log("currentTime = " + currentTime); // currentTime = 1627655852125
```

#### 其他

```javascript
var hour = d.getHours();
var minute = d.getMinutes();
var second = d.getSeconds();
var mmilliSecond = d.getMilliseconds();
console.log("hour = " + hour); // hour = 22
console.log("minute = " + minute); // minute = 21
console.log("second = " + second); // second = 11
console.log("mmilliSecond = " + mmilliSecond); // mmilliSecond = 149
```



## 2、Math

`Math`和其他的对象不同，不是一个构造函数

属于一个工具类，不用创建对象，里边封装了数学运算相关的属性和方法

### Math对象属性

![image-20210730224441680](https://i.loli.net/2021/07/30/MZFsPXyDCRNdtfo.png)

```javascript
console.log(Math.E); // 2.718281828459045
console.log(Math.PI); // 3.141592653589793
```

### Math对象方法

![image-20210730224743982](https://i.loli.net/2021/07/30/vBxrAkmeQ2tGzKf.png)

#### Math.abs()

可以用来计算一个数的绝对值

```javascript
console.log(Math.abs(-1)); // 1
```

#### Math.ceil()

可以对一个数进行向上取整，小数位只有有值就自动进1

```javascript
console.log(Math.ceil(1.001)); // 2
console.log(Math.ceil(1.0));   // 1
```

#### Math.floor()

可以对一个数进行向下取整，小数部分会被舍掉

```javascript
console.log(Math.floor(1.999999)); // 1
```

#### Math.round()

可以对一个数进行四舍五入取整

```javascript
console.log(Math.round(1.4)); // 1
console.log(Math.round(1.5)); // 2
```

#### Math.random()

可以用来生成一个**0-1**之间的随机数（开区间范围：`(0, 1)`）

```javascript
console.log(Math.random()); // 0.9192011449766921
console.log(Math.random()); // 0.736135736878959
```

生成一个**0-10**之间的随机数：`Math.round(Math.random() * 10)`

生成一个**0-X**之间的随机数：`Math.round(Math.random() * X)`

生成一个**1-10**之间的随机数：`Math.round(Math.random() * 9 + 1)`

生成一个**X-Y**之间的随机数：`Math.round(Math.random() * (Y - X) + X)`

#### Math.max()

可以获取多个数中的最大值

```javascript
console.log(Math.max(3,6,7,33)); // 33
```

#### Math.min()

可以获取多个数中的最小值

```javascript
console.log(Math.min(3,6,7,33)); // 3
```

#### Math.pow()

`Math.pow(x, y)`返回x的y次幂

```javascript
console.log(Math.pow(2,10)); // 1024
```

#### Math.sqrt()

用于对一个数进行开方运算

```javascript
console.log(Math.sqrt(81)); // 9
```

