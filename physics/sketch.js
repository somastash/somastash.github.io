import { Fruit } from './Fruit.js'; // Fruit クラスを輸入する

let {Engine, Bodies, Composite, Events} = Matter; // モジュールを変数化
let engine; // 物理エンジン

// 効果音集
let se = {};

function setup() {
  createCanvas(400, 400);

  // loadSound('./pon.wav', data => {
  //   se.pon = data;
  //   Fruit.se.pon = data;
  // });

  // 物理エンジン（世界）を初期化
  engine = Engine.create();

  // 箱を生成 (X, Y, 幅, 高さ)
  let boxA   = Bodies.rectangle(150, 200, 120, 120); // 箱（大）
  let boxB   = Bodies.rectangle(200,   0,  80,  80); // 箱（小）
  let ground = Bodies.rectangle(200, 350, 380,  50, { isStatic: true }); // 地面

  // 箱を世界に配置
  Composite.add(engine.world, [boxA, boxB, ground]);

  // 物体同士が衝突した時、コールバックを実行させる
  Events.on(engine, 'collisionStart', ev => {
    for (let i = 0; i < ev.pairs.length; i++) {
      let pair = ev.pairs[i]; // 衝突したペア
      let a = pair.bodyA; // 衝突物 A
      let b = pair.bodyB; // 衝突物 B
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
  Engine.update(engine, deltaTime);
}

// 自作関数: 引数で渡された物体を描画する
function drawBody(body) {
  let v = body.vertices; // 物体の頂点（配列）
  beginShape(); // 多角形描画開始
  for (let i = 0; i < v.length; i++) {
    vertex(v[i].x, v[i].y);
  }
  endShape(CLOSE); // 多角形描画終了
}

// クリックすると実行
function mousePressed() {
  // Fruit インスタンスを生成
  new Fruit('cherry', mouseX, mouseY, engine.world);
}

// type="module" の場合は以下が必要
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
