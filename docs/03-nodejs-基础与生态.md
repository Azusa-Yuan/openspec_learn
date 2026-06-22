# 第三章 Node.js 基础与生态系统

> 配套代码：`src/07-event-loop.ts`、`src/08-async.ts`、`src/09-core-modules.ts`、`src/10-http-server.ts`
> 运行方式：`npm run ex:07` / `ex:08` / `ex:09` / `npm run server`

---

## 3.1 Node.js 是什么

Node.js 是一个**基于 Chrome V8 引擎的 JavaScript 运行时**。在 Node 之前，JS 只能跑在浏览器里；Node 让 JS 能跑在服务器、命令行工具、桌面应用等任何地方。

两大设计核心：
- **V8 引擎**：把 JS 高效编译成机器码执行。
- **libuv**：C 库，提供**事件循环（Event Loop）**和**异步 I/O**，让 Node 用单线程处理海量并发。

```javascript
console.log("Node version:", process.version); // process 是 Node 全局对象
```

---

## 3.2 模块系统：CommonJS vs ES Modules

Node 生态里**最重要也最易混乱**的概念。

```javascript
// CommonJS（传统 Node 方式，.js / .cjs）
const { add } = require("./math");
module.exports = { add };

// ES Modules（现代标准，.mjs 或 package.json 设 "type":"module"）
import { add } from "./math.js";
export const add = (a, b) => a + b;
```

| 对比项 | CommonJS | ES Modules |
|--------|----------|------------|
| 导入 | `require()` | `import` |
| 导出 | `module.exports` | `export` |
| 加载 | 运行时同步 | 编译时静态分析 |
| 顶层 await | 不支持 | 支持 |
| 扩展名 | `.cjs` | `.mjs` |

**用 TypeScript 时**：统一写 `import/export`（ESM 语法），由 tsconfig 的 `module` 选项决定最终编译成哪种格式。这正是 TS 的好处——屏蔽模块系统差异。

---

## 3.3 npm 与包管理

`package.json` 是核心：

```json
{
  "name": "my-project",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  },
  "dependencies": { "express": "^4.18.0" },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/express": "^4.17.0"
  }
}
```

常用命令：
```bash
npm init -y               # 初始化 package.json
npm install express       # 运行时依赖（dependencies）
npm install -D typescript # 开发依赖（devDependencies）
npm run dev               # 运行 scripts 命令
npx tsc                   # 临时运行包里的可执行文件
```

**关键概念**
- `dependencies`：生产环境也要的依赖。
- `devDependencies`：只在开发时用（typescript、测试工具）。
- **`@types/xxx`**：TS 生态关键！许多 JS 库没有类型信息，`@types/`（来自 DefinitelyTyped 社区）提供它们的类型声明文件（`.d.ts`），让你用 JS 库时也有类型提示。
- **语义化版本（SemVer）**：`^4.18.0` 中 `^` 允许升级次版本/补丁（4.x.x），不升主版本（不到 5.0）。

包管理器还有 **pnpm**（更快省空间）、**yarn**，逐渐成为主流。

---

## 3.4 事件循环（Event Loop）—— Node 的灵魂

Node 是**单线程**，却能高并发，靠的是事件循环 + 异步非阻塞 I/O。

核心思想：遇到耗时操作（读文件、网络、数据库），Node **不傻等**，而是交给底层（libuv 线程池 / 操作系统），自己继续往下执行，等操作完成再用回调处理结果。

```javascript
console.log("1");
setTimeout(() => console.log("2 - 宏任务"), 0);
Promise.resolve().then(() => console.log("3 - 微任务"));
console.log("4");
// 输出：1, 4, 3, 2
```

**规则**：同步代码先跑完 → 清空微任务队列（Promise、`process.nextTick`）→ 再执行宏任务（定时器、I/O 回调）。这就是为什么 `3` 比 `2` 先输出。

---

## 3.5 异步编程的三代演进

```typescript
// 第一代：回调（Callback）—— 易陷入「回调地狱」
fs.readFile("a.txt", "utf8", (err, data) => {
  fs.readFile("b.txt", "utf8", (err, data2) => { /* 层层嵌套 */ });
});

// 第二代：Promise —— 链式调用，扁平化
fsp.readFile("a.txt", "utf8")
  .then(data => fsp.readFile("b.txt", "utf8"))
  .then(data2 => console.log(data2))
  .catch(err => console.error(err));

// 第三代：async/await —— 同步写法处理异步（现代首选）
async function read(): Promise<void> {
  try {
    const data = await fsp.readFile("a.txt", "utf8");
    const data2 = await fsp.readFile("b.txt", "utf8");
    console.log(data, data2);
  } catch (err) {
    console.error(err);
  }
}
```

`async/await` 本质是 Promise 的语法糖，是现在最推荐的写法。

---

## 3.6 核心内置模块

Node 自带、无需安装：

```typescript
import fs from "fs/promises";          // 文件系统
import path from "path";               // 路径处理（跨平台）
import os from "os";                   // 操作系统信息
import crypto from "crypto";           // 加密、哈希
import { EventEmitter } from "events"; // 事件机制
import { createServer } from "http";   // HTTP 服务器
```

起一个不依赖框架的 HTTP 服务器：
```typescript
import { createServer } from "http";
const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World");
});
server.listen(3000, () => console.log("http://localhost:3000"));
```

---

## 3.7 生态系统全景

**Web 框架**
- **Express**：最经典、最简单，生态成熟。
- **Koa**：Express 团队出品，基于 async/await，更现代。
- **Nest.js**：企业级，深度集成 TypeScript，适合大型项目。
- **Fastify**：主打高性能。

**数据库 / ORM**
- **Prisma**：现代、类型安全，与 TS 配合极佳。
- **TypeORM / Sequelize**：传统 ORM。

**开发工具链**
- **ts-node / tsx**：直接运行 TS，无需手动编译。
- **nodemon**：监听文件变化自动重启。
- **ESLint + Prettier**：代码检查 + 格式化。
- **Vitest / Jest**：测试框架。

---

## 3.8 本章小结与练习

```bash
npm run ex:07   # 事件循环执行顺序
npm run ex:08   # async/await 异步演进
npm run ex:09   # 核心模块演示
npm run server  # 启动 HTTP 服务器（浏览器访问 localhost:3000）
```

完成后，你已经掌握 TypeScript + Node.js 的完整基础。建议下一步：用 Express + TypeScript 做一个真实的 REST API 小项目。
