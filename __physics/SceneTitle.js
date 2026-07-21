import { Scene } from './Scene.js';

export class SceneTitle extends Scene {
  setup() {

  }
  draw() {
    textSize(30);
    textAlign(CENTER);
    text('Fruits Game');
  }
}

