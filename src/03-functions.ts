/**
 * 练习 03：函数类型
 * 运行：npm run ex:03
 */

// ---------- 基础函数 ----------
function add(a: number, b: number): number {
  return a + b;
}
const multiply = (a: number, b: number): number => a * b;
console.log("add:", add(2, 3), "multiply:", multiply(2, 3));

// ---------- 可选参数 + 默认值 ----------
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}
console.log(greet("Alice"));
console.log(greet("Bob", "Hi"));

// ---------- 剩余参数 ----------
function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log("sum:", sum(1, 2, 3, 4, 5));

// ---------- 函数类型别名 ----------
type BinaryOp = (a: number, b: number) => number;
const subtract: BinaryOp = (a, b) => a - b; // 参数类型自动推断
console.log("subtract:", subtract(10, 4));

// ---------- 函数作为参数（高阶函数） ----------
function applyOp(a: number, b: number, op: BinaryOp): number {
  return op(a, b);
}
console.log("applyOp 用 add:", applyOp(6, 7, add));

export {};
