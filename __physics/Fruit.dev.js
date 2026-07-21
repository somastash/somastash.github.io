import { drawBody, scaleShape } from './util.js';
import {
  ShapeApple,
  ShapePear,
  ShapeMelon,
} from './shapes.dev.js';

let { Engine, Bodies, Body, Composite } = Matter; // モジュールを変数化

class Fruit {
  constructor(type, x, y, world) {
    console.log('果物:' + type + 'ができました!!!!!');
    this.type = type; // 自分の果物タイプ
    this.data = data[type]; // 自分自身のデータ

    // 色
    this.color = color(this.data.color);

    // 合成済みか否か
    this.merged = false;

    // 物理的な実体を作成
    if (this.data.shape) {
      this.body = Bodies.fromVertices(x, y, this.data.shape);
    } else {
      this.body = Bodies.circle(x, y, this.data.size);
    }
    this.body.fruit = this;

    this.world = world; // 自分が属する世界
    Composite.add(world, this.body); // 実体を世界に置く
  }
  draw() { // 自分自身を描画する
    push();
    stroke(this.color);
    fill(this.color);
    drawBody(this.body);
    pop();
  }

  // 何かと衝突したときの処理
  hit(b, fruit) {
    if (fruit) {
      if (this.merged || fruit.merged) return;

      console.log('私は ' + this.type);
      console.log(fruit.type + ' とぶつかったよ！');


      // 相手も Fruit だったら
      if (this.type == fruit.type) {
        // 相手が同じ type だったら
        this.merged = true;
        fruit.merged = true;
        this.merge(b); // B と合体する
      }
    }
  }

  // 他の Fruit と合体する処理
  merge(b) {
    // A (自分) の中心点
    let ax = this.body.position.x;
    let ay = this.body.position.y;

    // B (相手) の中心点
    let bx = b.position.x;
    let by = b.position.y;

    // A から見た衝突位置
    let dx = (bx - ax) / 2;
    let dy = (by - ay) / 2;

    // 絶対衝突位置 (ここに進化先フルーツを生成)
    let x = ax + dx;
    let y = ay + dy;

    // 自分自身を消す
    Composite.remove(this.world, this.body);

    // 相手も消す
    Composite.remove(this.world, b);

    // 進化先の type
    let nextType = data[this.type].next;

    // 進化先が存在したら
    if (data[nextType]) {
      // 新しい Fruit を生成
      new Fruit(nextType, x, y, this.world);
    }

    if (Fruit.se.pon) Fruit.se.pon.play();

  }
}

Fruit.se = {};

let data = {
  cherry: {
    color: '#aa1111',
    size:  10,
    next:  'berry',
  },
  berry: {
    color: 'crimson',
    size:  20,
    next:  'grape',
  },
  grape: {
    color: 'purple',
    next:  'orange',
    size:  30,
  },
  orange: {
    color: 'orange',
    size:  40,
    next:  'apple',
  },
  apple: {
    color: 'red',
    shape: scaleShape(ShapeApple, .7),
    next: 'pear',
  },
  pear: {
    color: '#ffffcc',
    shape: scaleShape(ShapePear, .6),
    next: 'melon',
  },
  melon: {
    color: '#88ffcc',
    shape: scaleShape(ShapeMelon, .8),
    next: 'suika',
  }

};

export { Fruit };
