import React, { useEffect } from 'react'
const BtnLineDash = (props) => {
    const { canvasDom, state } = props
    useEffect(() => {
        addLineDash()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        state.lineDashfValue,
        state.dashOffsetValue,
        state.lineDashlValue
    ]);
    const addLineDash = () => {
        if (!canvasDom) {
            return
        }
        const ctx = canvasDom.getContext('2d')
        let rectStartX = 100
        let rectStartY = 100
        let rectWidth = 200
        let rectHeight = 200
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
        ctx.setLineDash([state.lineDashfValue, state.lineDashlValue])
        ctx.lineDashOffset = state.dashOffsetValue
        ctx.strokeRect(rectStartX, rectStartY, rectWidth, rectHeight)
    }
    return (
        <li>
            <button onClick={addLineDash}>绘制虚线</button>
        </li>
    )
}
export default BtnLineDash