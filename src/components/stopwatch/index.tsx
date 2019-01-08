import * as React from 'react';
import MajorClock from './majorclock';
import ControlButton from './controlbutton';
import SplitTimes from './splittimes';
import { message } from 'antd';

interface Time {
    min: number;
    sec: number;
    ms: number;
    active: boolean;
    valid: boolean;
    splits: [];
}

const defaultState: Time = { min: 0, sec: 0, ms: 0, active: false, valid: true, splits: [], };

export default class StopWatch extends React.Component<Time, object>{
    public timeID: any;
    public readonly state: Readonly<Time> = defaultState;
    constructor(props: Time) {
        super(props);
    }
    public render() {
        const timeStr = this.getTimeStr();
        return <div>
            <MajorClock timeStr={timeStr} />
            <ControlButton active={this.state.active} valid={this.state.valid} onStart={this.onStart} onPause={this.onPause} onSplit={this.onSplit} onReset={this.onReset} />
            <SplitTimes times={this.state.splits} />
        </div>
    }

    public componentWillUnmount() {
        clearInterval(this.timeID);
    }

    public tick() {
        let { min, sec, ms } = this.state;
        ms++;
        if (ms > 99) {
            sec++;
            ms = 0;
        }
        if (sec > 59) {
            min++;
            sec = 0;
        }
        if (min > 59) {
            message.info('已达到最大计时，请重置使用！');
            clearInterval(this.timeID);
            this.setState({ valid: false });
        }
        this.setState({
            min,
            sec,
            ms,
        });
    }
    public getTimeStr = () => {
        const { min, sec, ms } = this.state;
        const minStr: string = (min > 9 ? '' : '0') + min;
        const secStr: string = (sec > 9 ? '' : '0') + sec;
        const msStr: string = (ms > 9 ? '' : '0') + ms;
        return `${minStr}:${secStr}:${msStr}`;
    }
    public onStart = () => {
        this.timeID = setInterval(
            () => this.tick(),
            10
        );
        this.setState({
            active: true,
        });
    }
    public onPause = () => {
        clearInterval(this.timeID);
        this.setState({
            active: false,
        });
    }
    public onSplit = () => {
        const timeStr = this.getTimeStr();
        const sPlits: string[] = Array.from(this.state.splits);
        sPlits.push(timeStr);
        this.setState({
            splits: sPlits,
        });
    }
    public onReset = () => {
        clearInterval(this.timeID);
        this.setState(defaultState);
    }

}