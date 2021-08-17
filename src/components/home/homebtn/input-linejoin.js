import React from 'react'
const InputLineJoin = (props) => {
    const {dispatch}=props
    return (
        <div className="line-join">
            <p>线条间接合处</p>
            <select name="lineJoin" onChange={(e)=>dispatch({type:'lineJoin',val:e.target.value})}>
                <option value="miter">默认</option>
                <option value="bevel">尖角</option>
                <option value="round">圆角</option>
            </select>
        </div>
    )
}
export default InputLineJoin