import * as React from 'react';
import MyPIXI from 'src/pix';
import circleSlide from 'src/pix/circleslide/circleslide';
import sectorSlide from 'src/pix/sectorslide/sectorslide';
import { ModelDataInterface } from 'src/pix/circleslide/datainterface';
import active from 'src/res/icon_sunshine01_hover.png';
import inactive from 'src/res/icon_sunshine01.png';



const style = {
    margin: '20px'
}

export default class PIXI extends React.Component<{}, object>{
    public MyPixi: MyPIXI = new MyPIXI();
    public circleSlide: circleSlide = new circleSlide();
    public sectorSlide: sectorSlide = new sectorSlide();
    public data:ModelDataInterface = {
        rotation: 0,
        callBack: (e:circleSlide) => {console.log(e.currentAngle)},
    }
    public render() {
        return <div style={{display:'flex', justifyContent: 'space-around', alignItems:'center'}}>
            <div id='pixi' style={style} onWheel={this.resize} />
            <div id='pixi1' style={style}  />
            <div id='pixi2' style={style}  />
            </div>;
    }

    public componentDidMount() {
        this.MyPixi.start();
        this.circleSlide.init('pixi1', [inactive, active], this.data);
        this.sectorSlide.init('pixi2', [inactive, active], this.data);
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


