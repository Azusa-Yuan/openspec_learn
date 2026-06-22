/**
 * 练习 09：Node.js 核心内置模块
 * 运行：npm run ex:09
 */

import path from "path";
import os from "os";
import crypto from "crypto";
import { EventEmitter } from "events";
import fs from "fs/promises";

async function main(): Promise<void> {
  // ---------- path：跨平台路径处理 ----------
  console.log("=== path 模块 ===");
  const p = path.join("/usr", "local", "bin", "node");
  console.log("join:", p);
  console.log("basename:", path.basename(p));
  console.log("dirname:", path.dirname(p));
  console.log("extname:", path.extname("index.ts"));

  // ---------- os：操作系统信息 ----------
  console.log("\n=== os 模块 ===");
  console.log("平台:", os.platform());
  console.log("CPU 核心数:", os.cpus().length);
  console.log("总内存(GB):", (os.totalmem() / 1024 ** 3).toFixed(1));

  // ---------- crypto：哈希 ----------
  console.log("\n=== crypto 模块 ===");
  const hash = crypto.createHash("sha256").update("hello").digest("hex");
  console.log("sha256('hello'):", hash.slice(0, 16), "...");

  // ---------- EventEmitter：事件机制 ----------
  console.log("\n=== events 模块 ===");
  const emitter = new EventEmitter();
  emitter.on("greet", (name: string) => {
    console.log(`收到 greet 事件，参数: ${name}`);
  });
  emitter.emit("greet", "Alice");

  // ---------- fs：文件读写 ----------
  console.log("\n=== fs 模块 ===");
  const tmpFile = path.join(os.tmpdir(), "ts-node-demo.txt");
  await fs.writeFile(tmpFile, "Node.js 文件写入演示");
  const content = await fs.readFile(tmpFile, "utf8");
  console.log(`写入并读回 ${tmpFile}:`, content);
  await fs.unlink(tmpFile); // 清理
  console.log("临时文件已删除");
}

main().catch((err) => console.error(err));

export {};
