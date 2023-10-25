import { GetWebGL2Context, CreateSquareVbo, AttachShader,
         LinkProgram } from './glUtils.js';
import Canvas from './canvas.js';

const RENDER_FRAG = require('./shaders/render.frag');
const RENDER_VERT = require('./shaders/render.vert');

const TILE_NONE = 0;
const TILE_TOP = 1;
const TILE_BOTTOM = 2;
const TILE_TOP_RIGHT = 3;
const TILE_BOTTOM_RIGHT = 4;
const TILE_TOP_LEFT = 5;
const TILE_BOTTOM_LEFT = 6;

const SIZE = [45, 12];
//const tiles = new Array(SIZE[0] * SIZE[1]).fill(TILE_NONE);

// const tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 5, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 0, 0, 0, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 6, 1, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 5, 6, 6, 5, 0, 0, 0, 3, 2, 4, 4, 1, 4, 1, 4, 1, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 5, 6, 6, 5, 0, 0, 0, 0, 0, 3, 2, 2, 6, 2, 3, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 4, 6, 6, 5, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 5, 1, 4, 1, 4, 6, 3, 4, 4, 1, 4, 1, 1, 0, 0, 3, 2, 6, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 3, 4, 4, 1, 4, 1, 4, 1, 1, 3, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 5, 0, 0, 0, 3, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 3, 2, 3, 2, 3, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// let tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1, 0, 0, 0, 5, 1, 4, 1, 4, 1, 4, 1, 1, 0, 0, 0, 5, 1, 1, 0, 5, 1, 1, 0, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 4, 1, 0, 0, 3, 2, 4, 1, 3, 2, 4, 1, 3, 2, 4, 1, 0, 5, 1, 5, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 4, 1, 0, 0, 3, 2, 4, 1, 3, 2, 4, 1, 3, 2, 4, 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 4, 1, 0, 0, 3, 2, 4, 4, 6, 4, 4, 4, 6, 6, 5, 0, 3, 3, 2, 3, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 4, 1, 4, 1, 6, 5, 0, 0, 0, 3, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 4, 1, 4, 6, 6, 4, 1, 0, 0, 3, 2, 4, 4, 1, 4, 1, 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 3, 2, 3, 2, 3, 5, 0, 0, 0, 3, 3, 2, 3, 2, 3, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


const tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1, 0, 0, 0, 5, 1, 4, 1, 4, 1, 4, 1, 1, 0, 0, 0, 5, 1, 1, 0, 5, 1, 1, 0, 5, 1, 1, 0, 5, 1, 4, 1, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 4, 1, 0, 0, 3, 2, 4, 1, 3, 2, 4, 1, 3, 2, 4, 1, 3, 5, 1, 4, 1, 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 4, 1, 0, 0, 3, 2, 4, 1, 3, 2, 4, 1, 3, 2, 4, 1, 3, 2, 4, 1, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 4, 1, 0, 0, 3, 2, 4, 4, 6, 4, 4, 4, 6, 6, 5, 0, 3, 2, 4, 4, 1, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 4, 1, 4, 1, 6, 5, 0, 0, 0, 3, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 3, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 4, 1, 4, 6, 6, 4, 1, 0, 0, 3, 2, 4, 4, 1, 4, 6, 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 3, 2, 3, 2, 3, 5, 0, 0, 0, 3, 3, 2, 3, 2, 3, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//const tiles = new Array(SIZE[0] * SIZE[1]).fill(TILE_NONE);


export default class Canvas2D extends Canvas {
    constructor(canvasId) {
        super(canvasId);
    }

