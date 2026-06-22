/*
 * JS 练习 02：函数、作用域、闭包
 * 运行：npm run js:02
 */

// ---------- 三种函数写法 ----------
console.log("=== 三种函数写法 ===");

// 1. 函数声明
function add(a, b) {
  return a + b;
}

// 2. 函数表达式
const multiply = function (a, b) {
  return a * b;
};

// 3. 箭头函数（最常用）
const subtract = (a, b) => a - b;
const square = (x) => x * x;

console.log("add(2,3) =", add(2, 3));
console.log("multiply(2,3) =", multiply(2, 3));
console.log("subtract(5,2) =", subtract(5, 2));
console.log("square(4) =", square(4));

// ---------- 默认值与剩余参数 ----------
console.log("\n=== 默认值 / 剩余参数 ===");
function greet(name, greeting = "你好") {
  return `${greeting}，${name}`;
}
console.log(greet("小明"));
console.log(greet("小红", "嗨"));

function sum(...nums) {
  // ...nums 把所有参数收集成数组
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log("sum(1,2,3,4) =", sum(1, 2, 3, 4));

// ---------- 作用域：函数内的变量外面访问不到 ----------
console.log("\n=== 作用域 ===");
function scopeDemo() {
  const inside = "我在函数里";
  return inside;
}
console.log(scopeDemo());
// console.log(inside); // ❌ 报错：外面访问不到

// ---------- 闭包：函数「记住」它出生时的环境 ----------
console.log("\n=== 闭包 ===");
function makeCounter() {
  let count = 0; // 这个变量被内部函数「记住」了
  return function () {
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log("计数器:", counter(), counter(), counter()); // 1 2 3
// 每次调用 counter() 都能访问并修改它「记住」的 count，这就是闭包
