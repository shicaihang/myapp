
const stageBackGroundColor = 0x2d3237;

const defaultLineColor = 0x000000;

const activeLineColor = 0xD3D3D3;

const circleColor = {
    active: activeLineColor,
    inactive: defaultLineColor,
}

const contentPolylineCom = {
    widthA: 90,
    heightA: 60,
    widthB: 60,
    heightB: 30,
}

const contentPolyline = [
    { x: 0, y: -contentPolylineCom.heightA + contentPolylineCom.heightB * 0.5 },
    { x: contentPolylineCom.widthA * 0.5, y: (contentPolylineCom.widthA - contentPolylineCom.widthB) / contentPolylineCom.widthA * (contentPolylineCom.heightA - contentPolylineCom.heightB * 0.5) - contentPolylineCom.heightB * 0.5 },
    { x: contentPolylineCom.widthB * 0.5, y: -contentPolylineCom.heightB * 0.5 },
    { x: contentPolylineCom.widthB * 0.5, y: contentPolylineCom.heightB * 0.5 },
    { x: -contentPolylineCom.widthB * 0.5, y: contentPolylineCom.heightB * 0.5 },
    { x: -contentPolylineCom.widthB * 0.5, y: -contentPolylineCom.heightB * 0.5 },
    { x: -contentPolylineCom.widthA * 0.5, y: 0 },
    { x: 0, y: -contentPolylineCom.heightA + contentPolylineCom.heightB * 0.5 },
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
    radius: 200,
    lineColor: defaultLineColor,
    fillColor: stageBackGroundColor,
    startAngle: Math.PI,
    endAngle: -Math.PI / 2,

}

const defaultStyleCfg = {
    contentStyle: contentStyle,
    circleStyle: circleStyle,
    imgStyle: imgStyle,
    circleColor: circleColor,
}

export { defaultStyleCfg };
