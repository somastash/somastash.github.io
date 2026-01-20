// 引数で渡された物体を描画する
export function drawBody(body) {
  let parts = body.parts;
  if (parts.length > 1) { // 複数のパーツから構成される物体の場合
    // parts[0] は親パーツなので描画しない
    for (let i = 1; i < parts.length; i++) {
      drawShape(parts[i].vertices);
    }

  } else { // 単体の物体
    drawShape(body.vertices);
  }
}

// 引数で渡された形状を描画する
export function drawShape(vertices) {
  let v = vertices; // 物体の頂点（配列）
  beginShape(); // 多角形描画開始
  for (let i = 0; i < v.length; i++) {
    vertex(v[i].x, v[i].y);
  }
  endShape(CLOSE); // 多角形描画終了
}

// 引数で渡された形状を拡大/縮小する
export function scaleShape(shapes, times) {
  let r = new Array(shapes.length);
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    r[i] = new Array(shape.length);
    for (let j = 0; j < shape.length; j++) {
      let v = shape[j];
      r[i][j] = {x: v.x * times, y: v.y * times};
    }
  }
  return r;
}

// 物体が指定範囲外かどうかを判定する
export function isOutOfBounds(body, x, y, w, h) {
  let v = body.vertices;
  for (let i = 0; i < v.length; i++) {
    let vx = v[i].x;
    let vy = v[i].y;
    if (vx < x || vx > (x + w) || vy < y || vy > (y + h)) {
      return true;
    }
    return false;
  }
}

