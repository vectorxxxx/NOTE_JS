> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 数组

## 1、数组简介

数组也是一个对象

它和我们普通对象功能类似，也是用来存储一些值的

不同的是普通对象是使用字符串作为属性名的，而数组时使用数字来作为索引操作元素

**索引：从0开始的整数就是索引**

![image-20210728193018085](https://i.loli.net/2021/07/28/K7nQ9IRsvxZ6UTA.png)

数组的存储性能比普通对象要好，在开发中我们经常使用数组来存储一些数据

```javascript
// 创建数组对象
var arr=new Array();
// 使用typeof检查一个数组时，会返回object
console.log(typeof arr); // object
```

### 向数组中添加元素

语法：`数组[索引] = 值`

```javascript
arr[0] = 10;
arr[1] = 33;
arr[2] = 22;
```

### 读取数组中的元素

语法：`数组[索引]`

如果读取不存在的索引，不会报错而是返回`undefined`

```javascript
console.log(arr[2]); // 22
console.log(arr[3]); // undefined
```

### 获取数组的长度

可以使用`length`属性来获取数组的长度（元素的个数）语法：`数组.length`

- 对于连续的数组，使用`length`可以获取到数组的长度（元素的个数）
- 对于非连续的数组，使用`length`会获取到数组的最大的索引 + 1

```javascript
console.log(arr.length); // 3
console.log(arr); // {"0":10,"1":33,"2":22,"length":3}
arr[10] = 33;
console.log(arr.length); // 11
console.log(arr); // {"0":10,"1":33,"10":33,"2":22,"length":11}
```

尽量不要创建非连续的数组

### 修改数组的长度

- 如果修改的`length`大于原长度，则多出部分会空出来
- 如果修改的`length`小于原长度，则多出的元素会被删除

```javascript
arr.length = 100;
console.log(arr.length); // 100
console.log(arr); // {"0":10,"1":33,"10":33,"2":22,"length":100}
arr.length = 2;
console.log(arr.length); // 2
console.log(arr); // {"0":10,"1":33,"length":2}
```

### 向数组最后一位添加元素

语法：`数组[数组.length] = 值;`

```javascript
arr[arr.length] = 22;
console.log(arr.length); // 3
console.log(arr); // {"0":10,"1":33,"2":22,"length":3}
arr[arr.length] = 33;
console.log(arr.length); // 4
console.log(arr); // {"0":10,"1":33,"2":22,"3":33,"length":4}
```



## 2、创建数组的方式

### 使用字面量创建数组

语法：`[]`

```javascript
var arr1 = [];
console.log(arr1); // {"length":0}
console.log(typeof arr1); // object
console.log(arr1.length); // 0
```

使用字面量创建数组时，可以在创建时就指定数组中的元素

```javascript
var arr2 = [1,2,3,4,5,10];
console.log(arr2);  // {"0":1,"1":2,"2":3,"3":4,"4":5,"5":10,"length":6} 
console.log(arr2.length); // 6	
```

### 使用构造函数创建数组

使用构造函数创建数组时，也可以同时添加元素，将要添加的元素作为构造函数的参数传递

元素之间使用`,`隔开

```javascript
var arr3 = new Array(1,2,3,4,5);
console.log(arr3);  // {"0":1,"1":2,"2":3,"3":4,"4":5,"length":5} 
console.log(arr3.length); // 5
```

**字面量和构造函数只有一个数字时的区别**

```javascript
// 创建一个数组数组中只有一个元素10
var arr4 = [10];
// 创建一个长度为10的数
var arr5 = new Array(10);
console.log(arr4.length);  // 1
console.log(arr5.length);  // 10
```



## 3、数组元素类型

### 任意的数据类型

数字、字符串、布尔值、`null`、`undefined`

```javascript
var arr6 = [2, "13", true, null, undefined];
console.log(arr6); 
// Array(5)
// 	0: 2
// 	1: "13"
// 	2: true
// 	3: null
// 	4: undefined
// 	length: 5
```

### 对象

```javascript
// **也可以是对象**
var obj = {name:"孙悟空"};
var arr7 = [];
arr7[arr7.length] = obj;
console.log(arr7); // {"0":{"name":"孙悟空"},"length":1} 
arr7 = [{name:"孙悟空"}, {name:"沙和尚"}, {name:"猪八戒"}];
console.log(arr7); // {"0":{"name":"孙悟空"},"1":{"name":"沙和尚"},"2":{"name":"猪八戒"},"length":3}
```

### 函数

```javascript
arr7 = [function(){alert(1)},function(){alert(2)}]; 
console.log(arr7); // {"0":"function (){alert(1)}","1":"function (){alert(2)}","length":2}
```

### 数组

数组中也可以放数组，如下这种数组我们称为**二维数组**

```javascript
arr7 = [[1,2,3],[4,5,6],[7,8,9]];
console.log(arr7); // {"0":{"0":1,"1":2,"2":3,"length":3},"1":{"0":4,"1":5,"2":6,"length":3},"2":{"0":7,"1":8,"2":9,"length":3},"length":3}
```



## 4、数组的方法

数组的方法有很多，这里兹介绍常用的几个方法

![image-20210728203916328](https://i.loli.net/2021/07/28/QdKCH1hIcq5AxXZ.png)

### push()

该方法可以向数组的末尾添加一个或多个元素，并返回数组的新的长度

可以将要添加的元素作为方法的参数传递，这样这些元素将会自动添加到数组的末尾

```javascript
var result = arr.push("唐三藏");
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏"]
arr.push("菩提老祖", "地藏菩萨", "弥勒佛"); 
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨", "弥勒佛"]
console.log("result = " + result); // result = 4
```

### pop()

该方法可以删除数组的最后一个元素，并将被删除的元素作为返回值返回

```javascript
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨", "弥勒佛"]
var result = arr.pop();
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
console.log("result = " + result); // result = 弥勒佛
```

### unshift()

向数组开头添加一个或多个元素，并返回新的数组长度

向前边插入元素以后，其他的元素索引会依次调整

```javascript
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
result = arr.unshift("牛魔王", "二郎神");
console.log(arr); // ["牛魔王", "二郎神", "孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
console.log("result = " + result); // result = 8
```

### shift()

可以删除数组的第一个元素，并将被删除的元素作为返回值返回

```javascript
console.log(arr); // ["牛魔王", "二郎神", "孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
result = arr.shift();
console.log(arr); // ["二郎神", "孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
console.log("result = " + result); // result = 7
```

**小结**

| 操作     | 添加                | 删除              |
| :------- | :------------------ | :---------------- |
| 末尾操作 | `push`：末尾添加    | `pop`：末尾删除   |
| 开头操作 | `unshift`：开头添加 | `shift`：开头删除 |

### slice()

从某个已有的数组返回选定的元素，可以用来从数组提取指定元素

该方法不会改变元素数组，而是将截取到的元素封装到一个新数组中返回参数：

- 截取开始的位置的索引，包含开始索引
- 截取结束的位置的索引，不包含结束索引

```javascript
result = arr.slice(0,3);
console.log(result); // ["二郎神", "孙悟空", "猪八戒"]
```

第二个参数可以省略不写，此时会截取从开始索引往后的所有元素

```javascript
result = arr.slice(3);
console.log(result); // ["沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
```

索引可以传递一个负值，如果传递一个负值，则从后往前计算

- -1 倒数第一个
- -2 倒数第二个

```javascript
result = arr.slice(4, -1);
console.log(result); // ["唐三藏", "菩提老祖"]
```

### splice()

删除元素，并向数组添加新元素。可以用于删除数组中的指定元素

使用`splice()`会影响到原数组，会将指定元素从原数组中删除，并将被删除的元素作为返回值返回

参数：

- 第一个，表示开始位置的索引

- 第二个，表示删除的数量

  ```javascript
  arr = ["牛魔王", "二郎神", "孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"];
  result = arr.splice(0, 2);
  console.log(result); // ["牛魔王", "二郎神"]
  console.log(arr); // ["孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
  
  arr = ["牛魔王", "二郎神", "孙悟空", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"];
  result = arr.splice(1, 2);
  console.log(result); // ["二郎神", "孙悟空"]
  console.log(arr); // ["牛魔王", "猪八戒", "沙悟净", "唐三藏", "菩提老祖", "地藏菩萨"]
  ```

- 第三个及以后，可以传递一些新的元素，这些元素将会自动插入到开始位置索引前边

  ```javascript
  // 替换元素
  arr = ["孙悟空", "猪八戒", "沙悟净", "唐三藏"];
  result = arr.splice(0, 1, "牛魔王", "铁扇公主", "红孩儿");
  console.log(result); // ["孙悟空"]
  console.log(arr); // ["牛魔王", "铁扇公主", "红孩儿", "猪八戒", "沙悟净", "唐三藏"]
  // 插入元素
  arr = ["孙悟空", "猪八戒", "沙悟净", "唐三藏"];
  result = arr.splice(0, 0, "牛魔王", "铁扇公主", "红孩儿");
  console.log(result); // []
  console.log(arr); // ["牛魔王", "铁扇公主", "红孩儿", "孙悟空", "猪八戒", "沙悟净", "唐三藏"]
  ```

**小结**

- `slice`可以提取数组中指定元素
- `splice`可以删除元素、替换元素、插入元素（功能更强大）

### concat()

`concat()`可以连接两个或多个数组，并将新的数组返回

该方法不会对原数组产生影响

```javascript
var arr1 = ["孙悟空", "猪八戒", "沙悟净"];
var arr2 = ["青毛狮子怪", "黄牙老象", "大鹏金翅雕"];
var arr3 = ["虎力大仙", "鹿力大仙", "羊力大仙"];
var arr4 = arr1.concat(arr2,arr3,"牛魔王","铁扇公主","红孩儿");
console.log(arr1); // ["孙悟空", "猪八戒", "沙悟净"]
console.log(arr2); // ["青毛狮子怪", "黄牙老象", "大鹏金翅雕"]
console.log(arr3); // ["虎力大仙", "鹿力大仙", "羊力大仙"]
console.log(arr4); // ["孙悟空", "猪八戒", "沙悟净", "青毛狮子怪", "黄牙老象", "大鹏金翅雕", "虎力大仙", "鹿力大仙", "羊力大仙", "牛魔王", "铁扇公主", "红孩儿"]
```

### join()

该方法可以将数组转换为一个字符串

该方法不会对原数组产生影响，而是将转换后的字符串作为结果返回

在`join()`中可以指定一个字符串作为参数，这个字符串将会成为数组中元素的连接符

如果不指定连接符，则默认使用`,`作为连接符

```javascript
var arr = ["孙悟空", "猪八戒", "沙悟净"];
var result = arr.join();
console.log(arr); // ["孙悟空", "猪八戒", "沙悟净"]
console.log(result); // 孙悟空,猪八戒,沙悟净
console.log(typeof result); // string

result = arr.join("");
console.log(result); // 孙悟空猪八戒沙悟净

result = arr.join("@");
console.log(result); // 孙悟空@猪八戒@沙悟净
```

### reverse()

该方法用来反转数组（前边的去后边，后边的去前边）

该方法会直接修改原数组

```javascript
var arr = ["孙悟空", "猪八戒", "沙悟净"];
arr.reverse();
console.log(arr); // ["沙悟净", "猪八戒", "孙悟空"]
```

### sort()

可以用来对数组中的元素进行排序

也会影响原数组，默认会按照Unicode编码进行排序

```javascript
var arr = ['f', 'b', 'a', 'h', 'e', 'd'];
arr.sort();
console.log(arr); // ["a", "b", "d", "e", "f", "h"]
```

即使对于纯数字的数组，使用`sort()`排序时，也会按照Unicode编码来排序

所以对数字进行排序时，可能会得到错误的结果

```javascript
arr = ['2', '44', '9', '8', '2', '0'];
arr.sort();
console.log(arr); // ["0", "2", "2", "44", "8", "9"]
```

我们可以目己采指正排序的现则我们可以在`sort()`添加一个回调函数，来指定排序规则

回调函数中需要定义两个形参，浏览器将会分别使用数组中的元素作为实参去调用回调函数

使用哪个元素调用不确定，但是肯定的是在数组中a一定在b前边

浏览器会根据回调函数的返回值来决定元素的顺序，

- 如果返回一个大于0的值，则元素会交换位置
- 如果返回一个小于等于0的值，则元素位置不变

```javascript
arr = [2, 44, 9, 8, 2, 0, 6];
arr.sort(function(a,b){
    if(a > b){
        return 1;
    } else {
        return -1;
    }
});
console.log(arr); // [0, 2, 2, 6, 8, 9, 44]
```

- 如果需要升序排列，则返回`a - b`
- 如果需要降序排列，则返回`b - a`

```javascript
arr.sort(function(a,b){
    // 升序排列
    return a - b;
});
console.log(arr); // [0, 2, 2, 6, 8, 9, 44]
arr.sort(function(a,b){
    // 降序排列
    return b - a;
});
console.log(arr); // [44, 9, 8, 6, 2, 2, 0]
```

**小结**

- 会对原数组产生影响的方法：`push`、`pop`、`shift`、`unshift`、`splice`、`reverse`、`sort`
- 不会对原数组产生影响的方法：`slice`、`concat`、`join`
- 添加元素的方法：`push`、`unshift`、`splice`
- 删除元素的方法：`pop`、`shift`、`splice`
- 替换元素的方法：`splice`
- 连接元素的方法：`concat`、`join`
- 排序方法：`reverse`、`sort`



## 5、数组遍历

### 普通for循环

所谓的遍历数组，就是将数组中所有的元素都取出来

```javascript
var arr = ["孙悟空", "猪八戒", "沙悟净", "白龙马"];
// 所谓的遍历数组，就是将数组中所有的元素都取出来
for(var i=0;i<arr.length;i++){
    console.log(arr[i]);
}
```

**练习**

1、准备工作

```javascript
// 定义Person构造函数
function Person(name, age){
    this.name = name;
    this.age = age;
}

// 创建Person对象
var per1 = new Person("孙悟空", 18);
var per2 = new Person("猪八戒", 28);
var per3 = new Person("红孩儿", 8);
var per4 = new Person("蜘蛛精", 16);
var per5 = new Person("二郎神", 38);

// 将这些person对象放入到一个数组中
var perArr = [per1, per2, per3, per4, per5];
console.log(perArr);
// 0: Person {name: "孙悟空", age: 18}
// 1: Person {name: "猪八戒", age: 28}
// 2: Person {name: "红孩儿", age: 8}
// 3: Person {name: "蜘蛛精", age: 16}
// 4: Person {name: "二郎神", age: 38}
```

2、创建一个函数，可以将perArr中的满18岁的Person提取出来，然后封装到一个新的数组中并返回

```javascript
function getAdult(perArr){
    // 创建一个新的数组
    var resultArr = [];
    var person;
    // 遍历arr，获取arr中Person对象
    for(var i=0;i<perArr.length;i++){
        person = perArr[i];
        // 判断Person对象的age是否大于等于18
        if(person.age >= 18){
            // 如果大于等于18，则将这个对象添加到newArr中
            resultArr.push(person);
        }
    }
    // 将数组返回
    return resultArr;
}
var adult = getAdult(perArr);
console.log(adult);
// 0: Person {name: "孙悟空", age: 18}
// 1: Person {name: "猪八戒", age: 28}
// 2: Person {name: "二郎神", age: 38}
```

### forEach方法

一般我们都是使用`for`循环去遍历数组，JS中还为我们提供了一个方法，用来遍历数组`forEach()` 

**兼容性**

这个方法只支持IE8以上的浏览器，IE8及以下的浏览器均不支持该方法

所以如果需要兼容IE8，则不要使用`forEach`，还是使用`for`循环来遍历

**使用**

forEach() 方法需要一个函数作为参数

像这种函数，由我们创建但是不由我们调用的，我们称为**回调函数**

数组中有几个元素，函数就会执行几次，每次执行时，浏览器会将遍历到的元素

以实参的形式传递进来，我们可以来定义形参，来读取这些内容

**参数**

浏览器会在回调函数中传递三个参数：

- 第一个参数，就是当前正在遍历的元素
- 第二个参数，就是当前正在遍历的元素的索引
- 第三个参数，就是正在遍历的数组

```javascript
arr.forEach(function(value, index, obj){
    console.log("value = " + value);
    console.log("index = " + index);
    console.log("obj = " + obj);
});
```



## 练习

### 数组去重

```javascript
// 创建一个数组
var arr = [1,2,2,3,2,1,3,4,2,5];
// 去除数组中重复的数字
// 获取数组中的每一个元素
for(var i=0;i<arr.length;i++){
    // 获取当前元素后的所有元素
    for(var j=i+1;j<arr.length;j++){
        // 判断两个元素的值是否相等
        if(arr[i] == arr[j]){
            // 如果相等则证明出现了重复的元素，则删除j对应的元素
            // arr.splice(j, 1);
            // 当删除了当前j所在的元素以后，后边的元素会自动补位
            // 此时将不会再比较这个元素，需要再比较一次j所在位置的元素
            // j--;
            arr.splice(j--, 1);
        }
    }
}
console.log(arr);
```

