import { Scene } from './Scene.js';

export class SceneGameOver extends Scene {
  setup() {

  }
  draw() {
    textSize(30);
    textAlign(CENTER);
    text('Game Over', 200, 200);
  }
}

