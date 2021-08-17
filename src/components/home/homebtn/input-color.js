import React from 'react'
const InputColor = (props) => {
    const { dispatch } = props
    return (
        <div className="color">
            <p>颜色</p>
            <input 
            type="color"
            onChange={(e)=>dispatch({type:'color',val:e.target.value})}
            />
        </div>
    )
}
export default InputColor