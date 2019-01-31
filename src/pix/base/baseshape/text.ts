import * as PIXI from 'pixi.js';
import { Point2dInterface } from './base';

interface TextInfoInterface {
    text: string;
    textAttr?: PIXI.TextStyleOptions;
    position: Point2dInterface;
}

const buildText = (textInfo: TextInfoInterface) => {
    const { text, textAttr, position } = textInfo;
    const message = new PIXI.Text(text, textAttr);
    message.position.set(position.x, position.y);
    message.anchor.set(0.5);
    return message;
};

export {
    buildText,
    TextInfoInterface
};