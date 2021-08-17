import React from 'react'
const InputFont = (props) => {
    const {dispatch} = props
    return (
        <div className="font">
            <div className="font-size">
                <p>字号</p>
                <select name="font-size" onChange={(e)=>dispatch({type:'font',val:e.target.value})}>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div className="font-family">
                <p>字体</p>
                <select name="fontFamily" onChange={(e)=>dispatch({type:'fontFamily',val:e.target.value})}>
                    <option value="serif">衬线字体</option>
                    <option value="楷体">楷体</option>
                </select>
            </div>
        </div>
    )
}
export default InputFont