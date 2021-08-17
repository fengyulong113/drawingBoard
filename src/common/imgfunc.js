/**
 * 判断rgba是否有值
 * @param {e} e 当前鼠标事件
 * @returns {String} rbga的值
 */
function pick(e, ctx) {
    var x = e.layerX;
    var y = e.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    return rgba;
}
/**
 * 判断落点坐标函数
 * @param {Array} point 需要判断的点
 * @param {Array} rect 四个顶点
 * @returns {Boolean}
 */
function isPointInRect(point, rect) {
    const [touchX, touchY] = point
    //图形的四个顶点
    const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = rect
    //四个向量
    const v1 = [x1 - touchX, y1 - touchY]
    const v2 = [x2 - touchX, y2 - touchY]
    const v3 = [x3 - touchX, y3 - touchY]
    const v4 = [x4 - touchX, y4 - touchY]
    if (
        (v1[0] * v2[1] - v2[0] * v1[1]) > 0
        && (v2[0] * v4[1] - v4[0] * v2[1]) > 0
        && (v4[0] * v3[1] - v3[0] * v4[1]) > 0
        && (v3[0] * v1[1] - v1[0] * v3[1]) > 0
    ) {
        return true
    }
    return false
}

/**
 * 绘制矩形函数
 * @param {Number} startX 矩形顶点X坐标
 * @param {Numebr} startY 矩形顶点Y坐标
 * @param {Number} rectWidth 矩形宽度
 * @param {Number} rectHeight 矩形高度
 * @param {String} bgc 矩形背景颜色
 * @param {ctx} ctx 
 * @returns path
 */
function drawRect(startX, startY, rectWidth, rectHeight, bgc, ctx) {
    const path = new Path2D()
    path.rect(startX, startY, rectWidth, rectHeight)
    ctx.fillStyle = bgc
    // ctx.fill(path)
    return path
}
/**
 * 绘制控制器函数
 * @param {ctx} ctx 
 * @param {Number} controlWidth 控制器宽度
 * @param {Number} controlHeight 控制器高度
 * @param {String} controlColor 控制器背景颜色
 * @param {Number} imgPositionX 图片元起始X轴坐标
 * @param {Number} imgPositionY 图片元起始Y轴坐标
 * @param {Number} imgWidth 图片元宽度
 * @param {Number} imgHeight 图片元高度
 * @returns {Array } 控制器
 */
function drawControl(ctx, controlWidth, controlHeight, controlColor, imgPositionX, imgPositionY, imgWidth, imgHeight) {
    let res = []
    let control1 = drawRect(imgPositionX - controlWidth, imgPositionY - controlHeight, controlWidth, controlHeight, controlColor, ctx)
    let control2 = drawRect(imgPositionX - controlWidth, imgPositionY + imgHeight / 2 - controlHeight / 2, controlWidth, controlHeight, controlColor, ctx)
    let control3 = drawRect(imgPositionX - controlWidth, imgPositionY + imgHeight, controlWidth, controlHeight, controlColor, ctx)
    let control4 = drawRect(imgPositionX + imgWidth / 2 - controlWidth / 2, imgPositionY - controlHeight, controlWidth, controlHeight, controlColor, ctx)
    let control5 = drawRect(imgPositionX + imgWidth / 2 - controlWidth / 2, imgPositionY + imgHeight, controlWidth, controlHeight, controlColor, ctx)
    let control6 = drawRect(imgPositionX + imgWidth, imgPositionY - controlHeight, controlWidth, controlHeight, controlColor, ctx)
    let control7 = drawRect(imgPositionX + imgWidth, imgPositionY + imgHeight / 2 - controlHeight / 2, controlWidth, controlHeight, controlColor, ctx)
    let control8 = drawRect(imgPositionX + imgWidth, imgPositionY + imgHeight, controlWidth, controlHeight, controlColor, ctx)
    let control9 = drawRect(imgPositionX + imgWidth / 2 - controlWidth / 2, imgPositionY - controlHeight - 50, controlWidth, controlHeight, controlColor, ctx)
    let control10 = drawRect(imgPositionX + imgWidth + 50, imgPositionY + imgHeight / 2 - controlHeight / 2, controlWidth, controlHeight, controlColor, ctx)
    res.push(control1, control2, control3, control4, control5, control6, control7, control8, control9, control10)
    return res
}
/**
 * 获取坐标函数
 * @param {Number} left 矩形顶点距离左边的距离
 * @param {Number} top 矩形顶点距离上边的距离
 * @param {Number} width 矩形的宽度
 * @param {Number} height 矩形的高度
 * @returns {Array} 矩形的四个顶点坐标
 */
function getCoord(left, top, width, height) {
    const x1 = left
    const y1 = top
    const x2 = left + width
    const y2 = top
    const x3 = left
    const y3 = top + height
    const x4 = left + width
    const y4 = top + height
    const res = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]]
    return res
}
/**
 * 获取旋转之后的坐标
 * @param {Array} startPoint 起始坐标
 * @param {Array} centerPoint 旋转中心点坐标
 * @param {Number} angle 旋转角度
 * @returns {Array} 旋转后的坐标
 */
