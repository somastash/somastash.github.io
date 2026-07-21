// Clock

// 最初の処理
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// フレーム毎の処理
function draw() {
  background(220);

  fill(0, 0, 0);
  textFont('Georgia');
  textSize(50);
  textAlign(CENTER); // テキストを中央揃えに
  text("12:35", width / 2, height / 2);

  noFill();
  circle(width / 2, height / 2, 400);
}

// ウィンドウのサイズが変わったら、キャンバスサイズ更新
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
