/**
 * 练习 08：异步编程的三代演进
 * 运行：npm run ex:08
 */

// 模拟一个异步操作（如网络请求 / 读数据库）
function fetchData(id: number, delayMs: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`数据-${id}`), delayMs);
  });
}

// ---------- 第二代：Promise 链式 ----------
function promiseStyle(): Promise<void> {
  console.log("\n[Promise 链式]");
  return fetchData(1, 100)
    .then((d1) => {
      console.log("拿到", d1);
      return fetchData(2, 100);
    })
    .then((d2) => {
      console.log("拿到", d2);
    });
}

// ---------- 第三代：async/await（推荐） ----------
async function asyncStyle(): Promise<void> {
  console.log("\n[async/await 顺序执行]");
  const d1 = await fetchData(3, 100);
  console.log("拿到", d1);
  const d2 = await fetchData(4, 100);
  console.log("拿到", d2);
}

// ---------- 并发：Promise.all 同时发起 ----------
async function concurrentStyle(): Promise<void> {
  console.log("\n[Promise.all 并发执行]");
  const start = Date.now();
  // 两个请求同时发起，总耗时约等于最慢的那个，而非相加
  const [a, b] = await Promise.all([fetchData(5, 150), fetchData(6, 150)]);
  console.log("并发拿到", a, b, `耗时约 ${Date.now() - start}ms`);
}

// ---------- 错误处理 ----------
async function errorHandling(): Promise<void> {
  console.log("\n[错误处理 try/catch]");
  try {
    await Promise.reject(new Error("模拟失败"));
  } catch (err) {
    console.log("捕获到错误:", (err as Error).message);
  }
}

// 依次运行所有示例
(async () => {
  await promiseStyle();
  await asyncStyle();
  await concurrentStyle();
  await errorHandling();
  console.log("\n全部异步示例执行完毕");
})();

export {};
