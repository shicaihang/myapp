import * as React from 'react';
import Toggle from './toggle';

export interface Time {
    date?: Date;
    detail?: string
    show?: boolean;
}

export default class Clock extends React.Component<Time> {
    public timeID: any;
    public readonly state: Readonly<Time> = { date: new Date() };
    constructor(props: Time) {
        super(props);
        this.state = { date: new Date(), show:true } as Time;
    }

    public render() {
        return (
            <div>{this.state.show && <div>
                {/* <h1>{this.state.detail}</h1> */}
                {this.state.date && <h2>现在是北京时间 {this.state.date.toLocaleTimeString()}.</h2>}
            </div>}
                <Toggle callBack = {this.isShow} />
            </div>
        );
    }

    public componentDidMount() {
        this.timeID = setInterval(
            () => this.tick(),
            1000
        );
    }

    public componentWillUnmount() {
        clearInterval(this.timeID);
    }

    public tick() {
        this.setState({
            date: new Date(),
            detail: '时间'
        });
    }

    public isShow = () => {
        this.setState({
            show: !this.state.show
        });
    }
}

