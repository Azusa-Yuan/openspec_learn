# 第一章 TypeScript 基础

> 配套代码：`src/01-types.ts`、`src/02-interface-type.ts`、`src/03-functions.ts`
> 运行方式：`npm run ex:01`（依次 ex:02 / ex:03）

---

## 1.1 TypeScript 是什么，为什么需要它

JavaScript 是**动态弱类型**语言，变量类型在运行时才确定。这带来灵活性，但也埋下大量隐患：错误往往要等到**线上运行**才暴露。

```javascript
// JavaScript：这段代码不会报错，直到运行时才出 bug
function getLength(x) {
  return x.length;
}
getLength(123);      // undefined，悄悄出错
getLength("hello");  // 5
```

TypeScript 是 JavaScript 的**超集（superset）**——所有合法的 JS 都是合法的 TS。它在 JS 之上增加了**静态类型检查**，让错误在**编写代码时（编译期）**就暴露。

```typescript
function getLength(x: string): number {
  return x.length;
}
getLength(123);      // ❌ 编译错误：number 不能赋给 string
getLength("hello");  // ✅ OK
```

**核心认知**：TypeScript 最终会被**编译（transpile）成 JavaScript** 才能运行。浏览器和 Node.js 本身不认识 TS，类型信息在编译后会被**擦除（type erasure）**。所以 TS 的价值集中在「开发阶段」，运行时零额外开销。

---

## 1.2 基础类型

```typescript
// 原始类型
let isDone: boolean = false;
let count: number = 42;
let userName: string = "Alice";

// 数组：两种等价写法
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 元组（Tuple）：固定长度、每位固定类型
let pair: [string, number] = ["age", 30];

// 枚举（Enum）：一组命名常量
enum Color { Red, Green, Blue }
let c: Color = Color.Green; // 实际值是 1（默认从 0 开始）

// any：放弃类型检查（应尽量避免）
let anything: any = 4;
anything = "now string"; // 不报错，但失去保护

// unknown：比 any 安全的「未知类型」，使用前必须先收窄
let value: unknown = JSON.parse("{}");
if (typeof value === "string") {
  value.toUpperCase(); // 这里 TS 才知道是 string
}

// void：函数无返回值
function log(msg: string): void { console.log(msg); }

// never：永远不会返回（抛异常 / 死循环）
function fail(msg: string): never { throw new Error(msg); }
```

**`any` vs `unknown`（新手高频混淆点）**
- `any` = 「我不在乎类型」，关闭所有检查，等于退回纯 JS。
- `unknown` = 「我现在还不知道类型」，强制你先做类型判断才能使用，安全得多。

---

## 1.3 类型推断（Type Inference）

很多时候你**不需要显式写类型**，TS 会自动推断：

```typescript
let x = 3;        // 推断为 number
x = "hello";      // ❌ 报错

const arr = [1, 2, 3];          // number[]
const obj = { a: 1, b: "hi" };  // { a: number; b: string }
```

**最佳实践**：函数的参数/返回值建议显式标注（作为契约和文档）；局部变量交给 TS 推断即可，不必啰嗦。

---

## 1.4 interface 与 type：描述对象结构

这是 TS 的核心，用来定义对象的「形状」。

```typescript
interface User {
  id: number;
  name: string;
  age?: number;            // ? 可选属性
  readonly email: string;  // readonly 只读，初始化后不可改
}

const u: User = { id: 1, name: "Bob", email: "bob@x.com" };
// u.email = "new@x.com"; // ❌ email 只读

type ID = number | string;          // 联合类型
type Point = { x: number; y: number };
```

**interface vs type 区别**
- `interface` 可**重复声明并自动合并**，适合定义对象/类的契约，可被 `extends`。
- `type` 更灵活，能表达**联合 / 交叉 / 元组 / 映射**等类型运算，但不能重复声明。
- 经验法则：**对象结构优先 `interface`；需要类型运算用 `type`**。

```typescript
// 字面量联合类型——TS 最实用的特性之一
type Status = "loading" | "success" | "error";
let s: Status = "loading";
// s = "pending"; // ❌ 只能是这三个值，IDE 还能自动补全
```

---

## 1.5 函数类型

```typescript
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;

// 可选参数 + 默认值
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}

// 剩余参数
function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

// 函数类型作为变量类型
type BinaryOp = (a: number, b: number) => number;
const subtract: BinaryOp = (a, b) => a - b; // 参数类型自动推断
```

---

## 1.6 本章小结与练习

| 概念 | 关键词 | 一句话记忆 |
|------|--------|-----------|
| 静态类型 | 编译期检查 | 错误提前到写代码时暴露 |
| 类型擦除 | type erasure | 运行时没有类型信息 |
| 安全未知类型 | `unknown` | 用前必须先收窄 |
| 对象契约 | `interface` | 可合并、可继承 |
| 类型运算 | `type` | 联合/交叉/映射 |
| 字面量联合 | `"a" \| "b"` | 限定取值范围 |

**动手练习**：
```bash
npm run ex:01   # 基础类型
npm run ex:02   # interface 与 type
npm run ex:03   # 函数类型
```

下一章进入 **泛型、类与工具类型**，这是 TS 真正强大的部分。
