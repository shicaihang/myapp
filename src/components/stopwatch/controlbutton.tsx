import * as React from 'react';
import { Button } from 'antd';

interface IButton {
    active: boolean;
    onStart?: () => void;
    onPause?: () => void;
    onSplit?: () => void;
    onReset?: () => void;
}

const ControlButton = (props: IButton) => {
    const { active, onStart, onPause, onSplit, onReset } = props;

    const style = {
        display: 'flex',
        'justify-content': 'space-around',
        margin: '20px auto',
        width: '40%',
    };
    return <div style={style}>
        <Button type={active ? "danger" : "primary"} onClick={active ? onPause : onStart}>{active ? '暂停' : '开始'}</Button>
        <Button type="primary" onClick={onSplit}>{'计次'}</Button>
        <Button type="primary" onClick={onReset}>{'重置'}</Button>
    </div>
};


export default ControlButton;