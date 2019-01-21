import * as PIXI from 'pixi.js';

const addText = (app:any) => {
    const basicText = new PIXI.Text('Basic text in pixi');
    basicText.x = app.renderer.width / 2;
    basicText.y = app.renderer.height / 2 + 150;
    basicText.anchor.set(0.5);
    basicText.anchor.x = 0.5;
    basicText.anchor.y = 0.5;
    app.stage.addChild(basicText);
}

export default addText;