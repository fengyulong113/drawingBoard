import React, { useRef, useState, useEffect } from 'react'
const BtnText = (props) => {
    const {
        canvasDom,
        state
    } = props
    const textRef = useRef()
    const [textValue, setTextValue] = useState('');
    useEffect(() => {
        addText()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        textValue,
        state.fontValue,
        state.fontFamilyValye,
        state.alignValue,
        state.baselineValue,
        state.derectionValue
    ]);

    const addText = () => {
        if (!canvasDom) {
            return
        }
        const ctx = canvasDom.getContext('2d')
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
        ctx.font = `${state.fontValue}px ${state.fontFamilyValye}`
        ctx.textAlign = state.alignValue
        ctx.textBaseline = state.baselineValue
        ctx.direction = state.derectionValue
        ctx.fillText(textValue, 100, 100)

        //添加文字
        textRef.current.onchange = () => {
            setTextValue(textRef.current.value)
        }
    }
    return (
        <div>
            <li><input type="text" ref={textRef} /></li>
            <li><button onClick={addText}>添加文字</button></li>
        </div>
    )
}
export default BtnText