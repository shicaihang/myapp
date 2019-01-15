import * as React from 'react';
import testPIXI from 'src/pix';


const style = {
    margin: '20px'
}

export default class PIXI extends React.Component<{}, object>{

    public render (){
        return <div id='pixi' style={style}/>;
    }

    public componentDidMount (){
        testPIXI();
    }

}


  