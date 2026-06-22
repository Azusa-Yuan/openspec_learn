/**
 * 练习 06：工具类型 Utility Types
 * 运行：npm run ex:06
 */

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// ---------- Partial：所有属性可选 ----------
function updateTodo(todo: Todo, fields: Partial<Todo>): Todo {
  return { ...todo, ...fields };
}
const todo: Todo = { title: "学 TS", description: "看文档", completed: false };
const updated = updateTodo(todo, { completed: true }); // 只传部分字段
console.log("Partial 更新后:", updated);

// ---------- Pick：挑选属性 ----------
type TodoPreview = Pick<Todo, "title" | "completed">;
const preview: TodoPreview = { title: "学 Node", completed: false };
console.log("Pick 预览:", preview);

// ---------- Omit：排除属性 ----------
type TodoWithoutDesc = Omit<Todo, "description">;
const noDesc: TodoWithoutDesc = { title: "练习", completed: true };
console.log("Omit 结果:", noDesc);

// ---------- Readonly：只读 ----------
const frozen: Readonly<Todo> = { title: "锁定", description: "x", completed: false };
// frozen.completed = true; // ❌ 只读不可改
console.log("Readonly:", frozen);

// ---------- Record：构造键值映射 ----------
type Page = "home" | "about" | "contact";
const pageTitles: Record<Page, string> = {
  home: "首页",
  about: "关于",
  contact: "联系",
};
console.log("Record 映射:", pageTitles);

export {};
