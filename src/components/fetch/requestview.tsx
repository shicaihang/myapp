import * as React from 'react';
import HTTP from 'src/http';
import { V } from 'src/http';
import { Input, Select } from 'antd';


interface User {
    id: string;
    name: string;
    time?: string;
}

interface Props {
    users: User[];
    number?: string;
    type?: string;
}

const url = {
    all: 'https://www.easy-mock.com/mock/59801fd8a1d30433d84f198c/example/user/all',
    kuaidi: 'http://www.kuaidi100.com/query',
}
const types = {
    shentong: '申通',
    EMS: 'ems',
    shunfeng: '顺丰',
    yuantong: '圆通',
    zhongtong: '中通',
    yunda: '韵达',
    tiantian: '天天',
    huitongkuaidi: '汇通',
    quanfengkuaidi: '全峰',
    debangwuliu: '德邦',
    zhaijisong: '宅急送'
}

export default class RequestView extends React.Component<Props, Props> {
    constructor(props: Props) {
        super(props);
        this.state = { users: [], type: 'yuanton' } as Props;

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
        this.setState({ users: data });
    }

    public handleSelect = (value: string) => { this.setState({ type: value } as Props) }

    public handleSearch = async (value: string) => {
        const myParams = {
            type: this.state.type,
            postid: value,
        }
        const data = await HTTP.getJP({ url: url.kuaidi, params: myParams } as V);
        // this.setState({ users: data });
        console.log(data);
    }

    public render() {
        const Search = Input.Search;
        const Option = Select.Option;
        return (
            <div>
                <input type='button' value='点击 http-get 方式获取数据' onClickCapture={this.handleClick} />
                <input type='button' value='点击 async-await 方式获取数据' onClickCapture={this.handleClick3} />
                {this.state.users &&
                    this.state.users.map((item: User, index: number) => (
                        <p key={index.toString()}>{item.name + item.time}</p>
                    ))}
                <div>
                    <Select defaultValue={types.yuantong} style={{ width: 100 }} onChange={this.handleSelect}>
                        {Object.keys(types).map((item) => (
                            <Option value={item} key={item}>{types[item]}</Option>
                        ))}
                    </Select>
                    <Search
                        placeholder='请输入快递单号……'
                        onSearch={this.handleSearch}
                        defaultValue={'11111111111'}
                        style={{ width: 200 }}
                    />
                </div>
            </div>
        )
    }
}