import { Point, Texture } from 'pixi.js';
import { Sprite } from './type';
import { setting } from './config';

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
    public PointDataModelToPIXI(point: Point) {
        const factorX = Width * 0.5 / setting.gridSizeX;
        const factorY = Height * 0.5 / setting.gridSizeY;
        const x = point.x / setting.boxSize * factorX ;
        const y = point.y / setting.boxSize * factorY ;
        return { x, y };
    }
}