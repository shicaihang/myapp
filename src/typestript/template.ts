
function identity<T> (arg: T): T {return arg;};

function logIdentity<T> (arg: T[]): T[] {console.log(arg.length); return arg;};

let myIdentity: <T>(arg: T) => T = identity;

type IdentityInterface<S> = <T>(arg: T) => T;

let myIdentity3: IdentityInterface<string> = identity; // 调用泛型接口定义泛型

myIdentity3('string');

// 泛型类
class GenericNumber<T> {
  public zeroValue: T;
  public add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();

// 泛型约束
interface Lengthwise {
  length: number;
};

function logIdentity2<T extends Lengthwise> (arg: T): T {console.log(arg.length);return arg;};





