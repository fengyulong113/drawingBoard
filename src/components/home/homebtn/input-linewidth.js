import React from 'react'
const InputLineWidth = (props) => {
    const { dispatch } = props
    return (
        <div className="line-width">
            <p>线条宽度</p>
            <input type="text" onChange={(e)=>dispatch({type:'lineWidth',val:e.target.value})} />
        </div>
    )
}
export default InputLineWidth