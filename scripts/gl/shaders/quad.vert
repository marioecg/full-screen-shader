attribute vec2 uv;
attribute vec2 position;

uniform float uTime;

varying vec2 vUv;

void main() {
  vUv = uv;

  vec2 pos = position;
  
  gl_Position = vec4(pos, 0, 1);
}