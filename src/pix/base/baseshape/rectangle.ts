import * as PIXI from 'pixi.js';
import { Point2dInterface } from './base';

interface RectInfoInterface {
    fillColor: number;
    lineWidth?: number;
    lineColor?: number;
    lineAlpha?: number;
    corner?: Point2dInterface;
    width: number;
    height: number;
    position: Point2dInterface;
}

const buildRect = (rectInfo: RectInfoInterface) => {
    const ctx = new PIXI.Graphics();
    const {fillColor, lineAlpha = 1, lineWidth = 1, lineColor = 0xFFFFFF, corner = {x: 0, y: 0}, width, height, position} = rectInfo;
    ctx.beginFill(fillColor);
    ctx.lineStyle(lineWidth, lineColor, lineAlpha);
    ctx.drawRect(corner.x, corner.y, width, height);
    ctx.endFill();
    ctx.position.set(position.x, position.y);
    // 此处有坑，如果shape没有设置这个属性，就算interactive设置为true，也无法监听事件
    ctx.hitArea = new PIXI.Rectangle(corner.x, corner.y, width, height);
    ctx.interactive = true;
    return ctx;
};

export {
    buildRect,
    RectInfoInterface
};