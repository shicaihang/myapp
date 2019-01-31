import * as PIXI from 'pixi.js';
import { Point2dInterface } from './base';
import { getAngle, getRadian } from './math';

interface ArrowInfoInterface {
    start: Point2dInterface;
    end: Point2dInterface;
    theta: number; // 三角斜边一直线夹角
    headlen: number; // 三角斜边长度
    lineWidth: number; // 箭头线宽度
    lineColor: number;
    lineAlpha: number;
    position: Point2dInterface;
}

const buildArrow = (arrowInfo: ArrowInfoInterface) => {
    const { start, end, theta = 30, headlen = 10, lineWidth = 1, lineColor, lineAlpha = 1, position = { x: 0, y: 0 } } = arrowInfo;
    const fromX = start.x;
    const fromY = start.y;
    const toX = end.x;
    const toY = end.y;
    const angle = getAngle(Math.atan2(fromY - toY, fromX - toX));
    const angle1 = getRadian(angle + theta);
    const angle2 = getRadian(angle - theta);
    const topX = headlen * Math.cos(angle1);
    const topY = headlen * Math.sin(angle1);
    const botX = headlen * Math.cos(angle2);
    const botY = headlen * Math.sin(angle2);
    const ctx = new PIXI.Graphics();
    let arrowX;
    let arrowY;
    ctx.lineStyle(lineWidth, lineColor, lineAlpha);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.position.set(position.x, position.y);
    ctx.hitArea = ctx.getLocalBounds();
    ctx.interactive = true;
    return ctx;
};

export {
    buildArrow,
    ArrowInfoInterface
};