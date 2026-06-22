/**
 * 练习 01：TypeScript 基础类型
 * 运行：npm run ex:01
 */

// ---------- 原始类型 ----------
const isDone: boolean = false;
const count: number = 42;
const userName: string = "Alice";

console.log("原始类型:", { isDone, count, userName });

// ---------- 数组与元组 ----------
const list: number[] = [1, 2, 3];
const pair: [string, number] = ["age", 30]; // 元组：固定长度与类型

console.log("数组:", list, "元组:", pair);

// ---------- 枚举 ----------
enum Color {
  Red,
  Green,
  Blue,
}
console.log("枚举 Color.Green 的值:", Color.Green); // 1

// ---------- any vs unknown ----------
let anything: any = 4;
anything = "变成字符串也不报错"; // any 关闭检查

const value: unknown = JSON.parse('"hello world"');
// value.toUpperCase();      // ❌ 直接用会报错：unknown 必须先收窄
if (typeof value === "string") {
  console.log("unknown 收窄后:", value.toUpperCase());
}

// ---------- never：永不返回 ----------
function fail(msg: string): never {
  throw new Error(msg);
}

// ---------- 类型推断 ----------
const inferred = [1, 2, 3]; // TS 自动推断为 number[]
console.log("类型推断的数组长度:", inferred.length);

export {};
