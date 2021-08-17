import React from 'react'
const InputText = (props) => {
    const {dispatch}=props
    return (
        <div className="text">
            <div className="text-align">
                <p>文本对齐选项</p>
                <select name="textAlign"  onChange={(e)=>dispatch({type:'textAlign',val:e.target.value})}>
                    <option value="left">左对齐</option>
                    <option value="right">右对齐</option>
                    <option value="center">居中对齐</option>
                    <option value="start">首对齐</option>
                    <option value="end">尾对齐</option>
                </select>
            </div>
            <div className="text-baseline">
                <p>基线对齐选项</p>
                <select name="textBaseLine"  onChange={(e) => dispatch({type:'textBaseLine',val:e.target.value})}>
                    <option value="top">顶部</option>
                    <option value="hanging">悬挂基线</option>
                    <option value="middle">中间</option>
                    <option value="alphabetic">字母基线</option>
                    <option value="ideographic">表意字基线</option>
                    <option value="bottom">底部</option>
                </select>
            </div>
            <div className="text-derection">
                <p>文本方向</p>
                <select name="text-derection"  onChange={(e) => dispatch({type:'textDerection',val:e.target.value})}>
                    <option value="ltr">从左向右</option>
                    <option value="rtl">从右向左</option>
                    <option value="inherit">默认</option>
                </select>
            </div>

        </div>
    )
}
export default InputText