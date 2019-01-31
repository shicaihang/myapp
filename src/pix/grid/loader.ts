import { Loader, Resources } from '../type';
import bunny from 'src/res/bunny.png';
import startLoop from './loop';
import SpriteElement from './sprite';
import { Point } from 'pixi.js';

const addLoader = (app: any, container: any) => {
    // const texture = Utils.TextureCache[bunny];

    // const sprite = new Sprite(texture);

    const setup = () => {
        const SESetting = {
            width: 1,
            height: 1,
            position: new Point(),
            rotation: 0,
            url: bunny,
            texture: Resources[bunny].texture,
        }

        const sprite = new SpriteElement(SESetting);  // 精灵对象

        // 原点 pivot 和 anchor类似，只是参数不一样
        // sprite.pivot.set(x, y);
        // sprite.rotation = 0.5;
        startLoop(app, sprite, container);



        // const rectangle = new PIXI.Graphics();
        // rectangle.drawRect(x, y, 50, 50);
        // rectangle.beginFill(0x66CCFF);

        container.addChild(sprite);
        // container.addChild(rectangle);
        app.stage.addChild(container);
        console.log("all files loaded!");
    };

    const loadProgressHandler = (loader: any, resource: any) => {
        // Display the file `url` currently being loaded
        console.log("loading: " + resource.url);
        // Display the percentage of files currently loaded
        console.log("progress: " + loader.progress + "%");
    };

    // add(name, url, optionObject, callbackFunction)
    const complete = () => { console.log('add setting complete!') };

    const setting = {
        url: bunny,
        onComplete: complete
    }
    if (!Resources[setting.url]) {
        Loader.add(setting);
    }
    Loader.load(setup).on("progress", loadProgressHandler);
}

export default addLoader;


