import React, { useCallback, useReducer, useState } from 'react'
import './homecss/home.css'
import { initState, reducer } from '../../common/state'
import BtnRect from './homebtn/btn-rect'
import BtnTriangle from './homebtn/btn-triangle'
import BtnLine from './homebtn/btn-line'
import BtnArc from './homebtn/btn-arc'
import BtnLineDash from './homebtn/btn-linedash'
import BtnQadratic from './homebtn/btn-quadratic'
import BtnBezier from './homebtn/btn-bezier'
import BtnText from './homebtn/btn-text'
import BtnImage from './homebtn/btn-image'
import Clear from './homebtn/btn-clear'
import Canvas from './homebtn/canvas'
import InputLayer from './homebtn/input-layer'
import InputScale from './homebtn/input-scale'
import InputRotate from './homebtn/input-rotate'
import InputAlpah from './homebtn/input-alpha'
import InputColor from './homebtn/input-color'
import InputDotted from './homebtn/input-dotted'
import InputLineWidth from './homebtn/input-linewidth'
import InputLineCap from './homebtn/input-linecap'
import InputLineJoin from './homebtn/input-linejoin'
import InputShadow from './homebtn/input-shadow'
import InputFont from './homebtn/input-font'
import InputText from './homebtn/input-text'
import BtnColorChoose from './homebtn/btn.colorchoose'


function Home() {
    const [state, dispatch] = useReducer(reducer, initState)
    const [canvasDom, setCanvasDom] = useState(null);
    const [turn, setTurn] = useState('test');
    const [colorChooseRef, setColorChooseRef] = useState(null);
    const [colorShowRef, setColorShowRef] = useState(null);

    const changeTurn = useCallback((code) => {
        setTurn(code)
    })
    //获取canvas dom节点
    const getCanvasDom = (value) => {
        setCanvasDom(value)
    }
    //获取btn-colorchoose dom 节点
    const getColorChooseRef = (value) => {
        setColorChooseRef(value)
    }
    //获取btn-colorshow dom 节点
    const getColorShowRef = (value) => {
        setColorShowRef(value)
    }
    return (
        <div className="App">
            <div className="list">
                <ul>
                    <BtnRect canvasDom={canvasDom} state={state} turn={turn} changeTurn={changeTurn} />
                    <BtnTriangle canvasDom={canvasDom} state={state} turn={turn} changeTurn={changeTurn} />
                    <BtnLine canvasDom={canvasDom} state={state} />
                    <BtnArc canvasDom={canvasDom} />
                    <BtnLineDash canvasDom={canvasDom} state={state} />
                    <BtnQadratic canvasDom={canvasDom} />
                    <BtnBezier canvasDom={canvasDom} />
                    <BtnText canvasDom={canvasDom} state={state} />
                    <BtnImage canvasDom={canvasDom} colorChooseRef={colorChooseRef} colorShowRef={colorShowRef} state={state} />
                </ul>
            </div>
            <div className="content">
                <Clear canvasDom={canvasDom} />
                <hr color="#000" size="1" />
                <div className="content-text">
                    <InputLayer dispatch={dispatch} />
                    <InputScale dispatch={dispatch} />
                    <InputRotate dispatch={dispatch} />
                    <InputAlpah dispatch={dispatch} />
                    <InputColor dispatch={dispatch} />
                    <InputDotted dispatch={dispatch} />
                    <InputLineWidth dispatch={dispatch} />
                    <InputLineCap dispatch={dispatch} />
                    <InputLineJoin dispatch={dispatch} />
                    <InputShadow dispatch={dispatch} />
                    <InputFont dispatch={dispatch} />
                    <InputText dispatch={dispatch} />
                    <BtnColorChoose getColorChooseRef={getColorChooseRef} getColorShowRef={getColorShowRef} />
                </div>
                <Canvas getCanvasDom={getCanvasDom} />
            </div>
        </div>
    )
}
export default Home