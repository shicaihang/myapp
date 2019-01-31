import * as PIXI from 'pixi.js';
// import { Loader, Resources } from '../type';
import { ModelDataInterface, IPolyInfo, StyleConfigInterface,} from './datainterface';
import { Point2dInterface } from '../base/baseshape/base';
import { buildPolygon, PolygonInfoInterface } from '../base/baseshape/polygon';
import { buildCircle, CircleInfoInterface } from '../base/baseshape/circle';
import { getSlidePIXIApplication } from './app';
import { PIXIEVENT } from '../base/event/event';
import { getRadian, lineLineAngleCCW } from '../base/baseshape/math';
import { defaultStyleCfg } from './constants';


export default class CircleSlide {
    public currentAngle: number;
    protected origin: Point2dInterface;
    protected PolyInfo: IPolyInfo;
    protected styleConfig: StyleConfigInterface;
    protected app: PIXI.Application;
    protected picUrls: string[];
    constructor(styleConfig:StyleConfigInterface = defaultStyleCfg) {
        this.styleConfig = styleConfig;
    }
    public init(elementId: string, picUrls: string[], data: ModelDataInterface): PIXI.Container {
        const app = getSlidePIXIApplication();
        this.app = app;
        this.picUrls = picUrls;

        const renderer = app.renderer;
        const eleNode = document.getElementById(elementId) || document.body;
        if (eleNode.firstChild) {
            eleNode.removeChild(eleNode.firstChild);
        }
        eleNode.appendChild(renderer.view);
        const stage = app.stage;
        stage.interactive = true;
        renderer.render(stage);
        this.currentAngle = data.rotation;
        this.initOrigin(app);
        this.initPolygon(app);
        this.initDrawing(app, data);
        return stage;
    }
    public initDrawing(app: PIXI.Application, data: ModelDataInterface) {
        const stage = app.stage;
        stage.removeChildren();

        const CircleContainer = new PIXI.Container();
        const circle = this.buildCircle(app);
        CircleContainer.addChild(circle);

        const pointContainer = new PIXI.Container();
        const url = this.picUrls[0];
        const point = this.buildSunPoint(url);
        this.sunPointBindAction(point, app, data);
        pointContainer.addChild(point);

        const polygonContainer = new PIXI.Container();
        const content = this.buildOriginContent(app);
        polygonContainer.addChild(content);

        stage.addChild(CircleContainer, pointContainer, polygonContainer);

    }

    public buildOriginContent(app: PIXI.Application) {
        const position = this.PolyInfo.polygonPosition;

        const contentStyle= this.styleConfig.contentStyle;

        const polygonInfo: PolygonInfoInterface = {
            polygon: this.PolyInfo.polygon,
            fillColor: contentStyle.fillColor,
            lineWidth: contentStyle.lineWidth,
            lineColor: contentStyle.lineColor,
            lineAlpha: contentStyle.lineAlpha,
            position: position,
        };
        const pixiPolygon = buildPolygon(polygonInfo);
        return pixiPolygon;
    }

    public buildCircle(app: PIXI.Application) {
        const { circleStyle } = this.styleConfig;
        const position = this.origin;
        const CircleInfo: CircleInfoInterface = {
            position: position,
            fillColor: circleStyle.fillColor,
            center: { x: 0, y: 0 },
            lineWidth: circleStyle.lineWidth,
            lineColor: circleStyle.lineColor,
            lineAlpha: circleStyle.lineAlpha,
            radius: circleStyle.radius,
        };
        const pixiCircle = buildCircle(CircleInfo);
        return pixiCircle;
    }

    protected initOrigin = (app: PIXI.Application) => {
        const width = app.renderer.width;
        const height = app.renderer.height;
        this.origin = { x: width / 2, y: height / 2 };
    }
    protected initPolygon = (app: PIXI.Application) => {
        const width = app.renderer.width;
        const height = app.renderer.height;
        const { contentStyle } = this.styleConfig;
        const contentPolylineCom = contentStyle.polylineCom;
        const polygonPosition = { x: (width - contentPolylineCom.width) / 2, y: (height - contentPolylineCom.height) / 2 };
        const polygon = contentStyle.polyline;
        this.PolyInfo = { polygon, polygonPosition };
    }


    /**
     * sun pic
     */
    protected buildSunPoint = (url: string) => {
        const { imgStyle, circleStyle } = this.styleConfig;
        const angle = this.transRotation();
        const origin = this.origin;
        const position = { x: origin.x - circleStyle.radius * Math.cos(getRadian(angle)), y: origin.y + Math.sin(getRadian(angle)) * circleStyle.radius };
        // const picUrls = this.picUrls;

        // picUrls.forEach(e => {
        //     if(!Resources[e]) {
        //         Loader.add({url: e});
        //     }
        // });
        // debugger
        const img = PIXI.Sprite.fromImage(url);
        img.width = imgStyle.width;
        img.height = imgStyle.height;
        img.anchor.set(0.5, 0.5);
        img.position.set(position.x, position.y);
        img.interactive = true;
        img.buttonMode = true;
        return img;
    }

