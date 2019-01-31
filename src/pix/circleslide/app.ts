
import { initData } from '../config';

/**
 *  create PIXI application
 */
interface StageStyleInterface {
    backgroundColor?: number;
    antialias?: boolean;
}

const myStageStyle = {
    backgroundColor: 0x2d3237,
    antialias: true // 抗锯齿
}

function getSlidePIXIApplication(width: number = initData.width,
                                  height: number = initData.height,
                                  stageStyle: StageStyleInterface = myStageStyle): PIXI.Application {
    const app = new PIXI.Application(width, height, { backgroundColor: stageStyle.backgroundColor, antialias: stageStyle.antialias });
    return app;
}

export {
    getSlidePIXIApplication
};