# TypeScript 基础 + Node.js 生态系统 学习教程

一套**边读边跑**的中文教程：每个知识点都有文档讲解 + 可运行的代码示例。

## 环境要求

- Node.js（建议 18+，本项目用 20 测试通过）
- 依赖已通过 `npm install` 安装（`typescript`、`ts-node`、`@types/node`）

```bash
npm install   # 若依赖未安装，先执行这一步
```

## 学习路线

按顺序学习，**先读文档，再运行对应代码，最后自己改一改**。
**完全不会 JavaScript？从第 0 章开始**，它是 TypeScript 的地基。

| 阶段 | 文档 | 配套代码 | 运行命令 |
|------|------|----------|----------|
| 0a. JS 变量/类型/控制流 | [`docs/00-javascript-基础.md`](docs/00-javascript-基础.md) | `src/js-01-basics.js` | `npm run js:01` |
| 0b. JS 函数/闭包 | 同上 | `src/js-02-functions.js` | `npm run js:02` |
| 0c. JS 数组/对象/解构 | 同上 | `src/js-03-array-object.js` | `npm run js:03` |
| 1. TS 基础类型 | [`docs/01-typescript-基础.md`](docs/01-typescript-基础.md) | `src/01-types.ts` | `npm run ex:01` |
| 2. interface/type | 同上 | `src/02-interface-type.ts` | `npm run ex:02` |
| 3. 函数类型 | 同上 | `src/03-functions.ts` | `npm run ex:03` |
| 4. 泛型 | [`docs/02-typescript-进阶.md`](docs/02-typescript-进阶.md) | `src/04-generics.ts` | `npm run ex:04` |
| 5. 类与继承 | 同上 | `src/05-class.ts` | `npm run ex:05` |
| 6. 工具类型 | 同上 | `src/06-utility-types.ts` | `npm run ex:06` |
| 7. 事件循环 | [`docs/03-nodejs-基础与生态.md`](docs/03-nodejs-基础与生态.md) | `src/07-event-loop.ts` | `npm run ex:07` |
| 8. 异步编程 | 同上 | `src/08-async.ts` | `npm run ex:08` |
| 9. 核心模块 | 同上 | `src/09-core-modules.ts` | `npm run ex:09` |
| 10. HTTP 服务器 | 同上 | `src/10-http-server.ts` | `npm run server` |

> 服务器启动后浏览器访问 <http://localhost:3000> 或 <http://localhost:3000/api/users/1>，按 `Ctrl+C` 停止。

## 项目结构

```
openspec_learn/
├── README.md              # 本文件：学习导航
├── package.json           # 依赖与运行脚本
├── tsconfig.json          # TypeScript 编译配置
├── docs/                  # 教程文档
│   ├── 00-javascript-基础.md   # ← 不会 JS 从这里开始
│   ├── 01-typescript-基础.md
│   ├── 02-typescript-进阶.md
│   └── 03-nodejs-基础与生态.md
└── src/                   # 可运行的代码示例
    ├── js-01-basics.js ~ js-03-array-object.js  # JavaScript（纯 JS）
    ├── 01-types.ts ~ 06-utility-types.ts        # TypeScript
    └── 07-event-loop.ts ~ 10-http-server.ts     # Node.js
```

## 常用命令

```bash
npm run js:01      # 运行 JavaScript 基础练习（js:01~03）
npm run ex:01      # 运行 TypeScript/Node 练习（01~09）
npm run server     # 启动 HTTP 服务器
npm run build      # 用 tsc 把 src 编译成 dist（生产构建）
npx tsc --noEmit   # 只做类型检查，不输出文件
```

## 两者的关系（一句话）

> TypeScript 在**开发时**做类型检查 → 编译成 JavaScript → 由 **Node.js 运行时**执行。
> TS 负责「写得对」，Node 负责「跑得动」。

学完这 10 个练习，建议下一步：用 **Express + TypeScript** 做一个真实的 REST API 小项目。
