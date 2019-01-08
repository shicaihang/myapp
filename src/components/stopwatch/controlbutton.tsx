import * as React from 'react';
import { Button } from 'antd';

interface IButton {
    active: boolean;
    valid: boolean;
    onStart?: () => void;
    onPause?: () => void;
    onSplit?: () => void;
    onReset?: () => void;
}

const ControlButton = (props: IButton) => {
    const { active, valid, onStart, onPause, onSplit, onReset} = props;

    const style = {
        display: 'flex',
        'justify-content': 'space-around',
        margin: '20px auto',
        width: '40%',
    };
    return <div style={style}>
        <Button type={active ? "danger" : "primary"} disabled={!valid} onClick={active ? onPause : onStart}>{active ? '暂停' : '开始'}</Button>
        <Button type="primary" onClick={onSplit} disabled={!active || !valid}>{'计次'}</Button>
        <Button type="primary" onClick={onReset} disabled={active}>{'重置'}</Button>
    </div>
};


export default ControlButton;