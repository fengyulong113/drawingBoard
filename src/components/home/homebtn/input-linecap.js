import React from 'react'
const InputLineCap = (props) => {
    const {dispatch}=props
    return (
        <div className="line-cap">
            <p>线条末端样式</p>
            <select name="lineCap" onChange={(e)=>dispatch({type:'lineCap',val:e.target.value})}>
                <option value="butt">默认</option>
                <option value="square">方形</option>
                <option value="round">圆形</option>
            </select>
        </div>
    )
}
export default InputLineCap