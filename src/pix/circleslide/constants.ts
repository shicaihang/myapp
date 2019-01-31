const stageBackGroundColor = 0x2d3237;

const defaultLineColor = 0x000000;

const activeLineColor = 0xD3D3D3;

const circleColor = {
    active: activeLineColor,
    inactive: defaultLineColor,
}

const contentPolylineCom = {
    width: 100,
    height: 100,
    offset: 40,
}

const contentPolyline = [
    { x: contentPolylineCom.width, y: contentPolylineCom.height },
    { x: contentPolylineCom.width, y: 0 },
    { x: contentPolylineCom.offset, y: 0 },
    { x: contentPolylineCom.offset, y: contentPolylineCom.offset },
    { x: 0, y: contentPolylineCom.offset },
    { x: 0, y: contentPolylineCom.height },
    { x: contentPolylineCom.width, y: contentPolylineCom.height },
];

const contentStyle = {
    polylineCom: contentPolylineCom,
    polyline: contentPolyline,
    lineWidth: 3,
    lineAlpha: 1,
    lineColor: activeLineColor,
    fillColor: stageBackGroundColor,
}


const imgStyle = {
    width: 25,
    height: 25,
}


const circleStyle = {
    lineWidth: 2,
    lineAlpha: 1,
    radius: 100,
    lineColor: defaultLineColor,
    fillColor: stageBackGroundColor,
}

const defaultStyleCfg = {
    contentStyle: contentStyle,
    circleStyle: circleStyle,
    imgStyle: imgStyle,
    circleColor: circleColor,
}

export { defaultStyleCfg };
