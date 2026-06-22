/**
 * 练习 02：interface 与 type
 * 运行：npm run ex:02
 */

// ---------- interface 定义对象契约 ----------
interface User {
  id: number;
  name: string;
  age?: number; // 可选属性
  readonly email: string; // 只读属性
}

const bob: User = { id: 1, name: "Bob", email: "bob@example.com" };
// bob.email = "x";  // ❌ email 只读
console.log("用户:", bob);

// ---------- interface 自动合并 ----------
interface Box {
  width: number;
}
interface Box {
  height: number;
}
const box: Box = { width: 10, height: 20 }; // 两次声明被合并
console.log("合并后的 Box:", box);

// ---------- interface 继承 ----------
interface Admin extends User {
  role: string;
}
const admin: Admin = { id: 2, name: "Root", email: "r@x.com", role: "super" };
console.log("管理员:", admin);

// ---------- type：联合 / 交叉 ----------
type ID = number | string; // 联合类型
const id1: ID = 1;
const id2: ID = "abc";

type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged; // 交叉类型：必须同时有 name 和 age
const p: Person = { name: "Tom", age: 18 };
console.log("ID:", id1, id2, "Person:", p);

// ---------- 字面量联合类型 ----------
type Status = "loading" | "success" | "error";
function render(status: Status): string {
  return `当前状态: ${status}`;
}
console.log(render("success"));
// render("pending"); // ❌ 只能是三个值之一

export {};
