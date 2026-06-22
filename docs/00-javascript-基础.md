# 第零章 JavaScript 基础（先学这个！）

> TypeScript 是 JavaScript 的超集——**先把 JS 学会，TS 才学得动**。
> 配套代码：`src/js-01-basics.js`、`src/js-02-functions.js`、`src/js-03-array-object.js`
> 运行方式：`npm run js:01`（依次 js:02 / js:03），用纯 Node 运行，不需要编译。

---

## 0.1 JavaScript 是什么，怎么运行

JavaScript（简称 JS）是一门**脚本语言**，最初用来给网页加交互，现在借助 Node.js 还能写服务器、命令行工具。

运行 JS 有两种最常见的方式：
1. **浏览器**里（按 F12 打开控制台就能敲）。
2. **Node.js**里（命令行执行 `node 文件.js`）。

```javascript
// hello.js
console.log("你好，JavaScript！"); // console.log 是「打印到控制台」
```

```bash
node hello.js   # 运行它
```

`console.log(...)` 是你最常用的工具——把值打印出来看，是学习和调试的第一手段。

---

## 0.2 变量：let、const、var

变量是「给值起个名字」。现代 JS 用两个关键字声明变量：

```javascript
let age = 25;        // let：值以后可以改
age = 26;            // ✅ 允许

const name = "Alice"; // const：常量，声明后不能再赋值
// name = "Bob";      // ❌ 报错

var old = 1;         // var：老式写法，有作用域陷阱，现在基本不用
```

**记住一条规则**：**默认用 `const`，需要改变时才用 `let`，永远别用 `var`**。这样代码更安全、意图更清晰。

---

## 0.3 数据类型

JS 的值分两大类。

### 原始类型（Primitive）—— 简单的单个值

```javascript
let n = 42;           // number 数字（整数和小数都是它，不区分）
let s = "hello";      // string 字符串
let b = true;         // boolean 布尔（true / false）
let u = undefined;    // undefined：声明了但没赋值
let nul = null;       // null：表示「空」，主动赋的空值
let big = 100n;       // bigint：超大整数（少用）
let sym = Symbol("id"); // symbol：唯一标识（少用）
```

### 对象类型（Object）—— 复合的、能装多个值

```javascript
// 对象 object：键值对集合
let person = {
  name: "Alice",
  age: 25,
};

// 数组 array：有序列表
let nums = [1, 2, 3];

// 函数 function 本质上也是对象
```

**用 `typeof` 查看类型**：

```javascript
console.log(typeof 42);        // "number"
console.log(typeof "hi");      // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof {});        // "object"
console.log(typeof [1, 2]);    // "object"（数组也是对象）
console.log(typeof null);      // "object"（这是 JS 著名的历史 bug，记住即可）
```

---

## 0.4 运算符与字符串模板

```javascript
// 算术
let sum = 1 + 2;      // 3
let rest = 10 % 3;    // 1（取余）
let power = 2 ** 10;  // 1024（幂）

// 比较：永远用 ===（严格相等），别用 ==
console.log(1 === 1);    // true
console.log(1 === "1");  // false（类型不同）
console.log(1 == "1");   // true（== 会偷偷转换类型，容易出 bug，避免使用）

// 逻辑
console.log(true && false); // && 与
console.log(true || false); // || 或
console.log(!true);         // ! 非

// 模板字符串：用反引号 ` 包裹，${} 里塞变量
let who = "世界";
console.log(`你好，${who}！1+2=${1 + 2}`); // 你好，世界！1+2=3
```

**重点**：比较值时**永远用 `===`**，不要用 `==`。`==` 会做隐式类型转换，导致 `0 == ""`、`1 == "1"` 这种反直觉的 `true`。

---

## 0.5 控制流：条件与循环

```javascript
// if / else
let score = 85;
if (score >= 90) {
  console.log("优秀");
} else if (score >= 60) {
  console.log("及格");
} else {
  console.log("不及格");
}

// for 循环
for (let i = 0; i < 3; i++) {
  console.log("第", i, "次");
}

// for...of：遍历数组的每个元素（推荐）
for (const item of [10, 20, 30]) {
  console.log(item);
}

// while 循环
let count = 3;
while (count > 0) {
  console.log("倒数", count);
  count--;
}
```

---

## 0.6 函数

函数是「可重复使用的一段逻辑」。JS 里有三种写法：

```javascript
// 1. 函数声明
function add(a, b) {
  return a + b;
}

