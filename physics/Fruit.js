let { Engine, Bodies, Composite } = Matter; // モジュールを変数化

class Fruit {
  constructor(type, x, y, world) {
    console.log('果物:' + type + 'ができました!!!!!');
    this.type = type; // 自分の果物タイプ
    this.data = data[type]; // 自分自身のデータ
    this.body = Bodies.circle(x, y, this.data.size); // 物理的な実体
    this.body.fruit = this;
    this.world = world; // 自分が属する世界
    Composite.add(world, this.body); // 実体を世界に置く
  }
  draw() { // 自分自身を描画する
    push();
    fill(this.data.color);
    let v = this.body.vertices; // 物体の頂点（配列）
    beginShape(); // 多角形描画開始
    for (let i = 0; i < v.length; i++) {
      vertex(v[i].x, v[i].y);
    }
    endShape(CLOSE); // 多角形描画終了
    pop();
  }

  // 何かと衝突したときの処理
  hit(b, fruit) {
    if (fruit) {
      console.log('私は ' + this.type);
      console.log(fruit.type + ' とぶつかったよ！');

      // 相手も Fruit だったら
      if (this.type == fruit.type) {
        // 相手が同じ type だったら
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

};

export { Fruit };
