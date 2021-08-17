import React from 'react'
const InputShadow = (props) => {
    const {dispatch}=props
    return (
        <div className="shadow">
            <div className="shadow-blur">
                <p>阴影模糊</p>
                <input type="text" onChange={(e)=>dispatch({type:'shadowBlur',val:e.target.value})} />
            </div>
            <div className="shadow-color">
                <p>阴影颜色</p>
                <input type="color" onChange={(e)=>dispatch({type:'shadowColor',val:e.target.value})} />
            </div>
            <div className="shadowOffset">
                <p>阴影偏移</p>
                <input type="text" placeholder="x" onChange={(e)=>dispatch({type:'shadowOffsetX',val:e.target.value})} />
                <input type="text" placeholder="y" onChange={(e)=>dispatch({type:'shadowOffsetY',val:e.target.value})} />
            </div>
        </div>
    )
}
export default InputShadow