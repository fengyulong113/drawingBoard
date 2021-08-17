import React from 'react'
const InputScale = (props) => {
    const { dispatch } = props
    return (
        <div className="scale">
            <p>缩放</p>
            <input
                type="range"
                min="0.1"
                max="2"
                step="0.01"
                onInput={(e) => dispatch({ type: 'scale', val: e.target.value })}
            />
        </div>
    )
}
export default InputScale