    init() {
        this.canvas = document.getElementById(this.canvasId);
        this.canvasRatio = this.canvas.width / this.canvas.height / 2;
        this.gl = GetWebGL2Context(this.canvas);
        this.vertexBuffer = CreateSquareVbo(this.gl);

        this.renderProgram = this.gl.createProgram();
        AttachShader(this.gl, RENDER_VERT,
                     this.renderProgram, this.gl.VERTEX_SHADER);
        AttachShader(this.gl, RENDER_FRAG,
                     this.renderProgram, this.gl.FRAGMENT_SHADER);
        LinkProgram(this.gl, this.renderProgram);
        this.renderVAttrib = this.gl.getAttribLocation(this.renderProgram,
                                                       'a_vertex');
        this.gl.enableVertexAttribArray(this.renderVAttrib);
        this.getUniformLocations();
        this.startTime = new Date().getTime();

        this.canvas.addEventListener('mousedown', this.mouse.bind(this));
        this.translate = [14, 5];
        this.scale = 12;

        this.canvas.oncontextmenu = function () {return false;};


        // const na = new Array(SIZE[0] * SIZE[1]).fill(TILE_NONE);
        // for(let x = 2; x < SIZE[0]; x++) {
        //     for(let y = 0; y < SIZE[1]; y++){
        //         const index = x + y * SIZE[0];
        //         const nIndex = (x - 2) + y * SIZE[0];
        //         na[nIndex] = tiles[index];
        //     }
        // }
        // tiles = na;
        // const na = new Array(SIZE[0] * SIZE[1]).fill(TILE_NONE);
        // for(let x = 0; x < SIZE[0]; x++) {
        //     for (let y = 0; y < SIZE[1]; y++) {
        //         const nIndex = x + y * SIZE[0];
        //         if(x < 40) {
        //             const index = x + y * 40;
        //             na[nIndex] = tiles[index];
        //         } else {
        //             na[nIndex] = 0;
        //         }
        //     }
        // }
        // tiles = na;

        this.printTiles(tiles);
    }

    calcCanvasCoord(mx, my) {
        const rect = this.canvas.getBoundingClientRect();
        return [this.scale * ((mx - rect.left) /
                              this.canvas.height - this.canvasRatio),
                this.scale * - ((my - rect.top) /
                                this.canvas.height - 0.5)];
    }

    calcSceneCoord(mx, my) {
        const coord = this.calcCanvasCoord(mx, my);
        return [coord[0] + this.translate[0], coord[1] + this.translate[1]];
    }
    
