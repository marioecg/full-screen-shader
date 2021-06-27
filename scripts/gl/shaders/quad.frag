precision highp float;

#define PI 3.1415926535897932384626433832795

uniform float uTime;

varying vec2 vUv;

#pragma glslify: noise = require(glsl-noise/simplex/3d) 

void main() {
  vec2 uv = vUv * 0.1;
  
  float t = uTime ;

  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(2.0, 1.0, 0.0);
  vec3 d = vec3(0.50, 0.20, 0.25);

  float n = noise(vec3(uv.x, uv.y, t));

  vec3 color = a + b * cos(2. * PI * (c * n + d));
  gl_FragColor = vec4(color, 1.);
}