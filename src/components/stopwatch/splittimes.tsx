import * as React from 'react';
import { ShowTime } from './majorclock';
import { Card } from 'antd';

interface ISplits {
    times: ShowTime[];
}

const SplitTimes = (props: ISplits) => {
    return <div>
        {props.times.length?<Card style={{ width: '50% auto' }}>{renderItem(props)} </Card>:''}
    </div>
};

const renderItem = (props: ISplits) => {
    const { times } = props;
    return times.map((t: ShowTime, index: number) => <p key={t.toString()}>{`${t.min}:${t.sec}:${t.ms}  计次${index + 1}`}</p>);
}


export default SplitTimes;