    mouse(event) {        
        event.preventDefault();
        const pos = this.calcSceneCoord(event.clientX, event.clientY);
        console.log(pos);

        const PI = 3.14159265359;
        const PI_3 = PI / 3.0;

        const plane1 = [0, 0, 0, 1]; // (x, y, normalX, normalY)
        const plane2 = [0, 0, Math.sin(PI_3), -Math.cos(PI_3)];
        const plane3 = [1, 0, -Math.sin(2. * PI_3), Math.cos(2. * PI_3)];
        

        const TRIANGLE_TOP = [Math.cos(PI_3), Math.sin(PI_3)];
        const TRIANGLE_HEIGHT = Math.sin(PI_3);

        
        const a = TRIANGLE_TOP[1] / TRIANGLE_TOP[0];
        const x = pos[1] / a;

        function mod(x, y) {
            return x - y * Math.floor(x/y);
        }
        
        const translatedX = mod(pos[0] - x, 1) + x;
        let xIndex = Math.floor(pos[0] - x);

        const yIndex = Math.floor(pos[1] / TRIANGLE_HEIGHT);

        let fundamentalPos = [translatedX - TRIANGLE_TOP[0] * yIndex,
                              pos[1] - TRIANGLE_TOP[1] * yIndex];

        xIndex *= 2.0;

        let isReversed = false;
        const prevReversed = fundamentalPos;
        
        fundamentalPos = [fundamentalPos[0] - plane3[0], fundamentalPos[1] - plane3[1]];
        const dplane = [fundamentalPos[0] * plane3[2] + fundamentalPos[1] * plane3[3]];
        if(dplane < 0.0) {
            xIndex++;
            isReversed = true;
        }
        fundamentalPos = [
            fundamentalPos[0] - 2.0 * Math.min(0, dplane) * plane3[2],
            fundamentalPos[1] - 2.0 * Math.min(0, dplane) * plane3[3]
        ];
        fundamentalPos = [
            fundamentalPos[0] + plane3[0],
            fundamentalPos[1] + plane3[1],
        ];

        console.log(xIndex, yIndex);
        
        if(0 <= xIndex && xIndex < SIZE[0] &&
           0 <= yIndex && yIndex < SIZE[1]) {
            const index = xIndex + yIndex * SIZE[0];
            console.log(index);
            if(event.button === 2) {
                tiles[index] = 0;
            } else if(isReversed) {
                if(prevReversed[1] < 0.5) {
                    if(tiles[index] === TILE_TOP_RIGHT) {
                        tiles[index] = TILE_BOTTOM_RIGHT;
                    } else {
                        tiles[index] = TILE_TOP_RIGHT;
                    }
                } else if (prevReversed[0] < 1.0) {
                    if(tiles[index] === TILE_TOP) {
                        tiles[index] = TILE_BOTTOM;
                    } else {
                        tiles[index] = TILE_TOP;
                    }
                } else {
                    if (tiles[index] === TILE_TOP_LEFT) {
                        tiles[index] = TILE_BOTTOM_LEFT;
                    } else {
                        tiles[index] = TILE_TOP_LEFT;
                    }
                }
            } else {
                if (fundamentalPos[1] > TRIANGLE_HEIGHT * 0.5) {
                    if(tiles[index] === TILE_TOP) {
                        tiles[index] = TILE_BOTTOM;
                    } else {
                        tiles[index] = TILE_TOP;
                    }
                } else if(fundamentalPos[0] < 0.5) {
                    if(tiles[index] === TILE_TOP_LEFT) {
                        tiles[index] = TILE_BOTTOM_LEFT;
                    } else {
                        tiles[index] = TILE_TOP_LEFT;
                    }
                } else if(fundamentalPos[0] > 0.5) {
                    if (tiles[index] === TILE_TOP_RIGHT) {
                        tiles[index] = TILE_BOTTOM_RIGHT;
                    } else {
                        tiles[index] = TILE_TOP_RIGHT;
                    }
                }
            }
            
        }
        //console.log(tiles);
        this.printTiles(tiles);
        this.render();
        
    }

    printTiles(tiles) {
        let str = `const int SIZE_X = ${SIZE[0]};\n`;
        str += `const int SIZE_Y = ${SIZE[1]};\n`;
        str += `const int OBJ_SIZE = ${SIZE[0] * SIZE[1]};\n`;
        str += `const int[${SIZE[0] * SIZE[1]}] tiles = int[](${tiles.join(', ')});`;
        console.log(str);
    }
    
    getUniformLocations() {
        this.uniLocations = [];
        this.uniLocations.push(this.gl.getUniformLocation(this.renderProgram,
                                                          'resolution'));
        this.uniLocations.push(this.gl.getUniformLocation(this.renderProgram,
                                                          'time'));
    }

    setUniformValues() {
        let i = 0;
        this.gl.uniform2f(this.uniLocations[i++], this.canvas.width, this.canvas.height);
        this.gl.uniform1f(this.uniLocations[i++], (new Date().getTime() - this.startTime)/1000 );

        for(let ai = 0; ai < SIZE[0] * SIZE[1]; ai++) {
            const loc = this.gl.getUniformLocation(this.renderProgram,
                                                   `tiles[${ai}]`);
            this.gl.uniform1i(loc, tiles[ai]);
        }
    }

    setUniformValuesWithTime(t) {
        let i = 0;
        this.gl.uniform2f(this.uniLocations[i++], this.canvas.width, this.canvas.height);
        this.gl.uniform1f(this.uniLocations[i++], t);
    }

    render() {
        this.setUniformValues();
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.useProgram(this.renderProgram);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.vertexAttribPointer(this.renderVAttrib, 2,
                                    this.gl.FLOAT, false, 0, 0);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        this.gl.flush();
    }

    renderWithTime(t) {
        this.setUniformValuesWithTime(t);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.useProgram(this.renderProgram);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.vertexAttribPointer(this.renderVAttrib, 2,
                                    this.gl.FLOAT, false, 0, 0);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        this.gl.flush();
    }
}
