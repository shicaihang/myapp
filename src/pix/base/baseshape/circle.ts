import * as PIXI from 'pixi.js';
import { Point2dInterface } from './base';

interface CircleInfoInterface {
    lineWidth: number;
    lineColor: number;
    fillColor: number;
    lineAlpha: number;
    position: Point2dInterface;
    center: Point2dInterface;
    radius: number;
    startAngle?: number;
    endAngle?: number;
    antiClockWise?: boolean;
}

const buildSector = (CircleInfo: CircleInfoInterface) => {
    const { lineWidth, lineColor, fillColor, lineAlpha, center, radius, startAngle = 0, endAngle = 2 * Math.PI, antiClockWise = false, position = {x: 0, y: 0} } = CircleInfo;
    const ctx = new PIXI.Graphics();
    ctx.moveTo(center.x, center.y);
    ctx.beginFill(fillColor, lineAlpha);
    ctx.lineStyle(lineWidth, lineColor, lineAlpha);
    ctx.arc(center.x, center.y, radius, startAngle, endAngle, antiClockWise);
    ctx.position.set(position.x, position.y);
    ctx.hitArea = ctx.getLocalBounds();
    ctx.interactive = true;
    return ctx;
};

const buildCircle = (CircleInfo: CircleInfoInterface) => {
    const { lineWidth, lineColor, fillColor, lineAlpha, center, radius, position = { x: 0, y: 0 } } = CircleInfo;
    const ctx = new PIXI.Graphics();
    ctx.beginFill(fillColor, lineAlpha);
    ctx.lineStyle(lineWidth, lineColor, lineAlpha);
    ctx.drawCircle(center.x, center.y, radius);
    ctx.position.set(position.x, position.y);
    ctx.hitArea = ctx.getLocalBounds();
    ctx.interactive = true;
    return ctx;
};

export {
    buildSector,
    buildCircle,
    CircleInfoInterface
};