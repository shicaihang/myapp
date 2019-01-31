export const setting = {
    width: 400, // px
    height: 400, // px
    margin: 20, // px
    backgroundColor: 0xFFFAF0,
    boxSize: 0.5, // m
    gridSizeX: 10, // number
    gridSizeY: 10
};

const initData = {
    data: {
        topVal: 2.8,
        botVal: 0,
        cameraVal: 1.4,
        fov: 90,
        angle: 0
    },
    width: 310,
    height: 264,
    dom: null,
    styleConfig: {
        stage: {
            backgroundColor: 0x1b1d20,
            antialias: true // 抗锯齿
        },
        layout: {
            lineTop: 10,
            lineRight: 18
        },
        text: {
            topRight: 40,
            botLeft: 40,
            midLeft: 80,
            topBotColor: 0x5c5f63,
            midColor: 0xFFFFFF
        }
    }
};

export {
    initData
};