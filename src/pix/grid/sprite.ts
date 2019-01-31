import { Point, Texture } from 'pixi.js';
import { Sprite } from '../type';
import { setting } from '../config';
import { PIXIEVENT } from '../base/event/event';

interface ISPrite {
    width: number;
    height: number;
    position: Point;
    rotation: number;
    texture: Texture;
}
enum selectStatus {
    select = 'select',
    unselect = 'unselect'
}

const Width = setting.width - setting.margin * 2;
const Height = setting.height - setting.margin * 2;

export default class SpriteElement extends Sprite {
    public prop: ISPrite;
    public selectStatus: string = selectStatus.unselect;
    protected zIndex: number = 0;
    constructor(prop: ISPrite) {
        super(prop.texture);
        this.prop = prop;
        this.setPosition();
        this.setSize();
        this.interactive = true;
        // Shows hand cursor
        this.buttonMode = true;
        this.bindAction();
    }

    public setPosition = () => {
        const { x, y } = this.PointDataModelToPIXI(this.prop.position);
        this.position.set(x, y);
        // 锚点anchor 0-1,0.5表示center，默认是 topleft
        const xAnchor = 0.5;
        const yAnchor = 0.5;
        this.anchor.set(xAnchor, yAnchor);
    }
    public setSize = () => {
        const { width, height } = this.prop;
        const { x, y } = this.PointDataModelToPIXI(new Point(width, height));
        this.width = x;
        this.height = y;
    }
    public dirty = (prop?: ISPrite) => {
        this.prop = this.prop || prop;
        this.setPosition();
        this.setSize();
    }

    // public rotate = () => {

    // }

    // public delete = () => {

    // }

    // public display() {

    // }
    // public move() {

    // }

    // public select() {

    // }
    // public unselect() {

    // }

    protected bindAction = () => {
        this.on(PIXIEVENT.MOUSEDOWN, (e: any) => {
            this.onDragStartHandler(e, this);
        }).on(PIXIEVENT.MOUSEUP, (e: any) => {
            this.onDragEndHandler(e, this);
        }).on(PIXIEVENT.MOUSEUPOUTSIDE, (e: any) => {
            this.onDragEndHandler(e, this);
        }).on(PIXIEVENT.MOUSEMOVE, (e: any) => {
            this.onDragMoveHandler(e, this);
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
        const data = rest[2];

        if (ctx && ctx.dragging) {
            const curMousePosition = ctx.data.getLocalPosition(ctx.parent); // 获取鼠标移动的位置
            ctx.position.set(curMousePosition.x, curMousePosition.y);
            if (data && data.callBack) {
                data.callBack(this);
                console.log('asdad')
            }
        }

    }
    protected PointDataModelToPIXI(point: Point) {
        const factorX = Width * 0.5 / setting.gridSizeX;
        const factorY = Height * 0.5 / setting.gridSizeY;
        const x = point.x / setting.boxSize * factorX;
        const y = point.y / setting.boxSize * factorY;
        return { x, y };
    }
}