import { Renderer, Triangle, Program, Mesh } from 'ogl';

import vertexShader from './shaders/quad.vert';
import fragmentShader from './shaders/quad.frag';

import glsl from 'glslify';

import store from '@/store';
import { Events } from '@/events';
import { bindAll } from '@/utils';

export default class Gl {
  constructor() {
    this.renderer = new Renderer({
      width: store.bounds.ww,
      height: store.bounds.wh,
    });

    this.gl = this.renderer.gl;

    bindAll(this, 'resize', 'update');

    this.init();
  }

  init() {
    this.addToDom();
    this.createMesh();
    this.addEvents();
  }

  addToDom() {
    document.body.appendChild(this.gl.canvas);
  }

  createMesh() {
    // Rather than using a plane (two triangles) to cover the viewport here is a
    // triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
    // Excess will be out of the viewport.
    // https://github.com/oframe/ogl/blob/3a271343c4ccfdd830c2c8cf2e0b3648145b3175/examples/triangle-screen-shader.html#L58

    //         position                uv
    //      (-1, 3)                  (0, 2)
    //         |\                      |\
    //         |__\(1, 1)              |__\(1, 1)
    //         |__|_\                  |__|_\
    //   (-1, -1)   (3, -1)        (0, 0)   (2, 0)

    this.geometry = new Triangle(this.gl);

    this.program = new Program(this.gl, {
      vertex: glsl(vertexShader),
      fragment: glsl(fragmentShader),
      uniforms: {
        uTime: { value: 0 },
      },
    });
    
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry, 
      program: this.program
    });
  }

  addEvents() {
    Events.on('tick', this.update);
    Events.on('resize', this.resize);
  }

  update({ time }) {
    this.program.uniforms.uTime.value = time * 0.05;
    
    this.renderer.render({ scene: this.mesh });
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}