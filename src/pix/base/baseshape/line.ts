import * as PIXI from 'pixi.js';
import { Point2dInterface } from './base';

interface LineInfoInterface {
    position: Point2dInterface;
    start: Point2dInterface;
    end: Point2dInterface;
    lineWidth: number;
    lineColor: number;
    lineAlpha: number;
}

const buildLine = (linefo: LineInfoInterface): PIXI.Graphics => {
    const ctx = new PIXI.Graphics();
    const { lineWidth, lineColor, lineAlpha, start, end, position} = linefo;
    ctx.lineStyle(lineWidth, lineColor, lineAlpha);
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.position.set(position.x, position.y);
    return ctx;
};

export {
    buildLine,
    LineInfoInterface
};