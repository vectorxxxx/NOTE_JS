

> **笔记来源**：[尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1YW411T7GX)

[TOC]

# 构造函数与原型对象

## 1、使用工厂方法创建对象

```javascript
function createPerson(name, age, gender){
    // 创建一个新的对象
    var obj=new Object();
    //向对象中添加属性
    obj.name = name;
    obj.age = age;
    obj.gender = gender;
    obj.sayName = function(){
        console.log(this.name);
    };
    //将新的对象返回
    return obj;
}

var obj1 = createPerson("孙悟空", 1000, "男");
var obj2 = createPerson("猪八戒", 3600, "男");
var obj3 = createPerson("沙悟净", 10000, "男");

obj1.sayName(); // 孙悟空
obj2.sayName(); // 猪八戒
obj3.sayName(); // 猪八戒
```

使用工厂方法创建的对象，使用的构造函数都是`Object`

所以创建的对象都是`Object`这个类型，就导致我们无法区分出多种不同类型的对象



## 2、构造函数

创建一个构造函数，专门用来创建Person对象的构造函数就是一个普通的函数

创建方式和普通函数没有区别，不同的是构造函数习惯上**首字母大写**构造函数

和普通函数的区别就是**调用方式的不同**

- 普通函数是直接调用
- 构造函数需要使用`new`关键字来调用

```javascript
function Person(){
    console.log(this); // Person{}
}
// 普通函数
var fun = Person();
console.log(fun); // undefined
// 构造函数
var person = new Person();
console.log(person); // Person{}
```

### 构造函数的执行流程

1. 立刻创建一个新的对象
2. 将新建的对象设置为函数中`this`，在构造函数中可以使用`this`来引用新建的对象
3. 逐行执行函数中的代码
4. 将新建的对象作为返回值返回

```javascript
function Dog(){

}

function Person(name, age, gender){
    //向对象中添加属性
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayHello = function(){
        console.log("My'name is " + this.name + ", " +
                    "I'm " + this.age + " years old, " +
                    "and I'm a " + this.gender + ".");
    };
}

var person1 = new Person("孙悟空", 1000, "man");
var person2 = new Person("猪八戒", 3600, "man");
var person3 = new Person("沙悟净", 10000, "man");
var dog = new Dog();
person1.sayHello(); // My'name is 孙悟空, I'm 1000 years old, and I'm a man.
person2.sayHello(); // My'name is 猪八戒, I'm 3600 years old, and I'm a man.
person3.sayHello(); // My'name is 沙悟净, I'm 10000 years old, and I'm a man.
console.log(person1); // Person {name: "孙悟空", age: 1000, gender: "man", sayHello: ƒ}
console.log(person2); // Person {name: "猪八戒", age: 3600, gender: "man", sayHello: ƒ}
console.log(person3); // Person {name: "沙悟净", age: 10000, gender: "man", sayHello: ƒ}
console.log(typeof person1); // object
console.log(typeof person2); // object
console.log(typeof person3); // object
```

使用同一个构造函数创建的对象，我们称为一类对象，也将一个构造函数称为一个类。

我们将通过一个构造函数创建的对象，称为是该类的实例

使用`instanceof`可以检查一个对象是否是一个类的实例语法：`对象 instanceof 构造函数`

如果是则返回`true`，否则返回`false`

```javascript
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Person); //true
console.log(person3 instanceof Person); //true
console.log(dog instanceof Person); 	//false
```

所有的对象都是`Object`的后代，所以任何对象和`Object`进行`instanceof`检查时都会返回`true`

```javascript
console.log(person1 instanceof Object); //true
console.log(person2 instanceof Object); //true
console.log(person3 instanceof Object); //true
console.log(dog instanceof Object); 	//true
```

`this`的情况：

- 当以函数的形式调用时，`this`是`window`
- 当以方法的形式调用时，谁调用方法`this`就是谁
- 当以构造函数的形式调用时，`this`就是新创建的那个对象

### 构造函数修改

创建一个Person构造函数

在Person构造函数中，为每一个对象都添加了一个sayName方法，目前我们的方法是在构造函数内部创建的

也就是构造函数每执行一次就会创建一个新的sayName方法也是所有实例的sayName都是唯一的

```javascript
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayHello = function(){
        console.log("My'name is " + this.name + ", " +
                    "I'm " + this.age + " years old, " +
                    "and I'm a " + this.gender + ".");
    };
}
```

这样就导致了构造函数执行一次就会创建一个新的方法，执行10000次就会创建10000个新的方法，而10000个方法都是一摸一样的

这是完全没有必要，完全可以使所有的对象共享同一个方法

```javascript
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayHello = fun;
}
// 将sayName方法在全局作用域中定义
function fun(){
    console.log("My'name is " + this.name + ", " +
                "I'm " + this.age + " years old, " +
                "and I'm a " + this.gender + ".");
};
```

将函数定义在全局作用域，虽然节省了空间，但却污染了全局作用域的命名空间

而且定义在全局作用域中也很不安全



## 3、原型对象

### 原型prototype

我们所创建的每一个函数（不论是普通函数还是构造函数），解析器都会向函数中添加一个属性`prototype`

```javascript
function Person(){

}

function MyClass(){

}

console.log(Person.prototype);
// {constructor: ƒ}
// 		constructor: ƒ Person()
// 			arguments: null
// 			caller: null
// 			length: 0
// 			name: "Person"
// 			prototype: {constructor: ƒ}
// 			__proto__: ƒ ()
// 			[[FunctionLocation]]: 09-原型对象.html:8
// 			[[Scopes]]: Scopes[1]
// 		__proto__: Object
console.log(Person.prototype == MyClass.prototype); // false
```

