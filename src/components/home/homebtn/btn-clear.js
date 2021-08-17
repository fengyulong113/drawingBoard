import React from 'react'
const Clear = (props) => {
    const {canvasDom} = props

    const clear = ()=>{
        const ctx = canvasDom.getContext('2d')
        ctx.clearRect(0,0,canvasDom.width,canvasDom.height)
    }
    return (
        <div className="clear">
            <button onClick={clear}>清除画布</button>
        </div>
    )
}
export default Clear