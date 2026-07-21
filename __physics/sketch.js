import { Fruit } from './Fruit.js'; // Fruit クラスを輸入する
import { ShapeStage } from './shapes.js'; // 形状データを輸入
import { drawBody, isOutOfBounds } from './util.js';

let {Engine, Bodies, Composite, Events} = Matter; // モジュールを変数化
let engine; // 物理エンジン

// 次に落ちる果物
let nextFruit = 'cherry';

// 効果音集
let se = {};
Fruit.se = se;

// シーン
let scene = 'title';

// 時間が進む速さ
let delta = 1000 / 60;

function setup() {
  createCanvas(400, 500);

  loadSound('./assets/merge.wav', data => {
    se.merge = data;
  });

  // 物理エンジン（世界）を初期化
  engine = Engine.create();

  // 箱を生成 (X, Y, 幅, 高さ)
  let stage = Bodies.fromVertices(200, 300, ShapeStage, { isStatic: true }); // ステージ

  // 箱を世界に配置
  Composite.add(engine.world, stage);

  // 物体同士が衝突した時、コールバックを実行させる
  Events.on(engine, 'collisionStart', ev => {
    for (let i = 0; i < ev.pairs.length; i++) {
      let pair = ev.pairs[i]; // 衝突したペア
      let a = pair.bodyA.parent; // 衝突物 A
      let b = pair.bodyB.parent; // 衝突物 B
      if (a.fruit) {
        // A が Fruit だったら
        a.fruit.hit(b, b.fruit);
      }
    }
  });
}

// 毎フレーム実行
function draw() {
  background(220);

  // 世界に配置された全ての物体を取得（配列）
  let bodies = Composite.allBodies(engine.world);

  // 全ての物体を描画（配列をスキャン）
  for (let i = 0; i < bodies.length; i++) {
    if (bodies[i].fruit) {
      bodies[i].fruit.draw();
      if (isOutOfBounds(bodies[i], 0, -50, width, height)) {
        // 物体が画面外に出たら
        scene = 'gameover'; // ゲームオーバー画面に移行
        delta = 1000 / (60 * 4);
      }
    } else drawBody(bodies[i]);
  }

  // 世界の更新（1 フレーム時間を進める）
  Engine.update(engine, delta);

  if (scene == 'title') { // タイトル画面だったら
    textAlign(CENTER);
    textSize(40);
    text(`Fruits Game`, 200, 200);

  } else if (scene == 'play') { // プレイ中だったら
    textAlign(LEFT);
    textSize(30);
    text('Next: ' + nextFruit, 20, 40);

  } else if (scene == 'gameover') { // ゲームオーバー画面だったら
    textAlign(CENTER);
    textSize(40);
    text('Game Over!', 200, 200);
  }
}

// クリックすると実行
function mousePressed() {
  if (scene == 'title') { // タイトル画面
    scene = 'play'; // プレイ画面

  } else if (scene == 'play') { // プレイ画面
    // Fruit インスタンスを生成
    new Fruit(nextFruit, mouseX, 0, engine.world);

    // 次に落とす果物を決める
    let choices = [
      'cherry',
      'berry',
      'grape',
    ];
    let choice = round(random(0, 2));
    nextFruit = choices[choice];

  } else if (scene == 'gameover') { // ゲームオーバー画面
    cleanStage();
    delta = 1000 / 60;
    scene = 'title';
  }
}

// フルーツだけ掃除する
function cleanStage() {
  let bodies = Composite.allBodies(engine.world);
  for (let i = 0; i < bodies.length; i++) {
    if (bodies[i].fruit) {
      Composite.remove(engine.world, bodies[i]);
    }
  }
}

// type="module" の場合は以下が必要
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
