import React, { useEffect } from 'react'
const BtnRect = (props) => {
    const { canvasDom, state, turn, changeTurn } = props
    useEffect(() => {
        if(turn === 'rect'){
            addRect()
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

    const addRect = () => {
        changeTurn('rect')
        if (!canvasDom) {
            return
        }
        const ctx = canvasDom.getContext('2d')
        let rectStartX = 100
        let rectStartY = 100
        let rectWidth = 200
        let rectHeight = 200
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)

        ctx.save()
        ctx.translate(rectStartX + rectWidth / 2, rectStartY + rectHeight / 2)
        ctx.rotate(state.rotateValue * Math.PI / 180)
        ctx.scale(state.scaleValue, state.scaleValue)
        ctx.translate(-(rectStartX + rectWidth / 2), -(rectStartY + rectHeight / 2))

        ctx.beginPath()
        ctx.globalCompositeOperation = state.layerValue
        ctx.rect(rectStartX, rectStartY, rectWidth, rectHeight)
        ctx.stroke()
        ctx.shadowColor = state.shadowColorValue
        ctx.shadowOffsetX = state.shadowOffsetXValue
        ctx.shadowOffsetY = state.shadowOffsetYValue
        ctx.shadowBlur = state.shadowBlurValue
        ctx.fillStyle = state.colorValue
        ctx.fill()
        ctx.fillStyle = 'green'
        ctx.fillRect(150, 150, 200, 200)
        ctx.restore()
        ctx.globalAlpha = state.alphaValue
    }
    return (
        <li>
            <button onClick={addRect}>绘制矩形</button>
        </li>
    )
}
export default BtnRect