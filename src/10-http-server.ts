/**
 * 练习 10：用 Node 核心模块起一个 HTTP 服务器（不依赖任何框架）
 * 运行：npm run server
 * 然后浏览器访问 http://localhost:3000  或  http://localhost:3000/api/users/1
 */

import { createServer, IncomingMessage, ServerResponse } from "http";
import { URL } from "url";

const PORT = 3000;

// 模拟数据
const users: Record<string, { id: number; name: string }> = {
  "1": { id: 1, name: "Alice" },
  "2": { id: 2, name: "Bob" },
};

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  console.log(`${req.method} ${url.pathname}`);

  // 路由 1：首页
  if (url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("欢迎来到 Node.js HTTP 服务器！试试访问 /api/users/1");
    return;
  }

  // 路由 2：REST 风格 API，返回 JSON
  const match = url.pathname.match(/^\/api\/users\/(\w+)$/);
  if (match && req.method === "GET") {
    const id = match[1];
    const user = users[id];
    if (user) {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ code: 200, data: user }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ code: 404, message: "用户不存在" }));
    }
    return;
  }

  // 兜底 404
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("404 Not Found");
});

server.listen(PORT, () => {
  console.log(`服务器已启动: http://localhost:${PORT}`);
  console.log("按 Ctrl+C 停止");
});
