import { drawBody, scaleShape } from './util.js';
import { Scenes } from './Scenes.js';
import { InputBuffer} from './InputBuffer.js';
import { Fruit } from './Fruit.dev.js'; // Fruit クラスを輸入する
import {
  ShapeStage,
} from './shapes.js';

let {Common, Engine, Bodies, Composite, Events} = Matter; // モジュールを変数化
// Common.setDecomp(decomp); // グローバルにあれば OK
let engine; // 物理エンジン
let delta = 1000 / 60; // 時間の進む速度

// 入力バッファ
let inputs = new InputBuffer(5, 3);

// 効果音集
let se = {};

// シーン管理者
let scenes = new Scenes();

// シーン:タイトル
scenes.add({
  id: 'title',
  setup() {
    this.x = 100;
  },
  draw() {
    let clicked = inputs.get('mousePressed');
    if (clicked) {
      return 'play';
    }
    text('Fruits Game', this.x, 200);
  }
});

// シーン:プレイ中
scenes.add({
  id: 'play',
  setup() {
  },
  draw() {
    let clicked = inputs.get('mousePressed');
    if (clicked) {
      // Fruit インスタンスを生成
      new Fruit('cherry', clicked[1], clicked[2], engine.world);
    }
    text('Playing...', 200, 200);
  }
});

// シーン:ゲームオーバー
scenes.add({
  id: 'gemeover',
  setup() {
    console.log('GAMEOVER SETUP');
  },
  draw() {
    text('Game Over', 200, 200);
  }
});

function setup() {
  createCanvas(400, 640);

  scenes.setup('title');

  loadSound('./assets/merge.wav', data => {
    se.merge = data;
    Fruit.se.pon = data;
  });

  // 物理エンジン（世界）を初期化
  engine = Engine.create();

  // 箱を生成 (X, Y, 幅, 高さ)
  let ground = Bodies.fromVertices(200, 400, scaleShape(ShapeStage, 1.5), {isStatic: true});

  // 箱を世界に配置
  // Composite.add(engine.world, [boxA, boxB, ground]);
  Composite.add(engine.world, [ground]);

  // 物体同士が衝突した時、コールバックを実行させる
  Events.on(engine, 'collisionStart', ev => {
    for (let i = 0; i < ev.pairs.length; i++) {
      let pair = ev.pairs[i]; // 衝突したペア
      let a = pair.bodyA.parent; // 衝突物 A
      let b = pair.bodyB.parent; // 衝突物 B
      if (a === b) continue;
      if (a.fruit) {
        // A が Fruit だったら
        a.fruit.hit(b, b.fruit);
      }
    }
  });
}

function draw() {
  background(220);

  // 世界に配置された全ての物体を取得（配列）
  let bodies = Composite.allBodies(engine.world);

  // 全ての物体を描画（配列をスキャン）
  for (let i = 0; i < bodies.length; i++) {
    if (bodies[i].fruit) bodies[i].fruit.draw();
    else drawBody(bodies[i]);
  }

  // 世界の更新（1 フレーム時間を進める）
  Engine.update(engine, delta);

  // 現在のシーンの更新
  scenes.draw(delta);

  // 入力バッファをクリア
  inputs.clear();
}

// クリックすると実行
function mousePressed() {
  // 入力バッファに追加
  inputs.add('mousePressed', mouseX, mouseY);
}

// type="module" の場合は以下が必要
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
