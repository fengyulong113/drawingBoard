import React,{useRef,useEffect} from 'react'
const BtnColorChoose =(props)=>{
    const colorChooseRef=useRef()
    const colorShowRef = useRef()
    const {getColorChooseRef,getColorShowRef}=props

    useEffect(() => {
        getColorChooseRef(colorChooseRef)
    }, [getColorChooseRef]);
    useEffect(() => {
        getColorShowRef(colorShowRef)
    }, [getColorShowRef]);
    return(
        <div className="colorChoose">
            <button id="colorChoose" ref={colorChooseRef}>吸色</button>
            <div id='colorshow' ref={colorShowRef} ></div>
        </div>
    )
}
export default BtnColorChoose