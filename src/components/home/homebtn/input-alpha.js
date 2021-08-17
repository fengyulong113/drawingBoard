import React from 'react'
const InputAlpah = (props) => {
    const { dispatch } = props
    return (
        <div className="gobalAlpha">
            <p>不透明度</p>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                onInput={(e) => dispatch({ type: 'alpha', val: e.target.value })}
            />
        </div>
    )
}
export default InputAlpah