import React from 'react'
const BtnArc = (props) => {
    const { canvasDom } = props

    const addArc = () => {
        if (!canvasDom) {

            
            return
        }
        const ctx = canvasDom.getContext('2d')
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
        ctx.beginPath()
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false)
        ctx.stroke()


    }
    return (
        <li>
            <button onClick={addArc}>绘制圆弧</button>
        </li>
    )
}
export default BtnArc