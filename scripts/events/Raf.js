import gsap from 'gsap';
import Emitter from './Emitter';

class Raf {
  constructor() {
    this.tick = this.tick.bind(this);

    this.init();
  }

  tick(time, delta) {
    Emitter.emit('tick', { time, delta });
  }

  on() {
    gsap.ticker.add(this.tick);
  }

  init() {
    this.on();
  }
}

export default new Raf();