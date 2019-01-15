import * as React from 'react';
import HTTP from 'src/http';
import { V } from 'src/http';


interface User {
    id: string;
    name: string;
}

interface Props {
    users: User[];
}

const url = {
    all: 'https://www.easy-mock.com/mock/59801fd8a1d30433d84f198c/example/user/all'
}

export default class RequestView extends React.Component<Props, Props> {
    constructor(props: Props) {
        super(props);
        this.state = { users: [] } as Props;

    }
    // promise 经典写法
    public handleClick = () => {
        fetch(url.all).then(res => res.json()).then(data => {
            console.log(data);
            this.setState({ users: data });
        }).catch(e => console.log('错误:', e));
    }
    // async await写法,好处就是把异步执行写成类似同步的效果
    public handleClick2 = async () => {
        try {
            const res = await fetch(url.all); // await + Expression Expression如果是个promise对象 则返回promise resolve的结果
            const users = await res.json();
            this.setState({ users });
        } catch (error) {
            console.log('错误', error);
        }
    }
    // 调用封装好的HTTP网络请求模块
    public handleClick3 = async () => {
        const data = await HTTP.get({ url: url.all } as V);
        this.setState({users:data});  
    }

    public render() {
        return (
            <div>
                <input type="button" value="点击 http-get 方式获取数据" onClickCapture={this.handleClick} />
                <input type="button" value="点击 async-await 方式获取数据" onClickCapture={this.handleClick2} />
                <input type="button" value="点击 async-await 方式获取数据" onClickCapture={this.handleClick3} />
                {this.state.users &&
                    this.state.users.map((item: User, index: number) => (
                        <p key={index.toString()}>{item.name}</p>
                    ))}
            </div>
        )
    }
}