
function identity<T> (arg: T): T {return arg;};

function logIdentity<T> (arg: Array<T>): Array<T> {console.log(arg.length); return arg;};

let myIdentity: <T>(arg: T) => T = identity;

let myIdentity2: {<T>(arg: T): T} = identity; // 调用签名对象字面量定义泛型

interface myIdentityInterface<T> {<T>(arg: T): T};

let myIdentity3: myIdentityInterface<string> = identity; // 调用泛型接口定义泛型

myIdentity3('string');

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();

// 泛型约束
interface Lengthwise {
  length: number;
};

function logIdentity2<T extends Lengthwise> (arg: T): T {console.log(arg.length);return arg;};





