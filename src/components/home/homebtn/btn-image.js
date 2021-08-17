import React, { useRef, useState, useEffect } from 'react'
import {
    getEndPointByRotate,
    isPointInRect,
    pick,
    drawImg,
    rotatefunc,
    everyfourcoor
} from '../../../common/imgfunc'
const BtnImage = (props) => {
    const {
        canvasDom,
        colorChooseRef,
        colorShowRef,
        state
    } = props
    const imgRef = useRef()
    const rangeImgRef = useRef()
    const [left, setLeft] = useState(100);
    const [top, setTop] = useState(100);
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [angleVal, setAngleVal] = useState(0);
    useEffect(() => {
        addImage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        state.layerValue,
    ]);

    //添加图片函数
    const addImage = () => {
        if (!canvasDom || !canvasDom.getContext('2d')) {
            return;
        }
        const ctx = canvasDom.getContext('2d')
        const img = new Image()
        img.crossOrigin = "Anonymous"
        // const initImageData = ctx.getImageData(0, 0, canvasDom.width, canvasDom.height)
        //初始化图片数据
        let imgPositionX = left
        let imgPositionY = top
        let imgWidth = width
        let imgHeight = height
        let angle = angleVal
        img.onload = function () {
            ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
            ctx.save()
            ctx.translate(imgPositionX + imgWidth / 2, imgPositionY + imgHeight / 2)
            ctx.rotate(angle * Math.PI / 180)
            ctx.translate(-(imgPositionX + imgWidth / 2), -(imgPositionY + imgHeight / 2))
            ctx.beginPath()
            //包裹路径
            ctx.rect(imgPositionX, imgPositionY, imgWidth, imgHeight)
            // ctx.strokeStyle = 'red'
            // ctx.stroke()
            //添加图片
            ctx.drawImage(img, imgPositionX, imgPositionY, imgWidth, imgHeight)
            ctx.globalCompositeOperation = state.layerValue
            ctx.restore()
        }
        //图片路径
        img.src = imgRef.current.defaultValue
        //图片旋转
        // rangeImgRef.current.oninput = () => {
        //     setAngle(rangeImgRef.current.value)
        // }
        //吸色
        colorChooseRef.current.onclick = () => {
            function pick(e, destination) {
                var x = e.layerX;
                var y = e.layerY;
                var pixel = ctx.getImageData(x, y, 1, 1);
                var data = pixel.data;
                const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
                destination.style.background = rgba;
                return rgba;
            }
            canvasDom.onmousemove = (e) => {
                pick(e, colorShowRef.current)
            }
        }
        //鼠标落点标识
        let isIn = false
        //像素标识
        let pickflag = null
        //左上角控制器标识
        let isnw = false
        //右上角控制器标识
        let isne = false
        //左下角控制器标识
        let issw = false
        //右下角控制器标识
        let isse = false
        //旋转控制点标识
        let isRot = false
        canvasDom.onmousedown = (e) => {
            //判断鼠标是否在图片内
            isIn = ctx.isPointInPath(e.offsetX, e.offsetY)
            // 判断是否有像素
            pickflag = pick(e, ctx)
            if (canvasDom.style.cursor === 'nw-resize') {
                isnw = true
            }
            else if (canvasDom.style.cursor === 'ne-resize') {
                isne = true
            }
            else if (canvasDom.style.cursor === 'sw-resize') {
                issw = true
            }
            else if (canvasDom.style.cursor === 'se-resize') {
                isse = true
            } else if (canvasDom.style.cursor === 'crosshair') {
                isRot = true
            }
        }
        //控制器的大小
        let controlWidth = 12
        let controlHeight = 12
        let controlColor = '#8bd9f4'

        canvasDom.onmousemove = (e) => {
            //获取每一个控制器的四个顶点坐标
            let everycons = []
            everycons = everyfourcoor(imgPositionX, imgPositionY, imgWidth, imgHeight, controlWidth, controlHeight)
            //每个控制器的判断标识
            let consflag = []
            for (let i = 0; i < everycons.length; i++) {
                consflag[i] = isPointInRect([e.offsetX, e.offsetY], everycons[i])
            }
            //获取每一个控制器旋转之后的坐标
            let resendcons = []     //每个控制器的坐标和数组
            for (let i = 0; i < everycons.length; i++) {
                let rescons = []    //每个控制器旋转后的四个顶点坐标
                for (var j = 0; j < everycons[i].length; j++) {
                    rescons.push(getEndPointByRotate(everycons[i][j], [imgPositionX + imgWidth / 2, imgPositionY + imgHeight / 2], angle * Math.PI / 180))
                }
                resendcons[i] = rescons
            }
            //每个控制器旋转后的标识
            let consendflag = []
            for (let m = 0; m < resendcons.length; m++) {
                consendflag[m] = isPointInRect([e.offsetX, e.offsetY], resendcons[m])
            }
            //添加控制器的鼠标样式
            if (consflag[0] || consendflag[0]) {

                if (angle >= 0 && angle < 30) {
                    canvasDom.style.cursor = 'nw-resize'
                } else if (angle >= 30 && angle < 60) {
                    canvasDom.style.cursor = 'n-resize'
                } else if (angle >= 60 && angle < 90) {
                    canvasDom.style.cursor = 'ne-resize'
                }
                else if (angle >= 90 && angle < 120) {
                    canvasDom.style.cursor = 'ne-resize'
                } else if (angle >= 120 && angle < 150) {
                    canvasDom.style.cursor = 'e-resize'
                } else if (angle >= 150 && angle < 180) {
                    canvasDom.style.cursor = 'se-resize'
                }
                else if (angle >= 180 && angle < 210) {
                    canvasDom.style.cursor = 'se-resize'
                } else if (angle >= 210 && angle < 240) {
                    canvasDom.style.cursor = 's-resize'
                } else if (angle >= 240 && angle < 270) {
                    canvasDom.style.cursor = 'sw-resize'
                }
                else if (angle >= 270 && angle < 300) {
                    canvasDom.style.cursor = 'sw-resize'
                } else if (angle >= 300 && angle < 330) {
                    canvasDom.style.cursor = 'w-resize'
                } else if (angle >= 300 && angle <= 360) {
                    canvasDom.style.cursor = 'nw-resize'
                }
            } else if (consflag[1] || consendflag[1]) {
                // canvasDom.style.cursor = 'w-resize'
                if (angle >= 0 && angle < 30) {
                    canvasDom.style.cursor = 'w-resize'
                } else if (angle >= 30 && angle < 60) {
                    canvasDom.style.cursor = 'nw-resize'
                } else if (angle >= 60 && angle < 90) {
                    canvasDom.style.cursor = 'n-resize'
                }
                else if (angle >= 90 && angle < 120) {
                    canvasDom.style.cursor = 'n-resize'
                } else if (angle >= 120 && angle < 150) {
                    canvasDom.style.cursor = 'ne-resize'
                } else if (angle >= 150 && angle < 180) {
                    canvasDom.style.cursor = 'e-resize'
                }
                else if (angle >= 180 && angle < 210) {
                    canvasDom.style.cursor = 'e-resize'
                } else if (angle >= 210 && angle < 240) {
                    canvasDom.style.cursor = 'se-resize'
                } else if (angle >= 240 && angle < 270) {
                    canvasDom.style.cursor = 's-resize'
                }
                else if (angle >= 270 && angle < 300) {
                    canvasDom.style.cursor = 's-resize'
                } else if (angle >= 300 && angle < 330) {
                    canvasDom.style.cursor = 'sw-resize'
                } else if (angle >= 300 && angle <= 360) {
                    canvasDom.style.cursor = 'w-resize'
                }
            } else if (consflag[2] || consendflag[2]) {
                // canvasDom.style.cursor = 'sw-resize'
                if (angle >= 0 && angle < 30) {
                    canvasDom.style.cursor = 'sw-resize'
                } else if (angle >= 30 && angle < 60) {
                    canvasDom.style.cursor = 'w-resize'
                } else if (angle >= 60 && angle < 90) {
                    canvasDom.style.cursor = 'nw-resize'
                }
                else if (angle >= 90 && angle < 120) {
                    canvasDom.style.cursor = 'nw-resize'
                } else if (angle >= 120 && angle < 150) {
                    canvasDom.style.cursor = 'n-resize'
                } else if (angle >= 150 && angle < 180) {
                    canvasDom.style.cursor = 'ne-resize'
                }
                else if (angle >= 180 && angle < 210) {
                    canvasDom.style.cursor = 'ne-resize'
                } else if (angle >= 210 && angle < 240) {
                    canvasDom.style.cursor = 'e-resize'
                } else if (angle >= 240 && angle < 270) {
                    canvasDom.style.cursor = 'se-resize'
                }
                else if (angle >= 270 && angle < 300) {
                    canvasDom.style.cursor = 'se-resize'
                } else if (angle >= 300 && angle < 330) {
                    canvasDom.style.cursor = 's-resize'
                } else if (angle >= 300 && angle <= 360) {
                    canvasDom.style.cursor = 'sw-resize'
                }
            } else if (consflag[3] || consendflag[3]) {
                // canvasDom.style.cursor = 'n-resize'
                if (angle >= 0 && angle < 30) {
                    canvasDom.style.cursor = 'n-resize'
                } else if (angle >= 30 && angle < 60) {
                    canvasDom.style.cursor = 'ne-resize'
                } else if (angle >= 60 && angle < 90) {
                    canvasDom.style.cursor = 'e-resize'
                }
                else if (angle >= 90 && angle < 120) {
                    canvasDom.style.cursor = 'e-resize'
                } else if (angle >= 120 && angle < 150) {
                    canvasDom.style.cursor = 'se-resize'
                } else if (angle >= 150 && angle < 180) {
                    canvasDom.style.cursor = 's-resize'
                }
                else if (angle >= 180 && angle < 210) {
                    canvasDom.style.cursor = 's-resize'
                } else if (angle >= 210 && angle < 240) {
                    canvasDom.style.cursor = 'sw-resize'
                } else if (angle >= 240 && angle < 270) {
                    canvasDom.style.cursor = 'w-resize'
                }
                else if (angle >= 270 && angle < 300) {
                    canvasDom.style.cursor = 'w-resize'
                } else if (angle >= 300 && angle < 330) {
                    canvasDom.style.cursor = 'nw-resize'
                } else if (angle >= 300 && angle <= 360) {
                    canvasDom.style.cursor = 'n-resize'
                }
            } else if (consflag[4] || consendflag[4]) {
                // canvasDom.style.cursor = 's-resize'
                if (angle >= 0 && angle < 30) {
                    canvasDom.style.cursor = 's-resize'
                } else if (angle >= 30 && angle < 60) {
                    canvasDom.style.cursor = 'sw-resize'
                } else if (angle >= 60 && angle < 90) {
                    canvasDom.style.cursor = 'w-resize'
                }
                else if (angle >= 90 && angle < 120) {
                    canvasDom.style.cursor = 'w-resize'
                } else if (angle >= 120 && angle < 150) {
                    canvasDom.style.cursor = 'nw-resize'
                } else if (angle >= 150 && angle < 180) {
                    canvasDom.style.cursor = 'n-resize'
                }
                else if (angle >= 180 && angle < 210) {
                    canvasDom.style.cursor = 'n-resize'
                } else if (angle >= 210 && angle < 240) {
                    canvasDom.style.cursor = 'ne-resize'
                } else if (angle >= 240 && angle < 270) {
                    canvasDom.style.cursor = 'e-resize'
                }
                else if (angle >= 270 && angle < 300) {
                    canvasDom.style.cursor = 'e-resize'
                } else if (angle >= 300 && angle < 330) {
                    canvasDom.style.cursor = 'se-resize'
                } else if (angle >= 300 && angle <= 360) {
                    canvasDom.style.cursor = 's-resize'
                }
            } else if (consflag[5] || consendflag[5]) {
                // canvasDom.style.cursor = 'ne-resize'
                if (angle >= 0 && angle < 30) {
                    canvasDom.style.cursor = 'ne-resize'
                } else if (angle >= 30 && angle < 60) {
                    canvasDom.style.cursor = 'e-resize'
                } else if (angle >= 60 && angle < 90) {
                    canvasDom.style.cursor = 'se-resize'
                }
                else if (angle >= 90 && angle < 120) {
                    canvasDom.style.cursor = 'se-resize'
                } else if (angle >= 120 && angle < 150) {
                    canvasDom.style.cursor = 's-resize'
                } else if (angle >= 150 && angle < 180) {
                    canvasDom.style.cursor = 'sw-resize'
                }
                else if (angle >= 180 && angle < 210) {
                    canvasDom.style.cursor = 'sw-resize'
                } else if (angle >= 210 && angle < 240) {
                    canvasDom.style.cursor = 'w-resize'
                } else if (angle >= 240 && angle < 270) {
                    canvasDom.style.cursor = 'nw-resize'
                }
                else if (angle >= 270 && angle < 300) {
                    canvasDom.style.cursor = 'nw-resize'
                } else if (angle >= 300 && angle < 330) {
                    canvasDom.style.cursor = 'n-resize'
                } else if (angle >= 300 && angle <= 360) {
                    canvasDom.style.cursor = 'ne-resize'
                }
            } else if (consflag[6] || consendflag[6]) {
                // canvasDom.style.cursor = 'e-resize'
                if (angle >= 0 && angle < 30) {
                    canvasDom.style.cursor = 'e-resize'
                } else if (angle >= 30 && angle < 60) {
                    canvasDom.style.cursor = 'se-resize'
                } else if (angle >= 60 && angle < 90) {
                    canvasDom.style.cursor = 's-resize'
                }
                else if (angle >= 90 && angle < 120) {
                    canvasDom.style.cursor = 's-resize'
                } else if (angle >= 120 && angle < 150) {
                    canvasDom.style.cursor = 'sw-resize'
                } else if (angle >= 150 && angle < 180) {
                    canvasDom.style.cursor = 'w-resize'
                }
                else if (angle >= 180 && angle < 210) {
                    canvasDom.style.cursor = 'w-resize'
                } else if (angle >= 210 && angle < 240) {
                    canvasDom.style.cursor = 'nw-resize'
                } else if (angle >= 240 && angle < 270) {
                    canvasDom.style.cursor = 'n-resize'
                }
                else if (angle >= 270 && angle < 300) {
                    canvasDom.style.cursor = 'n-resize'
                } else if (angle >= 300 && angle < 330) {
                    canvasDom.style.cursor = 'ne-resize'
                } else if (angle >= 300 && angle <= 360) {
                    canvasDom.style.cursor = 'e-resize'
                }
            } else if (consflag[7] || consendflag[7]) {
                // canvasDom.style.cursor = 'se-resize'
                if (angle >= 0 && angle < 30) {
                    canvasDom.style.cursor = 'se-resize'
                } else if (angle >= 30 && angle < 60) {
                    canvasDom.style.cursor = 's-resize'
                } else if (angle >= 60 && angle < 90) {
                    canvasDom.style.cursor = 'sw-resize'
                }
                else if (angle >= 90 && angle < 120) {
                    canvasDom.style.cursor = 'sw-resize'
                } else if (angle >= 120 && angle < 150) {
                    canvasDom.style.cursor = 'w-resize'
                } else if (angle >= 150 && angle < 180) {
                    canvasDom.style.cursor = 'nw-resize'
                }
                else if (angle >= 180 && angle < 210) {
                    canvasDom.style.cursor = 'nw-resize'
                } else if (angle >= 210 && angle < 240) {
                    canvasDom.style.cursor = 'n-resize'
                } else if (angle >= 240 && angle < 270) {
                    canvasDom.style.cursor = 'ne-resize'
                }
                else if (angle >= 270 && angle < 300) {
                    canvasDom.style.cursor = 'ne-resize'
                } else if (angle >= 300 && angle < 330) {
                    canvasDom.style.cursor = 'e-resize'
                } else if (angle >= 300 && angle <= 360) {
                    canvasDom.style.cursor = 'se-resize'
                }
            } else if (consflag[8] || consendflag[8]) {
                canvasDom.style.cursor = 'crosshair'
            } else if (consflag[9] || consendflag[9]) {
                canvasDom.style.cursor = 'e-resize'
                if (angle >= 0 && angle < 30) {
                    canvasDom.style.cursor = 'e-resize'
                } else if (angle >= 30 && angle < 60) {
                    canvasDom.style.cursor = 'se-resize'
                } else if (angle >= 60 && angle < 90) {
                    canvasDom.style.cursor = 's-resize'
                }
                else if (angle >= 90 && angle < 120) {
                    canvasDom.style.cursor = 's-resize'
                } else if (angle >= 120 && angle < 150) {
                    canvasDom.style.cursor = 'sw-resize'
                } else if (angle >= 150 && angle < 180) {
                    canvasDom.style.cursor = 'w-resize'
                }
                else if (angle >= 180 && angle < 210) {
                    canvasDom.style.cursor = 'w-resize'
                } else if (angle >= 210 && angle < 240) {
                    canvasDom.style.cursor = 'nw-resize'
                } else if (angle >= 240 && angle < 270) {
                    canvasDom.style.cursor = 'n-resize'
                }
                else if (angle >= 270 && angle < 300) {
                    canvasDom.style.cursor = 'n-resize'
                } else if (angle >= 300 && angle < 330) {
                    canvasDom.style.cursor = 'ne-resize'
                } else if (angle >= 300 && angle <= 360) {
                    canvasDom.style.cursor = 'e-resize'
                }
            } else {
                canvasDom.style.cursor = 'default'
            }
            let centerX = imgPositionX + imgWidth / 2
            let centerY = imgPositionY + imgHeight / 2
            let x1 = imgPositionX
            let y1 = imgPositionY
            let x2 = e.offsetX
            let y2 = e.offsetY
            let scf = Math.abs((centerX - x1)) + Math.abs((centerY - y1))
            let scl = Math.abs((centerX - x2)) + Math.abs((centerY - y2))
            let sc = scf / scl
            //拖拽
            if (isIn && e.which === 1 && pickflag !== 'rgba(0, 0, 0, 0)') {
                // ctx.putImageData(initImageData, 0, 0)
                imgPositionX = imgPositionX + e.movementX
                imgPositionY = imgPositionY + e.movementY
                setLeft(imgPositionX)
                setTop(imgPositionY)
                ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
                ctx.save()
                rotatefunc(ctx, angle, imgPositionX, imgPositionY, imgWidth, imgHeight)
                drawImg(ctx, img, imgPositionX, imgPositionY, imgWidth, imgHeight, controlWidth, controlHeight, controlColor)
                ctx.restore()
            }
            //左上角缩放
            else if (isnw && e.which === 1) {
                imgPositionX = imgPositionX - (1 - sc) / 2 * imgWidth
                imgPositionY = imgPositionY - (1 - sc) / 2 * imgHeight
                imgWidth += (1 - sc) * imgWidth
                imgHeight += (1 - sc) * imgHeight
                setWidth(imgWidth)
                setHeight(imgHeight)
                setLeft(imgPositionX)
                setTop(imgPositionY)
                ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
                ctx.save()
                rotatefunc(ctx, angle, imgPositionX, imgPositionY, imgWidth, imgHeight)
                drawImg(ctx, img, imgPositionX, imgPositionY, imgWidth, imgHeight, controlWidth, controlHeight, controlColor)
                ctx.restore()
            }
            //右上角缩放
            else if (isne && e.which === 1) {
                imgPositionX = imgPositionX - (1 - sc) / 2 * imgWidth
                imgPositionY = imgPositionY - (1 - sc) / 2 * imgHeight
                imgWidth += (1 - sc) * imgWidth
                imgHeight += (1 - sc) * imgHeight
                setWidth(imgWidth)
                setHeight(imgHeight)
                setLeft(imgPositionX)
                setTop(imgPositionY)
                ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
                ctx.save()
                rotatefunc(ctx, angle, imgPositionX, imgPositionY, imgWidth, imgHeight)
                drawImg(ctx, img, imgPositionX, imgPositionY, imgWidth, imgHeight, controlWidth, controlHeight, controlColor)
                ctx.restore()
            }
            //左下角缩放
            else if (issw && e.which === 1) {
                imgPositionX = imgPositionX - (1 - sc) / 2 * imgWidth
                imgPositionY = imgPositionY - (1 - sc) / 2 * imgHeight
                imgWidth += (1 - sc) * imgWidth
                imgHeight += (1 - sc) * imgHeight
                setWidth(imgWidth)
                setHeight(imgHeight)
                setLeft(imgPositionX)
                setTop(imgPositionY)
                ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
                ctx.save()
                rotatefunc(ctx, angle, imgPositionX, imgPositionY, imgWidth, imgHeight)
                drawImg(ctx, img, imgPositionX, imgPositionY, imgWidth, imgHeight, controlWidth, controlHeight, controlColor)
                ctx.restore()
            }
            //右下角缩放
            else if (isse && e.which === 1) {
                imgPositionX = imgPositionX - (1 - sc) / 2 * imgWidth
                imgPositionY = imgPositionY - (1 - sc) / 2 * imgHeight
                imgWidth += (1 - sc) * imgWidth
                imgHeight += (1 - sc) * imgHeight
                setWidth(imgWidth)
                setHeight(imgHeight)
                setLeft(imgPositionX)
                setTop(imgPositionY)
                ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
                ctx.save()
                rotatefunc(ctx, angle, imgPositionX, imgPositionY, imgWidth, imgHeight)
                drawImg(ctx, img, imgPositionX, imgPositionY, imgWidth, imgHeight, controlWidth, controlHeight, controlColor)
                ctx.restore()
            }
            //旋转
            else if (isRot && e.which === 1) {
                angle = ((Math.atan2(e.offsetY - centerY, e.offsetX - centerX) / Math.PI) * 180 + 90) % 360
                setAngleVal(angle)
                ctx.clearRect(0,0,canvasDom.width,canvasDom.height)
                ctx.save()
                rotatefunc(ctx, angle, imgPositionX, imgPositionY, imgWidth, imgHeight)     
                drawImg(ctx, img, imgPositionX, imgPositionY, imgWidth, imgHeight, controlWidth, controlHeight, controlColor)
                ctx.restore()
            }
        }
        canvasDom.onmouseup = () => {
            canvasDom.style.cursor = 'default'
            isnw = false
            isne = false
            issw = false
            isse = false
        }
    }
    return (
        <div>
            <li><input type="text" ref={imgRef} defaultValue="https://cdn1.mihuiai.com/media/images/b7bb3b4a-4802-4c6a-b879-bd61db1ee675_thumb.png?x-oss-process=style/small" /></li>
            <li><button onClick={addImage}>添加图片</button></li>
            <li>
                <p>图片旋转</p>
            </li>
            <li>
                <input type="range" ref={rangeImgRef} min="1" max="360" step="1" />
            </li>
            <li>
                <p>切片x</p>
            </li>
            <li>
                <input type="range" min="0" max="500" step="1" />
            </li>
            <li>
                <p>切片y</p>
            </li>
            <li>
                <input type="range" min="0" max="500" step="1" />
            </li>
            <li>
                <p>原点坐标x</p>
            </li>
            <li>
                <input type="range" min="0" max="500" step="1" />
            </li>
            <li>
                <p>原点坐标y</p>
            </li>
            <li>
                <input type="range" min="0" max="500" step="1" />
            </li>
        </div>

    )
}
export default BtnImage