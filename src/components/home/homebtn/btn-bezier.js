import React from 'react'
const BtnBezier = (props) => {
    const { canvasDom } = props
    const addBezier = () => {
        if (!canvasDom) {
            return
        }
        const ctx = canvasDom.getContext('2d')
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
        ctx.moveTo(75, 40);
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        ctx.stroke()
    }
    return (
        <li>
            <button onClick={addBezier}>绘制三次贝塞尔曲线</button>
        </li>
    )
}
export default BtnBezier