> 笔记来源：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 流程控制

## 1、流程控制语句

JS中的程序是从上到下一行一行执行的

通过流程控制语句可以控制程序执行流程，使程序可以根据一定的条件来选择执行

语句的分类：

- 条件判断语句
- 条件分支语句
- 循环语句



## 2、条件判断语句

使用条件判断语句，可以在执行某个语句之前进行判断

如果条件成立才会执行语句，条件不成立则语句不执行。

### if 语句

**语法一**

```javascript
if(条件表达式) {
    语句
}
```

`if`语句在执行时，会先对条件表达式进行求值判断

- 如果条件表达式的值为`true`，则执行`if`后的语句
- 如果条件表达式的值为`false`，则不执行`if`后的语句

`if`语句只能控制紧随其后的那个语句，如果希望`if`语句可以控制多条语句，可以将这些语句统一放到代码块中

`if`语句后的代码块不是必须的，但是在开发中尽量写上代码块，即使`if`后只有一条语句

**语法二**

```javascript
if(条件表达式) {
	语句1...
} else {
	语句2...
}
```

`if...else...`语句执行时，会先对`if`后的条件表达式进行求值判断

- 如果该值为`true`，则执行`if`后的语句
- 如果该值为`false`，则执行`else`后的语句

**语法三**

```javascript
if(条件表达式) {
	语句1...
} else if(条件表达式) {
	语句2...
} else if(条件表达式) {
	语句3...
} else{
	语句4...
}
```

`if...else if...else`语句执行时，会从上到下依次对条件表达式进行求值判断

- 如果值为`true`，则执行当前语句
- 如果值为`false`，则继续向下判断
- 如果所有的条件都不满足，则执行最后一个`else`后的语句
- 该语句中，只会有一个代码块被执行，一旦代码块执行了，则直接结束语句

**练习**

`prompt()`可以弹出一个提示框，该提示框中会带有一个文本框，用户可以在文本框中输入一段内容

该函数需要一个字符串作为参数，该字符串将会作为提示框的提示文字

用户输入的内容将会作为函数的返回值返回，可以定义一个变量来接收该内容

```javascript
// 练习1
// 从键盘输入小明的期末成绩：
// 当成绩为100时，’奖励一辆BMW’
// 当成绩为[80-99]时，’奖励一台iphone15s'
// 当成绩为[60-80]时，’奖励一本参考书’
// 其他时，什么奖励也没有
var score = prompt("请输入小明的期末成绩：");
if(score == 100){
    alert("奖励一辆BMW");
} else if(score >80 && score <= 99){
    alert("奖励一台iphone15s");
} else if(score >60 && score <= 80){
    alert("奖励一本参考书");
} else{
    alert("什么奖励也没有");
}

// 练习2
// 大家都知道，男大当婚，女大当嫁。那么女方家长要嫁女儿，当然要提出一定的条件：
// 高：180cm以上；富：1000万以上；帅：500以上；如果这三个条件同时满足，则：’我一定要嫁给他’
// 如果三个条件有为真的情况，则：’嫁吧，比上不足，比下有余。’
// 如果三个条件都不满足，则：’不嫁！’

// 练习3
// 编写程序，由键盘输入三个整数分别存入变量num1、num2、num3，对他们进行排序，并且从小到大输出。
```

其他练习，大家可以自己尝试做下。练习2还是很简单的，跟练习1差不多，无非就是多了几次输入。练习3的话，如果你是初学编程的话，可以尝试做一做，不过个人感觉可以在学完`for`循环之后再做，而且这个应该当做简单的算法题。



### switch 语句

```javascript
switch(条件表达式) {
    case 表达式1:
    	语句1...;
    	break;
    case 表达式2:
    	语句2...;
    	break;
    default:
        语句...;
    	break;
}
```

`switch...case..`语句

在执行时会依次将`case`后的表达式的值和`switch`后的条件表达式的值进行全等比较

- 如果比较结果为`true`，则从当前`case`处开始执行代码。当前`case`后的所有的代码都会执行，我们可以在`case`的后边跟着一个`break`关键字，这样可以确保只会执行当前`case`后的语句，而不会执行其他的`case`
- 如果比较结果为`false`，则继续向下比较
- 如果所有的比较结果都为`false`，则只执行`default`后的语句

`switch`语句和`if`语句的功能实际上有重复的，使用`switch`可以实现`if`的功能，同样使用`if`也可以实现`switch`的功能，所以我们使用时，可以根据自己的习惯选择

```javascript
// 对于成绩大于60分的，输出’合格’。低于60分的，输出’不合格’
var score = prompt("请输入成绩：");
var tmp = parseInt(score/10);
switch (tmp){
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
        alert("合格");
        break;
    default:
        alert("不合格");
        break;
}
```



### while 语句

循环语句：通过循环语句可以反复的执行一段代码多次

`while`循环语法：

```javascript
while(条件表达式) {
	语句...
}
```

`while`语句在执行时，先对条件表达式进行求值判断

- 如果值为`true`，则执行循环体，循环体执行完毕以后，继续对表达式进行判断
- 如果为`true`，则继续执行循环体，以此类推
- 如果值为`false`，则终止循环

```javascript
var a = 0;
while(true) {
    alert(a++);
}
```

像这种将条件表达式为`true`的循环，叫做死循环

该循环不会停止，除非浏览器关闭，死循环在开发中慎用。可以使用`break`，来终止循环

```javascript
var i = 0;
while(true){
	document.write(i++ + "<br/>");
	if(i > 10){
    	break;
	}
}
```

创建一个循环，往往需要三个步骤：

1. 创初始化一个变量
2. 在循环中设置一个条件表达式
3. 定义一个更新表达式，每次更新初始化变量