    protected sunPointBindAction = (img: PIXI.Container, app: PIXI.Application, data: ModelDataInterface) => {

        img.on(PIXIEVENT.MOUSEDOWN, (e: any) => {
            this.onDragStartHandler(e, img);
            this.actvieCircle(app);
        }).on(PIXIEVENT.MOUSEUP, (e: any) => {
            this.onDragEndHandler(e, img);
            this.inactvieCircle(app);
        }).on(PIXIEVENT.MOUSEUPOUTSIDE, (e: any) => {
            this.onDragEndHandler(e, img);
            this.inactvieCircle(app);
        }).on(PIXIEVENT.MOUSEMOVE, (e: any) => {
            this.onDragMoveHandler(e, img, app, data);
        }).on(PIXIEVENT.MOUSEOVER, (e: any) => {
            this.actvieCircle(app);
        }).on(PIXIEVENT.MOUSEOUT, (e: any, ctx = img) => {
            if (img && !ctx.dragging ){
                this.inactvieCircle(app);
            }
        });
    }

    /**
     * draw move handler
     * @param rest index-0 is event, index-1 is pixi graphics
     */
    protected onDragStartHandler = (...rest: any[]) => {
        const event = rest[0];
        const ctx = rest[1];
        ctx.data = event.data;
        ctx._startPos = ctx.data.getLocalPosition(ctx.parent);
        ctx.dragging = true;
    }

    protected onDragEndHandler = (...rest: any[]) => {
        const ctx = rest[1];
        ctx.dragging = false;
        ctx.data = undefined;
        ctx._startPos = undefined;
        ctx._posDelta = undefined;

    }

    protected onDragMoveHandler = (...rest: any[]) => {
        const ctx = rest[1];
        const data = rest[3];
       
        const position = this.origin;
        const { circleStyle } = this.styleConfig;
        const initPosition = { x: position.x - circleStyle.radius, y: position.y };
        if (ctx && ctx.dragging) {
           
            const curMousePosition = ctx.data.getLocalPosition(ctx.parent); // 获取鼠标移动的位置
            const deltaAngle = lineLineAngleCCW(position, initPosition, position, curMousePosition) % 360;

            const deltaRadian = getRadian(deltaAngle);
            const newPosition = {
                x: position.x - Math.cos(deltaRadian) * circleStyle.radius,
                y: position.y + Math.sin(deltaRadian) * circleStyle.radius,
            }
            ctx.position.set(newPosition.x, newPosition.y);
            this.currentAngle = this.transRotation(deltaAngle);
            if (data.callBack) {
                data.callBack(this);
            }
        }
        
    }
    protected actvieCircle = (app: PIXI.Application) => {
        const circleContainer = app.stage.getChildAt(0);
        const circleGrap = circleContainer.getChildAt(0) as PIXI.Graphics;
        circleContainer.removeChild(circleGrap);

        const { circleStyle, circleColor } = this.styleConfig;
        circleStyle.lineColor = circleColor.active;
        const newCtx = this.buildCircle(app);
        circleContainer.addChild(newCtx);

        const pointContainer = app.stage.getChildAt(1);
        const pointGrap = pointContainer.getChildAt(0) as PIXI.Sprite;
        const picUrls = this.picUrls;
        const texture =  PIXI.Texture.from(picUrls[1]);
        pointGrap.texture = texture;
      
    }

    protected inactvieCircle = (app: PIXI.Application) => {
        const circleContainer = app.stage.getChildAt(0);
        const circleGrap = circleContainer.getChildAt(0) as PIXI.Graphics;
        circleContainer.removeChild(circleGrap);
        const { circleStyle, circleColor } = this.styleConfig;
        circleStyle.lineColor = circleColor.inactive;
        const newCtx = this.buildCircle(app);
        circleContainer.addChild(newCtx);

        const pointContainer = app.stage.getChildAt(1);
        const pointGrap = pointContainer.getChildAt(0) as PIXI.Sprite;
        const picUrls = this.picUrls;
        const texture =  PIXI.Texture.from(picUrls[0]);
        pointGrap.texture = texture;
   
    }

    protected transRotation = (modelAngle?: number) => {
        const angle = modelAngle || this.currentAngle;
        return angle ? (360 - angle) : 0;
    }

    protected changeRotation = (value:number) => {
        const app = this.app;
        const angle = this.transRotation(value);
        const position = this.origin;
        const pointContainer = app.stage.getChildAt(1);
        if (!pointContainer) {
            return;
        }
        const ctx = pointContainer.getChildAt(0) as PIXI.Container;
        if (!ctx) {
            return;
        }
        const deltaRadian = getRadian(angle);
        const { circleStyle } = this.styleConfig;
        const newPosition = {
            x: position.x - Math.cos(deltaRadian) * circleStyle.radius,
            y: position.y + Math.sin(deltaRadian) * circleStyle.radius,
        }
        ctx.position.set(newPosition.x, newPosition.y);
    }




}