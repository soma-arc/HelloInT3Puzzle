#version 300 es
precision mediump float;

in vec2 v_texCoord;
uniform vec2 resolution;
uniform float time;

const int SIZE_X = 40;
const int SIZE_Y = 12;
const int OBJ_SIZE = SIZE_X * SIZE_Y;
const int[OBJ_SIZE] tiles = int[](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 5, 1, 4, 1, 4, 1, 4, 1, 4, 1, 1, 0, 0, 0, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 6, 1, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 5, 6, 6, 5, 0, 0, 0, 3, 2, 4, 4, 1, 4, 1, 4, 1, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 5, 6, 6, 5, 0, 0, 0, 0, 0, 3, 2, 2, 6, 2, 3, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 3, 2, 4, 4, 6, 6, 5, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 5, 1, 4, 1, 4, 6, 3, 4, 4, 1, 4, 1, 1, 0, 0, 3, 2, 6, 6, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 3, 4, 4, 1, 4, 1, 4, 1, 1, 3, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 5, 0, 0, 0, 3, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 3, 2, 3, 2, 3, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

//uniform int[OBJ_SIZE] tiles;

const int SIZE_16MS_X = 45;
const int SIZE_16MS_Y = 12;
const int OBJ_SIZE_16MS = SIZE_16MS_X * SIZE_16MS_Y;
const int[OBJ_SIZE_16MS] tiles16ms = int[](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1, 0, 0, 0, 5, 1, 4, 1, 4, 1, 4, 1, 1, 0, 0, 0, 5, 1, 1, 0, 5, 1, 1, 0, 5, 1, 1, 0, 5, 1, 4, 1, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 4, 1, 0, 0, 3, 2, 4, 1, 3, 2, 4, 1, 3, 2, 4, 1, 3, 3, 5, 0, 0, 0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 4, 1, 0, 0, 3, 2, 4, 1, 3, 2, 4, 1, 3, 2, 4, 1, 0, 2, 2, 3, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 4, 1, 0, 0, 3, 2, 4, 1, 3, 2, 4, 1, 3, 6, 4, 1, 3, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 4, 1, 4, 1, 6, 5, 0, 0, 0, 3, 2, 2, 6, 2, 3, 2, 3, 2, 3, 5, 0, 3, 3, 2, 3, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 5, 1, 1, 0, 0, 3, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 3, 2, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 4, 1, 4, 6, 6, 4, 1, 0, 0, 3, 2, 4, 4, 1, 4, 6, 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 3, 2, 3, 2, 3, 5, 0, 0, 0, 3, 3, 2, 3, 2, 3, 2, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

const int TILE_NONE = 0;
const int TILE_TOP = 1;
const int TILE_BOTTOM = 2;
const int TILE_TOP_RIGHT = 3;
const int TILE_BOTTOM_RIGHT = 4;
const int TILE_TOP_LEFT = 5;
const int TILE_BOTTOM_LEFT = 6;

const float PI = 3.14159265359;
const float PI_2 = PI * 0.5;
const float PI_3 = PI / 3.0;

const vec2 TRIANGLE_LEFT = vec2(0);
const vec2 TRIANGLE_RIGHT = vec2(1, 0);
const vec2 TRIANGLE_TOP = vec2(cos(PI_3), sin(PI_3));
const vec2 TRIANGLE_CENTER = (TRIANGLE_LEFT + TRIANGLE_RIGHT + TRIANGLE_TOP) / vec2(3);
const float TRIANGLE_HEIGHT = sin(PI_3);
const float TRIANGLE_EDGE_LENGTH = 1.0;

const mat2 ROT_120 = mat2(cos(2. * PI_3), -sin(2. * PI_3),
                          sin(2. * PI_3), cos(2. * PI_3));
const mat2 ROT_120_REV = mat2(cos(2. * -PI_3), -sin(2. * -PI_3),
                              sin(2. * -PI_3), cos(2. * -PI_3));

//w: start time
//s: duration
float scene(in float t, in float w, in float s){
    return clamp(t - w, 0.0, s) / s;  
}

float expEasingIn(float t){
    return pow( 2., 13. * (t - 1.) );
}
float expEasingOut(float t) {
	return -pow( 2., -10. * t) + 1.;
}

float circEasingInOut(float t){
	t /= .5;
	if (t < 1.) return -.5 * (sqrt(1. - t*t) - 1.);
	t -= 2.;
	return .5 * (sqrt(1. - t*t) + 1.);
}

float circEasingIn(float t){
	return -  (sqrt(1. - t*t) - 1.);
}

vec3 computeColor(const int tileType, vec2 p, const vec3 backgroundColor,
                  const vec3 tileTopColor, const vec3 tileBottomColor) {
    if(tileType == TILE_NONE) {
        return backgroundColor;
    } else if(tileType == TILE_TOP) {
        if(p.y > TRIANGLE_HEIGHT * 0.5) {
            return tileTopColor;
        }
        return tileBottomColor;
    } else if(tileType == TILE_BOTTOM) {
        if(p.y <= TRIANGLE_HEIGHT * 0.5) {
            return tileTopColor;
        }
        return tileBottomColor;
    } else if(tileType == TILE_TOP_RIGHT) {
        vec2 np = ROT_120_REV * (p - TRIANGLE_CENTER) + TRIANGLE_CENTER;
        if(np.y > TRIANGLE_HEIGHT * 0.5) {
            return tileTopColor;
        }
        return tileBottomColor;
    } else if(tileType == TILE_BOTTOM_RIGHT) {
        vec2 np = ROT_120_REV * (p - TRIANGLE_CENTER) + TRIANGLE_CENTER;
        if(np.y <= TRIANGLE_HEIGHT * 0.5) {
            return tileTopColor;
        }
        return tileBottomColor;
    } else if(tileType == TILE_TOP_LEFT) {
        vec2 np = ROT_120 * (p - TRIANGLE_CENTER) + TRIANGLE_CENTER;
        if(np.y > TRIANGLE_HEIGHT * 0.5) {
            return tileTopColor;
        }
        return tileBottomColor;
    } else if(tileType == TILE_BOTTOM_LEFT) {
        vec2 np = ROT_120 * (p - TRIANGLE_CENTER) + TRIANGLE_CENTER;
        if(np.y <= TRIANGLE_HEIGHT * 0.5) {
            return tileTopColor;
        }
        return tileBottomColor;
    }
    return backgroundColor;
}

//vec2 rand2n(vec2 co, float sampleIndex);

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

int g_currentLine = 90;
int getTile(const int x, const int y) {
    const int translateX = 0;
    const int translateY = 0;
    //a[0] = int(mod(time * 5., 7.));

    if(x - translateX * 2 < 0 || SIZE_X <= x - translateX * 2 ||
       y - translateY < 0 || SIZE_Y <= y - translateY) {
        //return TILE_NONE;
        if(g_currentLine < x) {
            return int(mod(time * 5. + floor(random(vec2(x, y)) * 10.0), 7.0));
        } else {
            return TILE_NONE;
        }
    }
    int index = (x - translateX * 2) + (y - translateY) * SIZE_X;
    if(0 <= index && index < OBJ_SIZE) {
        //return int(random(vec2(float(x) + time, float(y) - time)) * 7.);//a[index];
        //return a[index];
        // if(tiles[index] == TILE_NONE) {
        //     return TILE_NONE;
        // }
        if(g_currentLine < x) {
            return tiles[index] + int(mod(time * 5. + floor(random(vec2(x, y)) * 10.0), 7.0));
        } else {
            return tiles[index];
        }
        
    }
    return TILE_NONE;
}

int getTileRandom(const int x, const int y) {
    const int translateX = 0;
    const int translateY = 0;
    //a[0] = int(mod(time * 5., 7.));

    if(x - translateX * 2 < 0 || SIZE_X <= x - translateX * 2 ||
       y - translateY < 0 || SIZE_Y <= y - translateY) {
        //return TILE_NONE;
        return TILE_NONE;
    }

    int index = (x - translateX * 2) + (y - translateY) * SIZE_X;
    if((0 <= index && index < OBJ_SIZE)) {
        if(tiles[index] != TILE_NONE) {
            for(int xx = -1 ; xx <= 1; xx++) {
                for(int yy = -1 ; yy <= 1; yy++) {
                    int ii = (x + xx - translateX * 2) + (y + yy - translateY) * SIZE_X;
                    if((0 <= ii && ii < OBJ_SIZE)) {
                        //return tiles[index] + int(mod(time * 5. + floor(random(vec2(x, y)) * 10.0), 7.0));
                        return int(mod(float(tiles[ii]) + (time * 5. + (random(vec2(x + xx, y + yy)) * 10.0)), 7.));
                    }
                }
            }
        }
    }
    return TILE_NONE;
}

int getTileRandom2(const int x, const int y) {
    const int translateX = 0;
    const int translateY = 0;
    //a[0] = int(mod(time * 5., 7.));

    if(x - translateX * 2 < 0 || SIZE_X <= x - translateX * 2 ||
       y - translateY < 0 || SIZE_Y <= y - translateY) {
        //return TILE_NONE;
        return TILE_NONE;
    }
    int index = (x - translateX * 2) + (y - translateY) * SIZE_X;
    if(0 <= index && index < OBJ_SIZE) {
        if(tiles[index] != TILE_NONE) {
            //return tiles[index] + int(mod(time * 5. + floor(random(vec2(x, y)) * 10.0), 7.0));
            return int(mod(float(tiles16ms[index]) + (time * 5. + (random(vec2(x, y)) * 10.0)), 7.));
        }
    }

    int index2 = (x - translateX * 2) + (y - translateY) * SIZE_16MS_X;
    if(0 <= index2 && index2 < OBJ_SIZE_16MS) {
        if(tiles16ms[index2] != TILE_NONE) {
            //return tiles16ms[index2] + int(mod(time * 5. + floor(random(vec2(x, y)) * 10.0), 7.0));
            return int(mod(float(tiles16ms[index2]) + (time * 5. + (random(vec2(x, y)) * 10.0)), 7.));
        }
    }
    
    return TILE_NONE;
}

int getTileRandom16ms(const int x, const int y) {
    const int translateX = 0;
    const int translateY = 0;
    //a[0] = int(mod(time * 5., 7.));

    if(x - translateX * 2 < 0 || SIZE_16MS_X <= x - translateX * 2 ||
       y - translateY < 0 || SIZE_16MS_Y <= y - translateY) {
        //return TILE_NONE;
        return TILE_NONE;
    }
    int index = (x - translateX * 2) + (y - translateY) * SIZE_16MS_X;
    if((0 <= index && index < OBJ_SIZE_16MS)) {
        if(tiles16ms[index] != TILE_NONE) {
            for(int xx = -1 ; xx <= 1; xx++) {
                for(int yy = -1 ; yy <= 1; yy++) {
                    int ii = (x + xx - translateX * 2) + (y + yy - translateY) * SIZE_16MS_X;
                    if((0 <= ii && ii < OBJ_SIZE_16MS)) {
                        return int(mod(float(tiles16ms[ii]) + (time * 5. + (random(vec2(x + xx, y + yy)) * 10.0)), 7.));
                    }
                }
            }
        }
    }
    return TILE_NONE;
}


int getTile16ms(const int x, const int y) {
    const int translateX = 0;
    const int translateY = 0;
    //a[0] = int(mod(time * 5., 7.));

    if(x - translateX * 2 < 0 || SIZE_16MS_X <= x - translateX * 2 ||
       y - translateY < 0 || SIZE_16MS_Y <= y - translateY) {
        //return TILE_NONE;
        if(g_currentLine < x) {
            return int(mod(time * 5. + floor(random(vec2(x, y)) * 10.0), 7.0));
        } else {
            return TILE_NONE;
        }
    }
    int index = (x - translateX * 2) + (y - translateY) * SIZE_16MS_X;
    if(0 <= index && index < OBJ_SIZE_16MS) {
        //return int(random(vec2(float(x) + time, float(y) - time)) * 7.);//a[index];
        //return a[index];
        // if(tiles[index] == TILE_NONE) {
        //     return TILE_NONE;
        // }
        if(g_currentLine < x) {
            return tiles16ms[index] + int(mod(time * 5. + floor(random(vec2(x, y)) * 10.0), 7.0));
        } else {
            return tiles16ms[index];
        }
        
    }
    return TILE_NONE;
}

// from Syntopia http://blog.hvidtfeldts.net/index.php/2015/01/path-tracing-3d-fractals/
vec2 rand2n(vec2 co, float sampleIndex) {
    vec2 seed = co * (sampleIndex + 1.0);
    seed+=vec2(-1,1);
    // implementation based on: lumina.sourceforge.net/Tutorials/Noise.html
    return vec2(fract(sin(dot(seed.xy ,vec2(12.9898,78.233))) * 43758.5453),
                fract(cos(dot(seed.xy ,vec2(4.898,7.23))) * 23421.631));
}

vec3 hsv2rgb(float h, float s, float v){
    vec3 c = vec3(h, s, v);
    const vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

const float DISPLAY_GAMMA_COEFF = 1. / 2.2;
vec4 gammaCorrect(vec4 rgba) {
    return vec4((min(pow(rgba.r, DISPLAY_GAMMA_COEFF), 1.)),
                (min(pow(rgba.g, DISPLAY_GAMMA_COEFF), 1.)),
                (min(pow(rgba.b, DISPLAY_GAMMA_COEFF), 1.)),
                rgba.a);
}

vec4 plane1 = vec4(0, 0, 0, 1); // (x, y, normalX, normalY)
vec4 plane2 = vec4(0, 0, sin(PI_3), -cos(PI_3));
vec4 plane3 = vec4(1, 0, -sin(2. * PI_3), cos(2. * PI_3));
int IIS(vec2 pos) {
    int invNum = 0;
    for (int i = 0; i < 1000; i++) {
        pos -= plane1.xy;
        float dHalfPlane1 = dot(pos, plane1.zw);
        if(dot(pos, plane1.zw) < 0. ) {
            invNum++;
            pos -= 2.0 * min(0., dHalfPlane1) * plane1.zw;
            pos += plane1.xy;
            continue;
        }
        pos += plane1.xy;

        pos -= plane2.xy;
        float dHalfPlane2 = dot(pos, plane2.zw);
        if(dot(pos, plane2.zw) < 0. ) {
            invNum++;
            pos -= 2.0 * min(0., dHalfPlane2) * plane2.zw;
            pos += plane2.xy;
            continue;
        }
        pos += plane2.xy;

        pos -= plane3.xy;
        float dHalfPlane3 = dot(pos, plane3.zw);
        if(dot(pos, plane3.zw) < 0. ) {
            invNum++;
            pos -= 2.0 * min(0., dHalfPlane3) * plane3.zw;
            pos += plane3.xy;
            continue;
        }
        pos += plane3.xy;
    }

    return invNum;
}

const float SAMPLE_NUM = 20.;
out vec4 fragColor;
void main(){
    vec3 sum = vec3(0);

    float ratio = resolution.x / resolution.y / 2.0;
    for(float i = 0. ; i < SAMPLE_NUM ; i++){
        vec2 pos = ((gl_FragCoord.xy + rand2n(gl_FragCoord.xy, i)) / resolution.yy ) - vec2(ratio, 0.5);
        pos *= 12.;
        pos += vec2(14, 5);
        
        float a = TRIANGLE_TOP.y / TRIANGLE_TOP.x;
        float x = pos.y / a;

        float translatedX = mod(pos.x - x, 1.) + x;
        float xIndex = floor(pos.x - x);

        float yIndex = floor(pos.y / TRIANGLE_HEIGHT);

        vec2 fundamentalPos = vec2(translatedX, pos.y) - TRIANGLE_TOP * yIndex;

        xIndex *= 2.0;

        fundamentalPos -= plane3.xy;
        float dplane = dot(fundamentalPos, normalize(plane3.zw));
        if(dplane < 0.) {
            xIndex++;
        }
        fundamentalPos -= 2.0 * min(0., dplane) * plane3.zw;
        fundamentalPos += plane3.xy;

        float t = mod(time, 19.);
        float strokeWeight = 3.;
        //float strokeWeight = 0.01;
        float startTime = 0.;
        float durations = 3.;
        strokeWeight = mix(2., 0., scene(t, startTime, durations));

        startTime += durations;

        durations = 8.;
        g_currentLine = int(mix(-15., 80., scene(t, startTime, durations)));
        startTime += durations;

        startTime += 3.;
        
        durations = 3.;
        strokeWeight += mix(0., 0.5, scene(t, startTime, durations));
        startTime += durations;
        if(abs(dot(fundamentalPos - plane1.xy, plane1.zw)) < strokeWeight ||
           abs(dot(fundamentalPos - plane2.xy, plane2.zw)) < strokeWeight ||
           abs(dot(fundamentalPos - plane3.xy, plane3.zw)) < strokeWeight) {
            continue;
        }

        if(t < 10.) {
            int tile = getTile(int(xIndex), int(yIndex));
            sum += computeColor(tile, fundamentalPos, vec3(0.4),
                                vec3(1, 0, 0), vec3(1));
        } else if(t < 10.5){
            g_currentLine = -15;
            int tile = getTileRandom(int(xIndex), int(yIndex));
            sum += computeColor(tile, fundamentalPos, vec3(0.4),
                                vec3(1, 0, 0), vec3(1));
            
        } else if(t < 11.){
            g_currentLine = -15;
            int tile = getTileRandom2(int(xIndex), int(yIndex));
            sum += computeColor(tile, fundamentalPos, vec3(0.4),
                                vec3(1, 0, 0), vec3(1));
        } else if(t < 11.5){
            g_currentLine = -15;
            int tile = getTileRandom16ms(int(xIndex), int(yIndex));
            sum += computeColor(tile, fundamentalPos, vec3(0.4),
                                vec3(1, 0, 0), vec3(1));
        } else {
            int tile = getTile16ms(int(xIndex), int(yIndex));
            sum += computeColor(tile, fundamentalPos, vec3(0.4),
                                vec3(1, 0, 0), vec3(1));
        }
    }
    vec3 col = (sum/SAMPLE_NUM);

    fragColor = gammaCorrect(vec4(col, 1.));
}
