/*
 * JS 练习 01：变量、数据类型、运算符、控制流
 * 运行：npm run js:01
 * （纯 JavaScript，用 node 直接运行，不需要编译）
 */

// ---------- 变量 ----------
const name = "Alice"; // const：常量，不可重新赋值
let age = 25; // let：可以改
age = 26;
console.log("姓名:", name, "年龄:", age);

// ---------- 数据类型 ----------
console.log("\n=== 数据类型 ===");
console.log(typeof 42, typeof "hi", typeof true, typeof undefined);
console.log("数组的 typeof:", typeof [1, 2]); // object
console.log("null 的 typeof:", typeof null); // object（历史 bug）

// ---------- 运算符 ----------
console.log("\n=== 运算符 ===");
console.log("加法 1+2 =", 1 + 2);
console.log("取余 10%3 =", 10 % 3);
console.log("幂 2**10 =", 2 ** 10);

// 严格相等 vs 宽松相等
console.log("1 === '1' :", 1 === "1"); // false（推荐用 ===）
console.log("1 == '1'  :", 1 == "1"); // true（不推荐，会偷偷转类型）

// ---------- 模板字符串 ----------
const who = "世界";
console.log(`\n模板字符串: 你好，${who}！结果是 ${1 + 2}`);

// ---------- 控制流：if ----------
console.log("\n=== 条件判断 ===");
const score = 85;
if (score >= 90) {
  console.log("优秀");
} else if (score >= 60) {
  console.log("及格");
} else {
  console.log("不及格");
}

// ---------- 控制流：循环 ----------
console.log("\n=== 循环 ===");
for (let i = 0; i < 3; i++) {
  console.log("for 循环第", i, "次");
}

for (const item of [10, 20, 30]) {
  console.log("for...of 遍历:", item);
}

let count = 3;
while (count > 0) {
  console.log("while 倒数:", count);
  count--;
}
