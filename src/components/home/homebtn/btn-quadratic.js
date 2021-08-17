import React from 'react'
const BtnQadratic = (props) => {
    const { canvasDom } = props
    const addQadratic = () => {
        if (!canvasDom) {
            return
        }
        const ctx = canvasDom.getContext('2d')
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
        ctx.beginPath()
        ctx.moveTo(200, 200)
        ctx.quadraticCurveTo(200, 100, 300, 100)
        ctx.stroke()
    }
    return (

        <li>
            <button onClick={addQadratic}>绘制二次贝塞尔曲线</button>
        </li>
    )
}
export default BtnQadratic