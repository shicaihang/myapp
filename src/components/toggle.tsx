import * as React from 'react';

export interface ToggleOn {
    isToggleOn?: boolean;
    callBack: () => void;
}

export default class Toggle extends React.Component<ToggleOn> {
    constructor(props: ToggleOn) {
        super(props);
        this.state = { isToggleOn: false } as ToggleOn;
        // this.handleClick = this.handleClick.bind(this);

    }
    public render() {
        const state: ToggleOn = this.state as ToggleOn
        return (
            <div>
                <button onClick={this.handleClick}>
                    {state.isToggleOn ? 'ON' : 'OFF'}
                </button>
            </div>
        );
    }
    public handleClick = () => {
        this.props.callBack();
        this.setState((prevState: ToggleOn) => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    // public handleClick() {
    //     this.setState((prevState : ToggleOn) => ({
    //         isToggleOn: !prevState.isToggleOn
    //     }));
    // }
}