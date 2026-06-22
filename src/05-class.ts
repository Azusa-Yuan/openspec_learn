/**
 * 练习 05：类 Class
 * 运行：npm run ex:05
 */

// ---------- 访问修饰符与继承 ----------
class Animal {
  private name: string;
  protected age: number;
  public readonly species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  public describe(): string {
    return `${this.name} 是一只 ${this.species}，${this.age} 岁`;
  }
}

class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "狗"); // 必须先调用父类构造函数
  }
  bark(): void {
    console.log("汪汪!");
  }
}

const dog = new Dog("旺财", 3);
console.log(dog.describe());
dog.bark();

// ---------- 参数属性简写 ----------
class Version {
  constructor(public num: number) {} // 自动声明并赋值 this.num
}
console.log("版本号:", new Version(5).num);

// ---------- 实现接口 ----------
interface Comparable<T> {
  compareTo(other: T): number;
}
class Score implements Comparable<Score> {
  constructor(public value: number) {}
  compareTo(other: Score): number {
    return this.value - other.value;
  }
}
const s1 = new Score(80);
const s2 = new Score(95);
console.log("分数比较 (负数表示 s1 < s2):", s1.compareTo(s2));

// ---------- getter / setter ----------
class Temperature {
  private celsius = 0;
  get fahrenheit(): number {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value: number) {
    this.celsius = (value - 32) / 1.8;
  }
}
const t = new Temperature();
t.fahrenheit = 212;
console.log("212℉ 对应摄氏度 fahrenheit getter:", t.fahrenheit);

export {};
