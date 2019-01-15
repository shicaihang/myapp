import * as PIXI from 'pixi.js';
import logo from 'src/res/bunny.png';

const testPIXI = () => {

    const setting = {
        width: 800,
        height: 600,
        backgroundColor: 0x1099bb
    };
    const app = new PIXI.Application(setting);

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    const pixi: HTMLElement = document.getElementById('pixi') as HTMLElement;
    pixi.appendChild(app.view);

    const basicText = new PIXI.Text('Basic text in pixi');
    basicText.x = app.renderer.width / 2;
    basicText.y = app.renderer.height / 2 + 150;
    basicText.anchor.set(0.5);
    basicText.anchor.x = 0.5;
    basicText.anchor.y = 0.5;
    //     bunny.anchor.y = 0.5;
    app.stage.addChild(basicText);

    // load the texture we need
    // This creates a texture from a 'bunny.png' image

    // const setup = () => {
    //     const bunny =  new PIXI.Sprite(PIXI.loader.resources("image.png").texture);
    //     debugger

    //     // center the sprite's anchor point
    //     bunny.anchor.set(0.5);

    //     // Setup the position of the bunny
    //     bunny.x = app.renderer.width / 2;
    //     bunny.y = app.renderer.height / 2;

    //     // Rotate around the center
    //     bunny.anchor.x = 0.5;
    //     bunny.anchor.y = 0.5;

    //     // Add the bunny to the scene we are building
    //     app.stage.addChild(bunny);

    //     // Listen for frame updates
    //     app.ticker.add((delta) => {
    //         // each frame we spin the bunny around a bit
    //         bunny.rotation += 0.1 * delta;
    //     });
    // }   
    // PIXI.loader.add('bunny.png').load(setup);


    const container = new PIXI.Container();

    app.stage.addChild(container);

    const texture = PIXI.Texture.fromImage(logo);

    const arrayBunny:PIXI.Sprite[] = [];

    const gridNumber = 5;

    // Create a 5x5 grid of bunnies
    for (let i = 0; i < gridNumber * gridNumber; i++) {
        const bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(0.5);
        bunny.x = (i % 5) * 40;
        bunny.y = Math.floor(i / 5) * 40;
        container.addChild(bunny);
        arrayBunny.push(bunny);
    }
    app.ticker.add((delta) => {
        container.rotation += 0.01 * delta;
    });

    // Center on the screen
    container.x = (app.screen.width - container.width) / 2;
    container.y = (app.screen.height - container.height) / 2;

    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;

    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    const middleBunny = arrayBunny[Math.floor((gridNumber * gridNumber) / 2)]
    // Opt-in to interactivity
    middleBunny.interactive = true;

    // Shows hand cursor
    middleBunny.buttonMode = true;

    // Pointers normalize touch and mouse
    middleBunny.on('pointerdown', () => {
        middleBunny.scale.x *= 1.25;
        middleBunny.scale.y *= 1.25;
    });




};

export default testPIXI;

