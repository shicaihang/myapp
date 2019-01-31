const getRadian = (angle: number) => {
    return angle * Math.PI / 180;
};

const getAngle = (radian: number) => {
    return radian * 180 / Math.PI;
};

const toDegrees = (angleRadians: number): number => {
    return angleRadians * 180 / Math.PI;
}

interface PointLike {
    x:number;
    y:number;
}

const getAngleHorizontaleCCW = (from: PointLike, to: PointLike): number => {
    return toDegrees(Math.atan2(to.y - from.y, to.x - from.x));
}

const lineLineAngleCCW = (p1: PointLike, p2: PointLike, p3: PointLike, p4: PointLike) => {
    const angle1 = getAngleHorizontaleCCW(p1, p2);
    const angle2 = getAngleHorizontaleCCW(p3, p4);
    return angle1 - angle2;
}



export { getRadian, getAngle, lineLineAngleCCW};