function getEndPointByRotate(startPoint, centerPoint, angle) {
    const [centerX, centerY] = centerPoint;
    const [x1, y1] = [startPoint[0] - centerX, startPoint[1] - centerY];
    const x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle);
    const y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle);
    return [x2 + centerX, y2 + centerY];
}
/**
 * 绘制图片及控制器
 * @param {ctx} ctx 
 * @param {img} img 
 * @param {Number} imgPositionX 图形起始点x
 * @param {Number} imgPositionY 图形起始点y
 * @param {Number} imgWidth 图形宽度
 * @param {Number} imgHeight 图形高度
 * @param {Number} controlWidth 控制器宽度
 * @param {Number} controlHeight 控制器高度
 * @param {String} controlColor 控制器背景颜色
 */
function drawImg(ctx, img, imgPositionX, imgPositionY, imgWidth, imgHeight, controlWidth, controlHeight, controlColor) {
    ctx.beginPath()
    ctx.rect(imgPositionX, imgPositionY, imgWidth, imgHeight)
    ctx.lineWidth = 2
    ctx.strokeStyle = '#8bd9f4'
    ctx.stroke()
    //绘制控制器
    let control = drawControl(ctx, controlWidth, controlHeight, controlColor, imgPositionX, imgPositionY, imgWidth, imgHeight)
    for (let i = 0; i < control.length; i++) {
        ctx.fill(control[i])
    }
    ctx.moveTo(imgPositionX + imgWidth / 2, imgPositionY - controlHeight)
    ctx.lineTo(imgPositionX + imgWidth / 2, imgPositionY - 50)
    ctx.stroke()
    ctx.moveTo(imgPositionX + imgWidth + controlWidth, imgPositionY + imgHeight / 2)
    ctx.lineTo(imgPositionX + imgWidth + 50, imgPositionY + imgHeight / 2)
    ctx.stroke()
    ctx.drawImage(img, imgPositionX, imgPositionY, imgWidth, imgHeight)
    ctx.restore()
}
/**
 * 图形旋转
 * @param {ctx} ctx 
 * @param {Number} angle 旋转角度
 * @param {Number} imgPositionX 图形起始点X
 * @param {Number} imgPositionY 图形起始点Y
 * @param {Number} imgWidth 图形宽度
 * @param {Number} imgHeight 图形高度
 */
function rotatefunc(ctx, angle, imgPositionX, imgPositionY, imgWidth, imgHeight) {
    ctx.translate(imgPositionX + imgWidth / 2, imgPositionY + imgHeight / 2)
    ctx.rotate(angle * Math.PI / 180)
    ctx.translate(-(imgPositionX + imgWidth / 2), -(imgPositionY + imgHeight / 2))
}
/**
 * 获取每个控制器的坐标数组
 * @param {Number} imgPositionX 图形起始点X
 * @param {Number} imgPositionY 图形起始点Y
 * @param {Number} imgWidth 图形宽度
 * @param {Number} imgHeight 图形高度
 * @param {Number} controlWidth 控制器宽度
 * @param {Number} controlHeight 控制器高度
 * @returns {Array}
 */
function everyfourcoor(imgPositionX, imgPositionY, imgWidth, imgHeight, controlWidth, controlHeight) {
    let res = []
    let con1 = getCoord(imgPositionX - controlWidth, imgPositionY - controlHeight, controlWidth, controlHeight)
    let con2 = getCoord(imgPositionX - controlWidth, imgPositionY + imgHeight / 2 - controlHeight / 2, controlWidth, controlHeight)
    let con3 = getCoord(imgPositionX - controlWidth, imgPositionY + imgHeight, controlWidth, controlHeight)
    let con4 = getCoord(imgPositionX + imgWidth / 2 - controlWidth / 2, imgPositionY - controlHeight, controlWidth, controlHeight)
    let con5 = getCoord(imgPositionX + imgWidth / 2 - controlWidth / 2, imgPositionY + imgHeight, controlWidth, controlHeight)
    let con6 = getCoord(imgPositionX + imgWidth, imgPositionY - controlHeight, controlWidth, controlHeight)
    let con7 = getCoord(imgPositionX + imgWidth, imgPositionY + imgHeight / 2 - controlHeight / 2, controlWidth, controlHeight)
    let con8 = getCoord(imgPositionX + imgWidth, imgPositionY + imgHeight, controlWidth, controlHeight)
    let con9 = getCoord(imgPositionX + imgWidth / 2 - controlWidth / 2, imgPositionY - controlHeight - 50, controlWidth, controlHeight)
    let con10 = getCoord(imgPositionX + imgWidth + 50, imgPositionY + imgHeight / 2 - controlHeight / 2, controlWidth, controlHeight)
    return res = [con1, con2, con3, con4, con5, con6, con7, con8, con9, con10]
}
export {
    getEndPointByRotate,
    getCoord, drawRect,
    isPointInRect,
    pick,
    drawControl,
    drawImg,
    rotatefunc,
    everyfourcoor
}