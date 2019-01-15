import Person from './person';
export default class Man extends Person {
    public static staticProp: string = 'i am a static prop'; // 静态属性
    constructor(name: string, age:number) {
        super(name); // 初始化当前类属性之前必须调用父类的构造函数super
        this.age = age;
    }
    get getName(): string {  // get set
        return this.name;
    }
    get getAge(): number {
        return this.age;
    }
    set setAge(age: number) {
        this.age = age;
    }
    public getStaticProp = () => Man.staticProp; // 静态属性就是通过类访问，实例上没有
}

