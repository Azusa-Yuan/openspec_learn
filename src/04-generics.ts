/**
 * 练习 04：泛型 Generics
 * 运行：npm run ex:04
 */

// ---------- 基础泛型函数 ----------
function identity<T>(arg: T): T {
  return arg;
}
console.log("identity string:", identity<string>("hello"));
console.log("identity number:", identity(42)); // T 自动推断为 number

// ---------- 泛型接口 ----------
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}
interface UserData {
  name: string;
  age: number;
}
const res: ApiResponse<UserData> = {
  code: 200,
  data: { name: "Alice", age: 25 },
  message: "ok",
};
console.log("API 响应:", res);

// ---------- 泛型约束 ----------
function logLength<T extends { length: number }>(arg: T): T {
  console.log("长度:", arg.length);
  return arg;
}
logLength("hello");
logLength([1, 2, 3]);
// logLength(123); // ❌ number 没有 length

// ---------- 多个泛型参数 ----------
function makePair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
console.log("pair:", makePair("age", 30));

// ---------- 泛型类：一个简单的栈 ----------
class Stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
  get size(): number {
    return this.items.length;
  }
}
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log("栈 pop:", stack.pop(), "剩余 size:", stack.size);

export {};
