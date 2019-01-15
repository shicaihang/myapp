import * as React from 'react';
import { StoreState } from '../types/index';
export default class Log extends React.Component<StoreState> {
    public render() {
        const { logs } = this.props;
        return <div>
            {logs.map((p, index) => <p key={index}>{p}</p>)}
        </div>
    }
}
