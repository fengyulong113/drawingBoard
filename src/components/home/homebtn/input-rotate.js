import React from 'react'
const InputRotate = (props) => {
    const { dispatch } = props
    return (
        <div className="rotate">
            <p>旋转</p>
            <input
                type="range"
                min="1"
                max="360"
                step="1"
                onInput={(e) => dispatch({ type: 'rotate', val: e.target.value })}
            />
        </div>
    )
}
export default InputRotate