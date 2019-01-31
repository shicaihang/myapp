import * as PIXI from 'pixi.js';
import { ModelDataInterface, StyleConfigInterface,} from '../circleslide/datainterface';
import { buildSector, CircleInfoInterface } from '../base/baseshape/circle';
import { getRadian, lineLineAngleCCW } from '../base/baseshape/math';
import CircleSlide from '../circleslide/circleslide';
import { defaultStyleCfg} from './constants';


export default class SectorSlide extends CircleSlide {
    constructor(styleConfig:StyleConfigInterface = defaultStyleCfg) {
        super();
        this.styleConfig = styleConfig;
    }

    public initDrawing(app: PIXI.Application, data: ModelDataInterface) {
        const stage = app.stage;
        stage.removeChildren();
        const SectorContainer = new PIXI.Container();
        const sector = this.buildSector(app);
        SectorContainer.addChild(sector);

        const pointContainer = new PIXI.Container();
        const url = this.picUrls[0];
        const point = this.buildSunPoint(url);
        this.sunPointBindAction(point, app, data);
        pointContainer.addChild(point);

        const polygonContainer = new PIXI.Container();
        const content = this.buildOriginContent(app);
        polygonContainer.addChild(content);

        stage.addChild(SectorContainer, pointContainer, polygonContainer);

    }



    public buildSector(app: PIXI.Application) {
        const width = app.renderer.width;
        const height = app.renderer.height;
        const { circleStyle, contentStyle } = this.styleConfig;
        const contentPolylineCom = contentStyle.polylineCom;
        const position = { x: width - 50, y: height + contentPolylineCom.heightB * 0.5 - 30 };
        const SectorInfo: CircleInfoInterface = {
            position: position,
            center: { x: 0, y: 0 },
            fillColor: circleStyle.fillColor,
            lineWidth: circleStyle.lineWidth,
            lineColor: circleStyle.lineColor,
            lineAlpha: circleStyle.lineAlpha,
            radius: circleStyle.radius,
            startAngle: Math.PI,
            endAngle: -Math.PI / 2,
        };
        const pixiSector = buildSector(SectorInfo);
        return pixiSector;
    }
    protected initOrigin = (app: PIXI.Application) => {
        const { contentStyle } = this.styleConfig;
        const contentPolylineCom = contentStyle.polylineCom;
        const width = app.renderer.width;
        const height = app.renderer.height;
        this.origin = { x: width - 50, y: height + contentPolylineCom.heightB * 0.5 - 30 };
    }

    protected initPolygon = (app: PIXI.Application) => {
        const width = app.renderer.width;
        const height = app.renderer.height;
        const polygonPosition = { x: width - 50, y: height  - 30 };
        const { contentStyle } = this.styleConfig;
        const polygon = contentStyle.polyline;
        this.PolyInfo = { polygon, polygonPosition };
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
            if (deltaAngle >= 270 && deltaAngle <=360) {
                ctx.position.set(newPosition.x, newPosition.y);
                this.currentAngle = deltaAngle;
            }

            if (data.callBack) {
                data.callBack(this);
            }
           

        }
    }

  
    protected actvieCircle = (app: PIXI.Application) => {
        const sectorContainer = app.stage.getChildAt(0);
        const sectorGrap = sectorContainer.getChildAt(0) as PIXI.Graphics;
        sectorContainer.removeChild(sectorGrap);
        const { circleStyle, circleColor } = this.styleConfig;
        circleStyle.lineColor = circleColor.active;
        const newCtx = this.buildSector(app);
        sectorContainer.addChild(newCtx);

        const pointContainer = app.stage.getChildAt(1);
        const pointGrap = pointContainer.getChildAt(0) as PIXI.Sprite;
        const picUrls = this.picUrls;
        const texture =  PIXI.Texture.from(picUrls[1]);
        pointGrap.texture = texture;
    }

    protected inactvieCircle = (app: PIXI.Application) => {
        const sectorContainer = app.stage.getChildAt(0);
        const sectorGrap = sectorContainer.getChildAt(0) as PIXI.Graphics;
        sectorContainer.removeChild(sectorGrap);
        const { circleStyle, circleColor} = this.styleConfig;
        circleStyle.lineColor = circleColor.inactive;
        const newCtx = this.buildSector(app);
        sectorContainer.addChild(newCtx);

        const pointContainer = app.stage.getChildAt(1);
        const pointGrap = pointContainer.getChildAt(0) as PIXI.Sprite;
        const picUrls = this.picUrls;
        const texture =  PIXI.Texture.from(picUrls[0]);
        pointGrap.texture = texture;
    }



}