```javascript
// 1.创初始化一个变量
var i = 0;
// 2.在循环中设置一个条件表达式
while(i < 10){
    // 3.定义一个更新表达式，每次更新初始化变量
    document.write(i++ + "<br/>");
}
```

**练习**

```javascript
// 假如投资的年利率为5%，试求从1000块增长到5000块，需要花费多少年
var money = 1000;
var year = 0;
while(money < 5000){
    money *= 1 + 0.05;
    year++;
}
alert("需要花费" + year + "年");
```



### do-while 语句

`do...while`循环语法：

```javascript
do{
	语句...
}while(条件表达式)
```

`do...while`语句在执行时，会先执行循环体，循环体执行完毕以后，在对`while`后的条件表达式进行判断

- 如果结果为`true`，则继续执行循环体，执行完毕继续判断，以此类推
- 如果结果为`false`，则终止循环

实际上这两个语句功能类似，不同的是

- `while`是先判断后执行，而`do...while`会先执行后判断
- `do...while`可以保证循环体至少执行一次，而`while`不能



### for 语句

`for`语句，也是一个循环语句，也称为`for`循环

在`for`循环中，为我们提供了专门的位置用来放三个表达式：

- 初始化表达式
- 条件表达式
- 更新表达式

for循环的语法：

```javascript
for(①初始化表达式;②条件表达式;③更新表达式) {
	④语句...
}
```

`for`循环的执行流程：

- ①执行初始化表达式，初始化变量（初始化表达式只会执行一次）
- ②执行条件表达式，判断是否执行循环。
  - 如果为`true`，则执行④语句
  - 如果为`false`，则终止循环
- ③执行更新表达式，更新表达式执行完毕，继续重复②

`for`循环中的三个部分都可以省略，也可以写在外部

如果在`for`循环中不写任何的表达式，只写两个`;`，此时循环是一个死循环会一直执行下去，慎用

```javascript
for(;;){
	alert("hello");
}
```

**练习**

```javascript
// 练习1、打印1-100之间所有奇数之和
for(i=1,result=0;i<=100;i++){
    if(i%2 == 1){	
        result += i;
    }
}
console.log('result='+result);

// 练习2、打印1-100之间所有7的倍数的个数及总和
for(i=1,result=0,count=0;i<=100;i++){
    if(i%7 == 0){	
        result += i;
        count++;
    }
}
console.log('个数='+count+'，总和='+result);

// 练习3、水仙花数
// 水仙花数是指一个3位数，它的每个位上的数字的3次幂之和等于它本身。
// （例如：1^3+5^3+3^3=153），请打印所有的水仙花数。
var hundreds_place;
var tens_place;
var ones_place;
for(i=100;i<1000;i++){
    hundreds_place = parseInt(i/100);
    tens_place = parseInt(i/10) - parseInt(hundreds_place*10);
    ones_place = i % 10;
    if(i == (hundreds_place*hundreds_place*hundreds_place 
             + tens_place*tens_place*tens_place 
             + ones_place*ones_place*ones_place)){
        console.log(i);
    }
}

// 练习4、在页面中接收一个用户输入的数字，并判断该数是否是质数。
// 质数：只能被1和它自身整除的数，1不是质数也不是合数，质数必须是大于1的自然数。
var num = prompt("请输入一个数字：");
while(isNaN(num)){
    num = prompt("请输入一个数字：");
}
flag = true;
for(j=2;j<num;j++){
    if(num%j==0){
        flag = false;
        break;
    }
}
if(flag){
    alert(num + "是质数");
} else{
    alert(num + "不是质数");
}

// 练习5、通过程序，在页面中输出如下的图形：
//*
//**
//***
//****
//*****
// 通过一个for循环来输出图形
// 这个for循环执行几次，图形的高度就是多少
// 它可以用来控制图形的高度
for(i=0;i<5;i++){
    // 在循环的内部再创建一个循环，用来控制图形的宽度
    // 目前我们的外部的for循环执行1次，内部的就会执行5次
    // 内层循环可以来决定图形的宽度，执行几次图形的宽度就是多少
    for(j=0;j<=i;j++){
        document.write("*");
    }
    document.write("<br/>");
}
// *****
// ****
// ***
// **
// *
for(i=0;i<5;i++){
    for(j=0;j<5-i;j++){
        document.write("*");
    }
    document.write("<br/>");
}

// 练习6、九九乘法表
for(i=1;i<10;i++){
    for(j=1;j<=i;j++){
        document.write(j + "×" + i + "=" + i*j + "\t");
    }
    document.write("<br/>");
    document.write("<br/>");
}


// 练习7、打印出1~100之间的所有质数
var flag = true;
for(i=2;i<=100;i++){
    flag = true;
    for(j=2;j<i;j++){
        if(i%j==0){
            flag = false;
            break;
        }
    }
    if(flag){
        console.log(i);
    }
}

 // 质数性能优化
console.time("test");
var flag;
for(i=2;i<=100000;i++){
    flag = true;
    for(j=2;j<=i/Math.sqrt(i);j++){
        if(i%j==0){
            flag = false;
            break;
        }
    }
    if(flag){
        // console.log(i);
    }
}
console.timeEnd("test");
```



### break和continue

不能在`if`语句中使用`break`和`continue`

**break**

- `break`关键字可以用来退出`switch`或循环语句
- `break`关键字，会立即终止离他最近的那个循环语句

可以为循环语句创建一个`label`，来标识当前的循环`label`：

循环语句使用`break`语句时，可以在`break`后跟着一个`label`，这样`break`将会结束指定的循环，而不是最近的

**continue**

- `continue`关键字可以用来跳过当次循环
- `continue`也是默认只会对离他最近的循环循环起作用



