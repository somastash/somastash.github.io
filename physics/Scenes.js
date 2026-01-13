/**
 * Scene Manager
 * @author Satoshi Soma (github.com/amekusa)
 */
export class Scenes {
  constructor() {
    this.map = new Map();
    this.curr;
    this.prev;
    this.next;
  }
  get current() {
    return this.curr ? this.curr.id : undefined;
  }
  add(scene) {
    scene = new Scene(scene);
    this.map.set(scene.id, scene);
  }
  setup(id, ...args) {
    if (this.curr) {
      this.curr.fin();
    }
    this.curr = this.map.get(id);
    this.curr.setup(...args);
  }
  draw(delta) {
    let next = this.curr.draw(delta);
    if (next) {
      if (typeof next == 'object') this.setup(next.id, ...next.args);
      else this.setup(next);
    }
  }
}

export class Scene {
  constructor(data) {
    let {
      id,
      setup = noop,
      draw = noop,
      fin = noop,
    } = data;
    this.id = id;
    this.ctx = {}; // context
    this._setup = setup.bind(this.ctx);
    this._draw = draw.bind(this.ctx);
    this._fin = fin.bind(this.ctx);
  }
  setup(...args) {
    return this._setup(...args);
  }
  draw(delta) {
    return this._draw(delta);
  }
  fin() {
    return this._fin();
  }
}

function noop() {}

