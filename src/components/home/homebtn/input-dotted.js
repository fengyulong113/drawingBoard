import React from 'react'
const InputDotted = (props) => {
    const {dispatch}=props
    return (
        <div className="dotted-line">
            <div className="solid-line">
                <p>虚线中实线长度</p>
                <input type="text" onChange={(e)=>dispatch({type:'lineDashF',val:e.target.value})} />
            </div>
            <div className="blank">
                <p>虚线中空白长度</p>
                <input type="text" onChange={(e)=>dispatch({type:'lineDashL',val:e.target.value})} />
            </div>
            <div className="deviation">
                <p>虚线起始偏移量</p>
                <input type="text" onChange={(e)=>dispatch({type:'dashOffset',val:e.target.value})} />
            </div>
        </div>
    )
}
export default InputDotted