import React, { useEffect } from 'react'
const BtnTriangle = (props) => {
    const { canvasDom, state, turn, changeTurn } = props
    useEffect(() => {
        if(turn === 'triangle'){
            addTriangle()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        state.rotateValue,
        state.scaleValue,
        state.shadowColorValue,
        state.shadowOffsetXValue,
        state.shadowOffsetYValue,
        state.shadowBlurValue,
        state.colorValue,
        state.alphaValue
    ]);
    const addTriangle = () => {
        changeTurn('triangle')
        if (!canvasDom) {
            return
        }
        const ctx = canvasDom.getContext('2d')
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
        ctx.save()
        ctx.translate(200, 300 - (Math.sqrt(30000) * 1 / 3))
        ctx.rotate(state.rotateValue * Math.PI / 180)
        ctx.scale(state.scaleValue, state.scaleValue)
        ctx.translate(-200, -(300 - (Math.sqrt(30000) * 1 / 3)))
        ctx.beginPath()
        ctx.moveTo(200, 300 - Math.sqrt(30000))
        ctx.lineTo(100, 300)
        ctx.lineTo(300, 300)
        ctx.closePath()
        ctx.stroke()
        ctx.shadowColor = state.shadowColorValue
        ctx.shadowOffsetX = state.shadowOffsetXValue
        ctx.shadowOffsetY = state.shadowOffsetYValue
        ctx.shadowBlur = state.shadowBlurValue
        ctx.fillStyle = state.colorValue
        ctx.fill()
        ctx.restore()
        ctx.globalAlpha = state.alphaValue
    }
    return (
        <li>
            <button onClick={addTriangle}>绘制三角形</button>
        </li>
    )
}
export default BtnTriangle