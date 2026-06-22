# 第二章 TypeScript 进阶：泛型、类、工具类型

> 配套代码：`src/04-generics.ts`、`src/05-class.ts`、`src/06-utility-types.ts`
> 运行方式：`npm run ex:04`（依次 ex:05 / ex:06）

---

## 2.1 泛型（Generics）—— 重点难点

泛型让你写出**可复用、又保持类型安全**的代码。它就像「类型的参数」。

```typescript
// ❌ 不用泛型：要么写死，要么用 any 丢失类型信息
function identityBad(arg: any): any { return arg; }

// ✅ 用泛型：T 是类型占位符，调用时才确定
function identity<T>(arg: T): T { return arg; }

const a = identity<string>("hello"); // T = string
const b = identity(42);              // T 自动推断为 number
```

### 泛型接口

```typescript
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

interface UserData { name: string; age: number; }

const res: ApiResponse<UserData> = {
  code: 200,
  data: { name: "Alice", age: 25 }, // data 被约束为 UserData 结构
  message: "ok"
};
```

### 泛型约束（constraint）

用 `extends` 限制泛型必须满足某种结构：

```typescript
// 要求 T 必须有 length 属性
function logLength<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}
logLength("hello");   // ✅ 字符串有 length
logLength([1, 2, 3]); // ✅ 数组有 length
// logLength(123);    // ❌ number 没有 length
```

### 多个泛型参数

```typescript
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
const p = pair("age", 30); // [string, number]
```

---

## 2.2 类（Class）

TS 给 JS 的 class 增加了**访问修饰符**和**类型注解**：

```typescript
class Animal {
  // public（默认）/ private（仅类内）/ protected（类内+子类）
  private name: string;
  protected age: number;
  public readonly species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  public describe(): string {
    return `${this.name} is a ${this.species}`;
  }
}

// 继承
class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "dog"); // 必须先调用父类构造函数
  }
  bark(): void { console.log("Woof!"); }
}
```

### 参数属性简写

```typescript
class Version {
  // 在构造参数上加修饰符，TS 自动声明成员并赋值
  constructor(public num: number) {}
}
const v = new Version(5);
console.log(v.num); // 5
```

`constructor(public num: number)` 省去了手动 `this.num = num`。

### 实现接口

```typescript
interface Comparable<T> {
  compareTo(other: T): number;
}

class Score implements Comparable<Score> {
  constructor(public value: number) {}
  compareTo(other: Score): number {
    return this.value - other.value;
  }
}
```

---

## 2.3 高级类型：联合、交叉与类型收窄

```typescript
// 联合类型 union
type Result = string | number;

// 交叉类型 intersection（合并多个类型）
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged; // 必须同时有 name 和 age

// 类型收窄（narrowing）：根据判断缩小类型范围
function format(input: string | number): string {
  if (typeof input === "string") {
    return input.toUpperCase(); // 这里 input 是 string
  }
  return input.toFixed(2);      // 这里 input 是 number
}
```

---

## 2.4 工具类型（Utility Types）

TS 内置的类型「函数」，日常开发高频使用：

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type A = Partial<Todo>;   // 所有属性变可选
type B = Required<Todo>;  // 所有属性变必填
type C = Readonly<Todo>;  // 所有属性变只读
type D = Pick<Todo, "title" | "completed">; // 挑选部分属性
type E = Omit<Todo, "description">;         // 排除部分属性
type F = Record<"home" | "about", { title: string }>; // 构造键值对
```

| 工具类型 | 作用 |
|----------|------|
| `Partial<T>` | 所有属性可选 |
| `Required<T>` | 所有属性必填 |
| `Readonly<T>` | 所有属性只读 |
| `Pick<T, K>` | 选取指定属性 |
| `Omit<T, K>` | 排除指定属性 |
| `Record<K, V>` | 构造键值映射 |

---

## 2.5 tsconfig.json 配置详解

```json
{
  "compilerOptions": {
    "target": "ES2020",       // 编译成哪个版本的 JS
    "module": "commonjs",     // 模块系统
    "strict": true,           // 开启所有严格检查（强烈建议）
    "esModuleInterop": true,  // 兼容 CommonJS / ESM 互相导入
    "outDir": "./dist",       // 输出目录
    "rootDir": "./src",       // 源码目录
    "sourceMap": true         // 生成 source map，方便调试
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

`"strict": true` 是关键——它打开 `strictNullChecks` 等一系列严格选项，是 TS 真正发挥威力的前提。

---

## 2.6 本章小结与练习

```bash
npm run ex:04   # 泛型
npm run ex:05   # 类与继承
npm run ex:06   # 工具类型
```

下一章进入 **Node.js**，看 TypeScript 如何跑在服务器上。
