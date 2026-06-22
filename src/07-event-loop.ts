/**
 * 练习 07：事件循环执行顺序
 * 运行：npm run ex:07
 *
 * 观察输出顺序，理解：同步 -> 微任务 -> 宏任务
 */

console.log("1. 同步代码开始");

// 宏任务（定时器）：最后执行
setTimeout(() => {
  console.log("5. setTimeout 宏任务（即使延迟 0 也最后）");
}, 0);

// setImmediate 也是宏任务（check 阶段）
setImmediate(() => {
  console.log("6. setImmediate 宏任务");
});

// 微任务（Promise）：在同步代码后、宏任务前执行
Promise.resolve().then(() => {
  console.log("4. Promise 微任务");
});

// process.nextTick 优先级高于 Promise 微任务
process.nextTick(() => {
  console.log("3. process.nextTick（最高优先级的微任务）");
});

console.log("2. 同步代码结束");

/*
 * 预期输出顺序：
 * 1. 同步代码开始
 * 2. 同步代码结束
 * 3. process.nextTick
 * 4. Promise 微任务
 * 5. setTimeout 宏任务
 * 6. setImmediate 宏任务
 *
 * 记忆：同步全部跑完 -> 清空微任务(nextTick 先于 Promise) -> 再跑宏任务
 */

export {};
