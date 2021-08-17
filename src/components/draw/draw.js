import React from 'react'
import './draw.css'
let fabric = window.fabric;
const Draw = () => {
    let canvas = null   // fabric canvas对象
    let strokeColor = "#000000"     // 线框色
    let fillColor = "rgba(0,0,0,0)"     // 填充色
    let lineSize = 1    //线宽
    let bgColor = "#fff"        // 背景色
    let fontSize = 18       //  字体大小
    let mouseFrom = {}      // 鼠标绘制起点
    let mouseTo = {}    // 鼠标绘制重点
    let points = []     //折线点
    let drawingObject = null // 保存鼠标未松开时用户绘制的临时图像
    let textObject = null   //文本对象
    let isDrawing = false   // 绘制标识
    let selectTool = ''     //绘制工具
    let $ = function (id) { return document.getElementById(id) }
    let f = fabric.Image.filters

    //初始化画布
    function initCanvas() {
        if (!canvas) {
            canvas = new fabric.Canvas('canvasdraw');
            canvas.setBackgroundColor(bgColor)
            canvas.setWidth(800)
            canvas.setHeight(500)
        }
    }
    //初始化事件
    function initCanvasEvent() {
        let toolTypes = ["line", "rect", "circle", "text", "brokenLine"]
        canvas.on('mouse:down', (options) => {
            if (selectTool !== 'text' && textObject) {
                textObject.exitEditing()
                textObject.set('backgroundColor', 'rgba(0,0,0,0)')
                if (textObject.text === '') {
                    canvas.remove(textObject)
                }
                canvas.renderAll()
                textObject = null
            }
            if (toolTypes.indexOf(selectTool) !== -1) {
                mouseFrom.x = options.e.clientX - canvas._offset.left
                mouseFrom.y = options.e.clientY - canvas._offset.top;
                if (selectTool === 'text') {
                    initText()
                } else {
                    isDrawing = true
                }
            }
        })
        canvas.on('mouse:move', (options) => {
            if (isDrawing) {
                mouseTo.x = options.e.clientX - canvas._offset.left
                mouseTo.y = options.e.clientY - canvas._offset.top
                switch (selectTool) {
                    case 'rect':
                        initRect()
                        break;
                    case 'circle':
                        initCircle()
                        break;
                    case 'line':
                        initLine()
                        break;
                    case 'brokenLine':
                        initBroken()
                        break;
                    default:
                        break;
                }
            }
        })
        canvas.on('mouse:up', () => {
            if (isDrawing) {
                drawingObject = null
                isDrawing = false
                resetMove()
            }
        })
    }
    //绘制矩形
    function initRect() {
        let left = mouseFrom.x
        let top = mouseFrom.y
        let width = mouseTo.x - mouseFrom.x
        let height = mouseTo.y - mouseFrom.y
        let canvasObject = new fabric.Rect({
            left: left,
            top: top,
            width: width,
            height: height,
            stroke: strokeColor,
            fill: fillColor
        })
        startDrawingObject(canvasObject)
    }
    //绘制圆形
    function initCircle() {
        let left =
            mouseFrom.x - mouseTo.x > 0 ? mouseTo.x : mouseTo.x - Math.abs(mouseFrom.x - mouseTo.x)
        let top =
            mouseFrom.y - mouseTo.y > 0 ? mouseTo.y : mouseTo.y - Math.abs(mouseFrom.y - mouseTo.y)
        let radius =
            Math.abs((mouseFrom.x - mouseTo.x) / 2) - Math.abs((mouseFrom.y - mouseTo.y) / 2) > 0 ?
                Math.abs(mouseFrom.y - mouseTo.y) / 2 :
                Math.abs(mouseFrom.x - mouseTo.x) / 2
        let canvasObject = new fabric.Circle({
            left: left,
            top: top,
            radius: radius,
            stroke: strokeColor,
            fill: fillColor,
            strokeWidth: lineSize
        })
        startDrawingObject(canvasObject)
    }
    //绘制直线
    function initLine() {
        let canvasObject = new fabric.Line(
            [mouseFrom.x, mouseFrom.y, mouseTo.x, mouseTo.y],
            {
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: lineSize
            }
        )
        startDrawingObject(canvasObject)
    }
    //文本
    function initText() {
        if (!textObject) {
            textObject = new fabric.Textbox("", {
                left: mouseFrom.x,
                top: mouseFrom.y,
                fontSize: fontSize,
                fill: strokeColor,
                hasControls: true,      //是否可以有控制器
                editable: true,     //是否可以编辑
                width: 30,
                backgroundColor: "#fff",
                selectable: true    //是否可选
            })
            canvas.add(textObject)
            //编辑模式
            textObject.enterEditing()
            //获取焦点
            textObject.hiddenTextarea.focus()
        }
        else {
            textObject.exitEditing()
            textObject.set('backgroundColor', 'rgba(0,0,0,0)')
            if (textObject.text === '') {
                canvas.remove(textObject)
            }
            canvas.renderAll()
            textObject = null
            return
        }
    }
    //折线
    function initBroken() {
        points.push(mouseFrom)
        let canvasObject = new fabric.Polyline(points,
            {
                flipY: false,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: lineSize
            }
        )
        startDrawingObject(canvasObject)
    }
    //图片
    function initImage() {
        selectTool = 'image'
        fabric.util.loadImage(
            'https://cdn1.mihuiai.com/media/images/5ee5fd5a-f112-4b6b-b742-d58efeaa0775_thumb.png',
            (oImg) => {
                const img = new fabric.Image(oImg)
                initCanvas()
                img.set({ width: 200, height: 200, left: 100, top: 100 })
                canvas.add(img)
            },
            null,
            'anonymous'
        )
    }
    //画笔
    function initBurch() {
        //铅笔模式
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
        //设置绘画模式
        canvas.isDrawingMode = true
        //设置颜色与大小
        canvas.freeDrawingBrush.color = strokeColor
        canvas.freeDrawingBrush.width = parseInt(lineSize, 10)
    }
    //橡皮擦
    function initEraser() {
        canvas.freeDrawingBrush = new fabric.EraserBrush(canvas)
        canvas.freeDrawingBrush.width = 30
        canvas.isDrawingMode = true
    }
    //滤镜
    function applyFilter(index, filter) {
        let obj = canvas.getActiveObject()
        if (obj) {
            obj.filters[index] = filter
            obj.applyFilters()
            canvas.renderAll()
        }
    }
    function applyFilterValue(index, prop, value) {
        let obj = canvas.getActiveObject()
        if (obj.filters[index]) {
            obj.filters[index][prop] = value
            obj.applyFilters()
            canvas.renderAll()
        }
    }
    function Filters() {
        canvas.on({
            'selection:created': function () {
                fabric.util.toArray(document.getElementsByTagName('input')).forEach(function (el) { el.disabled = false })
                let filters = ['Brightness', 'Contrast', 'Hue']
                for (var i = 0; i < filters.length; i++) {
                    $(filters[i]) && $(filters[i].checked = !!canvas.getActiveObject().filters[i])
                }
            },
            'selection:cleared': function () {
                fabric.util.toArray(document.getElementsByTagName('input')).forEach(function (el) { el.disabled = true })
            }
        })
    }
    //清空起止点
    function resetMove() {
        mouseFrom = {};
        mouseTo = {};
    }
    //选择类型
    function tapToolBtn(tool) {
        initCanvas()
        initCanvasEvent()
        if (selectTool === tool) return;
        // 保存当前选中的绘图工具
        selectTool = tool;
        canvas.isDrawingMode = false
        if (selectTool === 'brush') {
            initBurch()
        } else if (selectTool === 'eraser') {
            initEraser()
        } else if (selectTool === 'brightness' || selectTool === 'contrast' || selectTool === 'hue') {
            Filters()
        }
    }
    //绘制图形
    function startDrawingObject(canvasObject) {
        canvasObject.selectable = false;
        if (drawingObject) {
            canvas.remove(drawingObject);
        }
        canvas.add(canvasObject);
        drawingObject = canvasObject;
    }

    return (
        <div className="draw">
            <ul>
                <li>
                    <button id='btnaddRect' onClick={() => { tapToolBtn('rect') }}></button>
                </li>
                <li>
                    <button id="btnaddCircle" onClick={() => { tapToolBtn('circle') }}></button>
                </li>
                <li>
                    <button id="btnaddLine" onClick={() => { tapToolBtn('line') }}></button>
                </li>
                <li>
                    <button id="btnaddBrokenLine" onClick={() => { tapToolBtn('brokenLine') }}></button>
                </li>
                <li>
                    <button id="btnBrush" onClick={() => { tapToolBtn('brush') }}></button>
                </li>
                <li>
                    <button id="btnaddText" onClick={() => { tapToolBtn('text') }}></button>
                </li>
                <li>
                    <button id="btnaddImage" onClick={() => { initImage() }}></button>
                </li>
                <li>
                    <button id="addClear"
                        onClick={() => {
                            initCanvas()
                            canvas.clear()
                        }
                        }>
                    </button>
                </li>
                <li>
                    <button id='btnEraser' onClick={() => { tapToolBtn('eraser') }}></button>
                </li>
                <li>
                    <button onClick={() => {
                        initCanvas()
                        initCanvasEvent()
                        tapToolBtn('')
                        // selectTool = ''
                        if (!canvas.getActiveObject()) {
                            return;
                        }
                        if (canvas.getActiveObject().type !== 'activeSelection') {
                            return;
                        }
                        canvas.getActiveObject().toGroup();
                        canvas.requestRenderAll();
                        canvas.selectable = true
                    }}>group</button>
                </li>
                <li>
                    <button onClick={() => {
                        initCanvas()
                        initCanvasEvent()
                        tapToolBtn('')
                        if (!canvas.getActiveObject()) {
                            return;
                        }
                        if (canvas.getActiveObject().type !== 'group') {
                            return;
                        }
                        canvas.getActiveObject().toActiveSelection();
                        canvas.requestRenderAll();
                    }}>ungroup</button>
                </li>
                <li className="typeInput">
                    <span>Brightness:</span>
                    <input
                        type="checkbox"
                        className="typeCheck"
                        id='brightness'
                        onClick={() => {
                            tapToolBtn('brightness')
                            applyFilter(0, new f.Brightness({
                                brightness: parseFloat($('brightness-value').value)
                            }))
                        }}
                    /><br />
                    <span>Value:</span>
                    <input
                        type="range"
                        defaultValue="0.1"
                        id='brightness-value'
                        min="-1"
                        max="1"
                        step="0.003921"
                        onInput={(e) => {
                            applyFilterValue(0, 'brightness', parseFloat(e.target.value))
                        }}
                    />

                    <span>Contrast:</span>
                    <input
                        type="checkbox"
                        className="typeCheck"
                        id='contrast'
                        onClick={() => {
                            tapToolBtn('contrast')
                            applyFilter(1, new f.Contrast({
                                contrast: parseFloat($('contrast-value').value)
                            }))
                        }}
                    /><br />
                    <span>Value:</span>
                    <input
                        type="range"
                        defaultValue="0"
                        id='contrast-value'
                        min="-1"
                        max="1"
                        step="0.003921"
                        onInput={(e) => {
                            applyFilterValue(1, 'contrast', parseFloat(e.target.value));
                        }}
                    />

                    <span>Hue:</span>
                    <input
                        type="checkbox"
                        className="typeCheck"
                        id='hue'
                        onClick={() => {
                            tapToolBtn('hue')
                            applyFilter(2, new f.HueRotation({
                                rotation: $('hue-value').value
                            }));
                        }}
                    /><br />
                    <span>Value:</span>
                    <input
                        type="range"
                        defaultValue="0"
                        id="hue-value"
                        min="-2"
                        max="2"
                        step="0.002"
                        onInput={(e) => {
                            applyFilterValue(2, 'rotation', e.target.value);
                        }}
                    />
                </li>
            </ul>
            <div className='canvasdraw'>
                <canvas id='canvasdraw' width='800' height='500'></canvas>
            </div>
        </div>

    )
}
export default Draw