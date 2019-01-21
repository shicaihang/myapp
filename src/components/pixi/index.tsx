import * as React from 'react';
import MyPIXI from 'src/pix';


const style = {
    margin: '20px'
}

export default class PIXI extends React.Component<{}, object>{
    public MyPixi: MyPIXI = new MyPIXI();
    public render() {
        return <div id='pixi' style={style} onWheel={this.resize} />;
    }

    public componentDidMount() {
        this.MyPixi.start();
    }

    public componentWillUnmount() {
        this.MyPixi.destroy();
    }
    public resize = (e: any) => {
        if (this.MyPixi.app) {
            this.MyPixi.app.resize(e);
        }
    }

}