// 2. 函数表达式（把函数赋给变量）
const multiply = function (a, b) {
  return a * b;
};

// 3. 箭头函数（最常用，最简洁）
const subtract = (a, b) => a - b;       // 单行直接返回，可省略 return 和 {}
const square = (x) => x * x;            // 只有一个参数可省略括号
const sayHi = () => console.log("hi");  // 没有参数用空括号

console.log(add(2, 3), multiply(2, 3), subtract(5, 2));
```

**参数默认值 + 剩余参数**：

```javascript
function greet(name, greeting = "你好") { // 默认值
  return `${greeting}，${name}`;
}
console.log(greet("小明"));        // 你好，小明
console.log(greet("小红", "嗨"));   // 嗨，小红

function sum(...nums) {            // ...nums 收集所有参数成数组
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4));      // 10
```

---

## 0.7 数组常用操作（高频！）

数组方法是日常编程用得最多的东西，一定要熟练：

```javascript
const nums = [1, 2, 3, 4, 5];

// map：每个元素做转换，返回新数组
console.log(nums.map((n) => n * 2));        // [2, 4, 6, 8, 10]

// filter：筛选出符合条件的元素
console.log(nums.filter((n) => n % 2 === 0)); // [2, 4]

// reduce：把数组「汇总」成一个值（如求和）
console.log(nums.reduce((acc, n) => acc + n, 0)); // 15

// find：找到第一个符合条件的元素
console.log(nums.find((n) => n > 3));       // 4

// forEach：遍历（不返回新数组）
nums.forEach((n) => console.log(n));

// 其他常用
console.log(nums.includes(3));  // true，是否包含
console.log(nums.length);        // 5，长度
nums.push(6);                    // 末尾添加
nums.pop();                      // 末尾删除
```

`map` / `filter` / `reduce` 这三个是核心，建议反复练习。

---

## 0.8 对象操作

```javascript
const user = { name: "Alice", age: 25 };

// 读取属性
console.log(user.name);      // 点号
console.log(user["age"]);    // 方括号

// 修改 / 新增
user.age = 26;
user.email = "a@x.com";

// 删除
delete user.email;

// 遍历键
for (const key of Object.keys(user)) {
  console.log(key, "=", user[key]);
}

// 对象里也能放函数（叫「方法」）
const calculator = {
  value: 0,
  add(n) {
    this.value += n; // this 指向对象自己
    return this;
  },
};
calculator.add(5).add(3);
console.log(calculator.value); // 8
```

---

## 0.9 解构与展开（现代 JS 必备语法）

```javascript
// 数组解构：按位置取值
const [first, second] = [10, 20];
console.log(first, second); // 10 20

// 对象解构：按名字取值
const { name, age } = { name: "Bob", age: 30 };
console.log(name, age); // Bob 30

// 展开运算符 ...：把数组/对象「摊开」
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];        // [1, 2, 3, 4]
const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 };       // { a: 1, b: 2 }
console.log(arr2, obj2);
```

解构和展开在实际项目里**到处都是**，尤其是处理函数参数、合并对象、复制数组时。

---

## 0.10 它和 TypeScript 是什么关系

你现在写的就是 JavaScript。**TypeScript 做的事，就是在这些 JS 代码上「加类型标注」**：

```javascript
// JavaScript：参数没有类型
function add(a, b) {
  return a + b;
}
```

```typescript
// TypeScript：给参数和返回值加上类型
function add(a: number, b: number): number {
  return a + b;
}
```

看到了吗？逻辑一模一样，TS 只是多了 `: number` 这种**类型标注**。所以——**JS 是地基，TS 是地基上的钢筋**。把这一章学扎实，第一章的 TypeScript 会非常顺。

---

## 0.11 本章小结与练习

| 概念 | 关键点 |
|------|--------|
| 变量 | 默认 `const`，要改用 `let`，别用 `var` |
| 类型 | 原始类型 + 对象/数组 |
| 比较 | 永远用 `===` |
| 函数 | 优先箭头函数 `(x) => ...` |
| 数组 | 掌握 `map`/`filter`/`reduce` |
| 现代语法 | 解构、展开 `...`、模板字符串 |

**动手练习**：
```bash
npm run js:01   # 变量、类型、运算符、控制流
npm run js:02   # 函数、作用域、闭包
npm run js:03   # 数组、对象、解构、展开
```

跑完这三个，你就具备了学 TypeScript（第一章）的全部基础。
