import React from 'react'
import './filters.css'
const Filters = () => {
    let gl = null
    let saturationUniform = null
    let rUniform = null
    let gUniform = null
    let bUniform = null
    let imgsrc = 'https://cdn1.mihuiai.com/media/images/ecbe4016-09cb-4e84-a098-64b3deb7c02d_thumb.png?x-oss-process=style/resize&id=0.08860212253200772'
    //创建Shader
    function createShader(gl, type, source) {
        // 创建 shader 对象
        const shader = gl.createShader(type)
        //传入源码
        gl.shaderSource(shader, source);
        // 编译 shader
        gl.compileShader(shader);
        // 判断 shader 是否编译成功
        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        // 如果编译失败，则打印错误信息
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    //创建Program
    function createProgram(gl, vertexShader, fragmentShader) {
        // 创建 program 对象
        const program = gl.createProgram()
        // 往 program 对象中传入 WebGLShader 对象
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        //链接program
        gl.linkProgram(program)
        // 判断 program 是否链接成功
        let success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
        // 如果 program 链接失败，则打印错误信息
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
    //初始化
    function initWebGL(gl, vertexSource, fragmentSource) {
        // 根据源代码创建顶点着色器
        let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
        // 根据源代码创建片元着色器
        let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
        // 创建 WebGLProgram 程序
        let program = createProgram(gl, vertexShader, fragmentShader);
        return program;
    }
    function createTextureByImageObject(gl, imgObject) {
        gl.activeTexture(gl.TEXTURE0);
        const textureObject = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textureObject);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgObject);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        return textureObject;
    }
    // 顶点着色器源码
    const vertexSource = `
    precision mediump float;
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main () {
        gl_Position = a_position;
        v_texCoord = vec2((a_position.x+1.0)/2.0,1.0-(a_position.y+1.0)/2.0);
    } 
    `;
    // 片段着色器源码
    const fragmentSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D u_texture;
    uniform float size;
    uniform float saturation;
    uniform float r;
    uniform float g;
    uniform float b;
    uniform float a;
    void main () {
        // gl_FragColor = texture2D(u_texture, v_texCoord);
        vec4 texture = texture2D(u_texture,v_texCoord);
        texture.r += r; 
        texture.g += g; 
        texture.b += b; 
        // texture.a = 0.5;
        //饱和度
        float average = (texture.r + texture.g + texture.b) / 3.0;
        if (saturation > 0.0) {
            texture.rgb += (average - texture.rgb) * (1.0 - 1.0 / (1.001 - saturation));
        } else {
            texture.rgb += (average - texture.rgb) * (-saturation);
        }

        gl_FragColor = texture;
    }
    `;
    function add() {
        gl = document.getElementById('canvasfilter').getContext('webgl')
        // 初始化shader程序
        const program = initWebGL(gl, vertexSource, fragmentSource)
        gl.useProgram(program);
        const pointPos = [
            1.0, 1.0,
            1.0, -1.0,
            -1.0, 1.0,
            -1.0, -1.0
        ];
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);
        const a_position = gl.getAttribLocation(program, "a_position");
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(
            a_position,
            2,
            gl.FLOAT,
            false,
            Float32Array.BYTES_PER_ELEMENT * 2,
            0
        );
        gl.enableVertexAttribArray(a_position);
        const image = new Image();
        image.src = imgsrc;
        image.crossOrigin = 'anonymous'
        image.onload = function () {
            createTextureByImageObject(gl, image);
            const uniform = gl.getUniformLocation(program, "u_texture");
            saturationUniform = gl.getUniformLocation(program, "saturation");
            rUniform = gl.getUniformLocation(program, "r");
            gUniform = gl.getUniformLocation(program, "g");
            bUniform = gl.getUniformLocation(program, "b");
            gl.uniform1i(uniform, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
    }
    
    //饱和度
    function changeRange(value) {
        const val = Number(value) / 100;
        gl.uniform1f(saturationUniform, val);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    //R
    function changeR(value) {
        const val = Number(value) / 100;
        gl.uniform1f(rUniform, val);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    //G
    function changeG(value) {
        const val = Number(value) / 100;
        gl.uniform1f(gUniform, val);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    //B
    function changeB(value) {
        const val = Number(value) / 100;
        gl.uniform1f(bUniform, val);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    return (
        <div>
            <div className="filters">
                <button onClick={() => {
                    add()
                }}>添加图片</button>
                <div className="lj">
                    <span>滤镜：</span>
                    <input type="checkbox" id='lj' />
                    <div className="saturation">
                        <span>饱和度:</span>
                        <input type="range" min={1} max={100} step={1} onInput={(e) => {
                            let ljflag = document.getElementById('lj').checked
                            if(ljflag){
                                changeRange(e.target.value)
                            }
                        }} />
                    </div>
                </div>
                <div className="Color">
                    <span>颜色：</span>
                    <input type="checkbox" id='color' />
                    <div className="saturation">
                        <div>
                            <span>R:</span>
                            <input type="range" min={1} max={100} step={1} onInput={(e) => {
                                let colorflag = document.getElementById('color').checked
                                if(colorflag){
                                    changeR(e.target.value)
                                }
                            }} />
                        </div>
                        <div>
                            <span>G:</span>
                            <input type="range" min={1} max={100} step={1} onInput={(e) => {
                                let colorflag = document.getElementById('color').checked
                                if(colorflag){
                                    changeG(e.target.value)
                                }
                            }} />
                        </div>
                        <div>
                            <span>B:</span>
                            <input type="range" min={1} max={100} step={1} onInput={(e) => {
                                let colorflag = document.getElementById('color').checked
                                if(colorflag){
                                    changeB(e.target.value)
                                }
                            }} />
                        </div>
                    </div>
                </div>
                <br />
            </div>
            <canvas id="canvasfilter" width='800' height='600'></canvas>
        </div>

    )
}
export default Filters