当函数以普通函数的形式调用`prototype`时，没有任何作用

当函数以构造函数的形式调用`prototype`时，它所创建的对象中都会有一个隐含的属性，指向该构造函数的原型对象，我们可以通过`__proto__`来访问该属性

```javascript
var mc1 = new MyClass();
var mc2 = new MyClass();
var mc3 = new MyClass();
console.log(mc1.__proto__ == MyClass.prototype); // true
console.log(mc2.__proto__ == MyClass.prototype); // true
console.log(mc3.__proto__ == MyClass.prototype); // true
```

![image-20210727225124094](https://i.loli.net/2021/07/27/cOdFuN8bgXEPLTa.png)

原型对象就相当于一个**公共区域**，所有同一个类的实例都可以访问到这个原型对象

我们可以将对象中共有的内容，统一设置到原型对象中

```javascript
// 向MyClass中添加属性a
MyClass.prototype.a = "123";
console.log(mc1.a);  // 123
// 向MyClass中添加方法sayHello
MyClass.prototype.sayHello = function(){
alert("hello");
}
mc3.sayHello();
```

当我们访问对象的一个属性或方法时，它会先在对象自身中寻找，如果有则直接使用，如果没有则会去原型对象中寻找，如果找到则直接使用

```javascript
mc2.a = "456";
console.log(mc2.a);  // 456
```

以后我们创建构造函数时，可以将这些对象共有的属性和方法，统一添加到构造函数的原型对象中

这样不用分别为每一个对象添加，也不会影响到全局作用域，就可以使每个对象都具有这些属性和方法了

### hasOwnProperty

```javascript
function MyClass(){

}
MyClass.prototype.name = "I'm prototype's name.";
var mc = new MyClass();
mc.age = 18;
// 使用in检查对象中是否含有某个属性时，如果对象中没有但是原型中有，也会返回true
console.log("name" in mc); // true
console.log("age" in mc); // true
// 可以使用对象的hasOwnProperty()来检查对象自身中是否含有该属性
// 使用该方法只有当对象自身中含有属性时，才会返回true
console.log(mc.hasOwnProperty("name")); // false
console.log(mc.hasOwnProperty("age"));  // true
console.log(mc.hasOwnProperty("hasOwnProperty"));  // false
```

**那么，`hasOwnProperty`是原型对象中定义的方法吗？**

因为对象中没有定义`hasOwnProperty`方法，那应该就是在原型对象中定义的了，果真如此吗？

我们用`hasOwnProperty`方法看下有没有`hasOwnProperty`它自己

```javascript
console.log(mc.__proto__.hasOwnProperty("hasOwnProperty"));  // false
```

我们发现，原型对象中也没有`hasOwnProperty`方法，那`hasOwnProperty`究竟是哪里来的呢？

### 原型的原型

原型对象也是对象，所以它也有原型，当我们使用一个对象的属性或方法时

- 会先在自身中寻找，自身中如果有则直接使用

- 如果没有则去原型对象中寻找，有则使用

- 如果没有则去原型的原型中寻找，直到找到`Object`对象的原型

- `Object`对象的原型没有原型，如果在`Object`中依然没有找到，则返回`undefined`

  ```javascript
  console.log(mc.helloWorld);  // undefined
  ```

![image-20210727231924585](https://i.loli.net/2021/07/27/TrGWR83XvCAVzdY.png)

那么，按照这个原理，我们在原型的原型中使用`hasOwnProperty`方法看看

```javascript
console.log(mc.__proto__.__proto__.hasOwnProperty("hasOwnProperty"));  // true
```

**那既然原型对象有原型，那原型的原型还有原型吗？**

话不多说，直接打印看下

```javascript
console.log(mc.__proto__.__proto__.__proto__);  // null
```

根据上述原理，`mc.__proto__.__proto__`就是`Object`对象了

`Object`对象虽然没有原型，但也有`__proto__`，只是为`null`而已

### toString

当我们直接在页面中打印一个对象时，事件上是输出的对象的`toString()`方法的返回值（*这里并非视频中所说的那样，有待确认*）

如果我们希望在输出对象时不输出`[object Object]`，可以为对象添加一个`toString()`方法

```javascript
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
}
var per1 = new Person("孙悟空", 1000, "man");
var per2 = new Person("猪八戒", 3600, "man");
// 当我们直接在页面中打印一个对象时，事件上是输出的对象的`toString()`方法的返回值
console.log(per1); // Person {name: "孙悟空", age: 1000, gender: "man"}
console.log(per1.toString()); // [object Object]
// 如果我们希望在输出对象时不输出`[object Object]`，可以为对象添加一个`toString()`方法
per1.toString = function(){
    return "Person[name=" + this.name + ", age=" + this.age + ", gender=" + this.gender + "]";
}
console.log(per1); // Person {name: "孙悟空", age: 1000, gender: "man", toString: ƒ}
console.log(per1.toString()); // Person[name=孙悟空, age=1000, gender=man]
```

上述只是修改per1对象的`toString`方法，不会对其他对象产生影响

如果想要所有对象都执行该方法，可以修改Person原型的`toString`

```javascript
console.log(per2.toString()); // [object Object]
// 修改Person原型的toString
Person.prototype.toString = function(){
    return "Person[name=" + this.name + ", age=" + this.age + ", gender=" + this.gender + "]";
}
console.log(per2.toString()); // Person[name=猪八戒, age=3600, gender=man] 
```

