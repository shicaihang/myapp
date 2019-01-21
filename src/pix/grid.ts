import { Point, Container } from 'pixi.js';
import SpriteElement from './sprite';

interface IGrid {
    width: number;
    height: number;
    gridSizeX: number;
    gridSizeY: number;
    origin: Point;
}

const DEFAULT_2D_GRID_COLOR = 0x999599;
const DEFAULT_2D_GRID_BACKGROUD_COLOR = 0xF0F2F5;

export default class Grid {
    public container: any;
    protected prop: IGrid;
    protected gridChidren: Map<string, PIXI.Graphics> = new Map();
    constructor(prop: IGrid) {
        this.prop = prop;
    }
    public init() {
        this.draw();
        this.container = this.container || new Container();
        const map: any = this.gridChidren;
        const keys = ['axis_b', 'axis_x', 'axis_y', 'axis_g'];
        keys.forEach(key => this.container.addChild(map.get(key)));
    }

    public axisXLine = () => {
        const { width, origin } = this.prop;
        const map: any = this.gridChidren;
        if (!map.get('axis_x')) {
            map.set('axis_x', new PIXI.Graphics())
        }
        const axisXLine = map.get('axis_x');
        axisXLine.clear();
        axisXLine.lineStyle(3, DEFAULT_2D_GRID_COLOR, 1);
        axisXLine.moveTo(origin.x - width / 2, origin.y);
        axisXLine.lineTo(origin.x + width / 2, origin.y);
    }

    public axisYLine = () => {
        const { height, origin } = this.prop;
        const map: any = this.gridChidren;
        if (!map.get('axis_y')) {
            map.set('axis_y', new PIXI.Graphics())
        }
        const axisYine = map.get('axis_y');
        axisYine.clear();
        axisYine.lineStyle(3, DEFAULT_2D_GRID_COLOR, 1);
        axisYine.moveTo(origin.x, origin.y - height / 2);
        axisYine.lineTo(origin.x, origin.y + height / 2);
    }

    public gridLine = () => {
        const { width, height, origin, gridSizeX, gridSizeY } = this.prop;
        const rows = gridSizeX;
        const cols = gridSizeY;
        const boxSizeW = width / 2 / cols;
        const boxSizeH = height / 2 / rows;
        const map: any = this.gridChidren;
        if (!map.get('axis_g')) {
            map.set('axis_g', new PIXI.Graphics())
        }
        const gridLine = map.get('axis_g');
        gridLine.clear();
        gridLine.lineStyle(1, DEFAULT_2D_GRID_COLOR, 1);

        for (let i = -rows; i <= rows; i++) {
            const gap = i * boxSizeW;
            gridLine.moveTo(origin.x - width / 2, origin.y + gap);
            gridLine.lineTo(origin.x + width / 2, origin.y + gap);
        }
        for (let i = -cols; i <= cols; i++) {
            const gap = i * boxSizeH;
            gridLine.moveTo(origin.x + gap, origin.y - height / 2);
            gridLine.lineTo(origin.x + gap, origin.y + height / 2);
        }
    }
    public borderLine() {
        const { width, height, origin } = this.prop;
        const map: any = this.gridChidren;
        if (!map.get('axis_b')) {
            map.set('axis_b', new PIXI.Graphics())
        }
        const borderLine = map.get('axis_b');
        borderLine.clear();
        borderLine.beginFill(DEFAULT_2D_GRID_BACKGROUD_COLOR);
        borderLine.drawRect(origin.x - width / 2, origin.y - height / 2, width, height);
    }

    public draw = () => {
        this.borderLine();
        this.axisXLine();
        this.axisYLine();
        this.gridLine();
    }

    public resize = (event: any) => {
        const Zoom = { in: 1.1, out: 0.9 };
        const Scale = (event.deltaY > 0 ? Zoom.in : Zoom.out);
        this.prop.width *= Scale;
        this.prop.height *= Scale;
        this.draw();
        this.container.children.forEach((element:PIXI.Graphics) => {
            if (element instanceof SpriteElement){
                element.prop.width *= Scale;
                element.prop.height *= Scale;
                element.dirty();
            }
        });
    }
}