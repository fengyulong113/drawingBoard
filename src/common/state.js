const initState = {
    rotateValue: 0,
    scaleValue: 1,
    alphaValue: 1,
    colorValue: '#fff',
    lineDashfValue: 5,
    lineDashlValue: 15,
    dashOffsetValue: 0,
    lineWidthValue: 5,
    lineCapValue: 'butt',
    lineJoinValue: 'miter',
    shadowBlurValue: 0,
    shadowColorValue: '#fff',
    shadowOffsetXValue: 0,
    shadowOffsetYValue: 0,
    fontValue: 12,
    fontFamilyValye: '微软雅黑',
    alignValue: 'start',
    baselineValue: 'alphabetic',
    derectionValue: 'inherit',
    layerValue: 'source-over'
}
function reducer(state, action) {
    switch (action.type) {
        case 'scale':
            return { ...state, scaleValue: action.val }
        case 'rotate':
            return { ...state, rotateValue: action.val }
        case 'alpha':
            return { ...state, alphaValue: action.val }
        case 'color':
            return { ...state, colorValue: action.val }
        case 'lineDashF':
            return { ...state, lineDashfValue: action.val }
        case 'lineDashL':
            return { ...state, lineDashlValue: action.val }
        case 'dashOffset':
            return { ...state, dashOffsetValue: action.val }
        case 'lineWidth':
            return { ...state, lineWidthValue: action.val }
        case 'lineCap':
            return { ...state, lineCapValue: action.val }
        case 'lineJoin':
            return { ...state, lineJoinValue: action.val }
        case 'shadowBlur':
            return { ...state, shadowBlurValue: action.val }
        case 'shadowColor':
            return { ...state, shadowColorValue: action.val }
        case 'shadowOffsetX':
            return { ...state, shadowOffsetXValue: action.val }
        case 'shadowOffsetY':
            return { ...state, shadowOffsetYValue: action.val }
        case 'font':
            return { ...state, fontValue: action.val }
        case 'fontFamily':
            return { ...state, fontFamilyValye: action.val }
        case 'textAlign':
            return { ...state, alignValue: action.val }
        case 'textBaseLine':
            return { ...state, baselineValue: action.val }
        case 'textDerection':
            return { ...state, derectionValue: action.val }
        case 'layer':
            return { ...state, layerValue: action.val }
        default:
            return state
    }
}

export { initState, reducer }