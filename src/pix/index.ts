import { Application } from './type';
import { setting } from './config';
import addLoader from './grid/loader';
import Grid from './grid/grid';
import { Point } from 'pixi.js';



export default class MyPIXI {
    public app: any;
    public grid: Grid;
    public start = () => {
        // can then insert into the DOM
        debugger
        this.app = new Application(setting);
        const app = this.app;
        const pixiEle: HTMLElement = document.getElementById('pixi') as HTMLElement;
        if (pixiEle.firstChild) {
            pixiEle.removeChild(pixiEle.firstChild);
        }
        pixiEle.appendChild(app.view);
        const origin = new Point(0, 0);
        const width = app.renderer.width - 2 * setting.margin;
        const height = app.renderer.height - 2 * setting.margin;

        this.grid = new Grid({ width, height, gridSizeX: setting.gridSizeX, gridSizeY: setting.gridSizeY, origin });
        this.grid.init();
        // addText(app);
        const container = this.grid.container;
        // console.log(app.renderer.width);
        // console.log(app.renderer.height);

        // console.log(container.width);
        // console.log(container.height);
        addLoader(app, container);
        this.app.resize = this.grid.resize;
        app.stage.addChild(container);
        container.position.set(app.renderer.width / 2, app.renderer.height / 2);
    }

    public destroy = () => {
        const pixiEle: HTMLElement = document.getElementById('pixi') as HTMLElement;
        pixiEle.removeChild(this.app.view);
        this.app = null;
    }
}

