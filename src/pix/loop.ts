
import { setting } from './config';
import Keyboard from './keyboard';

// let state: any;

// const gameLoop = (delta: any, sprite: any, container:any) => {
//     // Set the game state
//     state = play;
//     // Update the current game state:
//     state(delta, sprite, container);
// }

const Width = setting.width - setting.margin*2;
const Height = setting.height - setting.margin*2;



const isOutSide = (sprite: any, container: any) => {
    const gapW = (Width - sprite.width) / 2;
    console.log(gapW + ',' + sprite.x);
    if (gapW < Math.abs(sprite.x)) {
        sprite.vx = 0;
        sprite.x = sprite.x < 0 ? -gapW : gapW;
    } 
}
// const nearlyEquals = (a: number, b: number, optTolerance: number): boolean => {
//     return Math.abs(a - b) <= (optTolerance || 0.000001);
// }
const V = {
    left: -5,
    right: 5,
    up: -5,
    down: 5,
};

const play = (delta: any, sprite: any, container: any) => {
    // Use the sprite's velocity to make it move
    sprite.x += sprite.vx;
    sprite.y += sprite.vy;
    const gapW = (Width - sprite.width) / 2;
    const gapH = (Height - sprite.height) / 2;
    console.log(gapW + ',' + sprite.x);
    if (gapW < Math.abs(sprite.x)) {
        sprite.vx = 0;
        sprite.x = sprite.x < 0 ? -gapW : gapW;
    } 
    if (gapH < Math.abs(sprite.y)) {
        sprite.vy = 0;
        sprite.y = sprite.y < 0 ? -gapH : gapH;
    } 
}

const startLoop = (app: any, sprite: any, container: any) => {

    // Create the `sprite` sprite
    sprite.vx = 0;
    sprite.vy = 0;
    // Capture the Keyboard arrow keys
    const left = Keyboard(37);
    const up = Keyboard(38);
    const right = Keyboard(39);
    const down = Keyboard(40);

    // Left arrow key `press` method
    left.press = () => {
        // Change the sprite's velocity when the key is pressed
        sprite.vx = V.left;
        sprite.vy = 0;
        isOutSide(sprite, container);
    };

    // Left arrow key `release` method
    left.release = () => {
        // If the left arrow has been released, and the right arrow isn't down,
        // and the sprite isn't moving vertically:
        // Stop the sprite
        if (!right.isDown && sprite.vy === 0) {
            sprite.vx = 0;
        }
    };

    // Up
    up.press = () => {
        sprite.vx = 0;
        sprite.vy = V.up;
    };
    up.release = () => {
        if (!down.isDown && sprite.vx === 0) {
            sprite.vy = 0;
        }
    };

    // Right
    right.press = () => {
        sprite.vx = V.right;
        sprite.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && sprite.vy === 0) {
            sprite.vx = 0;
        }
    };

    // Down
    down.press = () => {
        sprite.vy = V.down;
        sprite.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && sprite.vx === 0) {
            sprite.vy = 0;
        }
    };
    // Start the game loop
    app.ticker.add((delta: any) => play(delta, sprite, container));
}

export default startLoop;