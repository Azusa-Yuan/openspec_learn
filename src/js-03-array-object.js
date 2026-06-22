/*
 * JS 练习 03：数组、对象、解构、展开
 * 运行：npm run js:03
 */

// ---------- 数组常用方法（高频！） ----------
console.log("=== 数组方法 ===");
const nums = [1, 2, 3, 4, 5];

console.log("map 每个 *2:", nums.map((n) => n * 2));
console.log("filter 偶数:", nums.filter((n) => n % 2 === 0));
console.log("reduce 求和:", nums.reduce((acc, n) => acc + n, 0));
console.log("find 第一个 >3:", nums.find((n) => n > 3));
console.log("includes 3:", nums.includes(3));
console.log("length:", nums.length);

// 链式调用：先筛选再转换
const result = nums.filter((n) => n > 2).map((n) => n * 10);
console.log("链式 (>2 再 *10):", result);

// ---------- 对象操作 ----------
console.log("\n=== 对象操作 ===");
const user = { name: "Alice", age: 25 };
user.age = 26; // 修改
user.email = "a@x.com"; // 新增
console.log("读取 name:", user.name);
console.log("所有键:", Object.keys(user));
console.log("所有值:", Object.values(user));

// 对象方法 + this
const calculator = {
  value: 0,
  add(n) {
    this.value += n; // this 指向对象自己
    return this; // 返回自己以支持链式
  },
};
calculator.add(5).add(3);
console.log("计算器链式调用结果:", calculator.value); // 8

// ---------- 解构 ----------
console.log("\n=== 解构 ===");
const [first, second] = [10, 20];
console.log("数组解构:", first, second);

const { name, age } = user;
console.log("对象解构:", name, age);

// ---------- 展开运算符 ... ----------
console.log("\n=== 展开运算符 ===");
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log("数组展开合并:", arr2);

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 };
console.log("对象展开合并:", obj2);

// 实战组合：常见的「更新对象某个字段」写法
const updated = { ...user, age: 30 };
console.log("不可变更新:", updated, "原对象未变:", user.age);
