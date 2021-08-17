import React,{ useRef, useEffect } from 'react'
const Canvas = (props) => {
    const canvasRef = useRef()
    const { getCanvasDom } = props
    const canvas = canvasRef.current

    useEffect(() => {
        getCanvasDom(canvas)
    }, [getCanvasDom,canvas]);
    
    return (
        <div className="canvas">
            <canvas id="canvas" ref={canvasRef} style={{cursor:'default'}} width="1181px" height="500px"></canvas>
        </div>
    )
}
export default Canvas