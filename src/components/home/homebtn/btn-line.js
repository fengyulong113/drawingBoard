import React, { useEffect } from 'react'
const BtnLine = (props) => {
    const { canvasDom, state } = props
    useEffect(() => {
        addLine()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.lineWidthValue,
        state.lineCapValue,
        state.lineJoinValue
        ]);
    const addLine = () => {
        if (!canvasDom) {
            return
        }
        const ctx = canvasDom.getContext('2d')
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
        ctx.lineWidth = state.lineWidthValue
        ctx.lineCap = state.lineCapValue
        ctx.lineJoin = state.lineJoinValue
        ctx.beginPath()
        ctx.moveTo(100, 200)
        ctx.lineTo(200, 100)
        ctx.lineTo(300, 200)
        ctx.stroke()
    }
    return (
        <li>
            <button onClick={addLine}>绘制线条</button>
        </li>
    )
}
export default BtnLine