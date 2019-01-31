import * as PIXI from 'pixi.js';

interface SpriteImgInfoInterface {
    url: string;
    name?: string;
}

const buildNormalSprite = (imgInfo: SpriteImgInfoInterface, callback: (sprite: PIXI.Sprite) => void) => {
    const { url } = imgInfo;
    const setup = () => {
        const pixie = new PIXI.Sprite(
            PIXI.loader.resources[url].texture
        );
        callback(pixie);
    };

    PIXI.loader
        .add(imgInfo)
        .load(setup);
};

export {
    buildNormalSprite,
    SpriteImgInfoInterface
};