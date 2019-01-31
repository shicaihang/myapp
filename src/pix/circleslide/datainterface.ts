
import { Point2dInterface } from '../base/baseshape/base';
/**
 * model data
 */
interface ModelDataInterface {
    rotation: number;         // 
    callBack?: (e: any) => void;
}

interface IContentStyle {
    polylineCom: any;
    polyline: Point2dInterface[];
    lineWidth: number;
    lineAlpha: number;
    lineColor: number;
    fillColor: number;
}

interface IImgStyle {
    width: number,
    height: number,
}

interface ICircleStyle {
    lineWidth: number;
    lineAlpha: number;
    radius: number;
    lineColor: number;
    fillColor: number;
    startAngle?: number,
    endAngle?: number,
}

interface IPolyInfo {
    polygon: Point2dInterface[];
    polygonPosition: Point2dInterface;
}

interface ICircleColor {
    active: number;
    inactive: number;
}

interface StyleConfigInterface {
    contentStyle: IContentStyle;
    circleStyle: ICircleStyle;
    imgStyle: IImgStyle;
    circleColor: ICircleColor;
}

/**
 * model data in widgit
 */
interface WidgitDataInterface {
    url?: string;         // dom element id bind pixi stage
    width?: number;           // renderer stage width
    height?: number;         // renderer stage height
    styleConfig?: StyleConfigInterface;  // style config
}

export {
    WidgitDataInterface,
    ModelDataInterface,
    IContentStyle,
    ICircleStyle,
    IImgStyle,
    IPolyInfo,
    StyleConfigInterface,
}