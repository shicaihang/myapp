import * as PIXI from 'pixi.js';
import { Point2dInterface } from './base';

interface PolygonInfoInterface {
    polygon: Point2dInterface[];
    fillColor: number;
    lineWidth: number;
    lineColor: number;
    lineAlpha: number;
    position: Point2dInterface;
}

const buildPolygon = (polygonInfo: PolygonInfoInterface): PIXI.Graphics => {
    const ctx = new PIXI.Graphics();
    const { polygon, fillColor, lineWidth, lineColor, lineAlpha, position} = polygonInfo;
    ctx.beginFill(fillColor);
    ctx.lineStyle(lineWidth, lineColor, lineAlpha);
    const first = polygon.splice(0, 1)[0];
    ctx.moveTo(first.x, first.y);
    polygon.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.endFill();
    ctx.position.set(position.x, position.y);
    ctx.hitArea = ctx.getLocalBounds();
    ctx.interactive = true;
    return ctx;
};

export {
    buildPolygon,
    PolygonInfoInterface
};