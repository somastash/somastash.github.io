// Paint

let px; // 前のフレームの x
let py; // 前のフレームの y

let sw = 1; // 線の太さ

let inputColor;  // 色選択 UI
let inputWeight; // 太さ選択 UI
let btnClear;    // 消去ボタン
let btnSave;     // 保存ボタン

// 最初の処理
function setup() {
  createCanvas(400, 400);
  background(255);

  pixelDensity(1); // ピクセル深度 1

  let code = getItem('paint'); // 保存データをロード
  decodePixels(code); // データを復号化

  inputColor = select('#color');   // 色選択 UI を取得
  inputWeight = select('#weight'); // 太さ選択 UI を取得

  btnClear = select('#clear');     // 消去ボタンを取得
  btnClear.mousePressed(clearAll); // 消去関数の予約

  btnSave = select('#save');       // 保存ボタンを取得
  btnSave.mousePressed(saveImg);   // 保存関数の予約

  update();

}

// フレーム毎の処理
function draw() {
  // background(220);

  if ( keyIsPressed ) { // キーが押されていたら
    if ( key == 'f' ) { // F キーが押されていたら線を太くする
      sw += 2;
    } else if ( key == 'd' ) { // D キーが押されていたら線を細くする
      sw -= 2;
    }
  }

  sw = constrain(sw, 1, 100); // sw を 1 から 100 までの間で制限する

  stroke(inputColor.value());        // 線の色
  strokeWeight(sw); // 線の太さ

  if ( mouseIsPressed ) { // もしクリック中なら
    // 条件が true だったら実行
    // 前のフレームの位置から
    // 今のフレームの位置まで線を引く
    line(px, py, mouseX, mouseY)
    noStroke();
  }
  update();
}

// マウス座標を更新
function update() {
  px = mouseX;
  py = mouseY;
}

// 全消去の関数
function clearAll() {
  background(255); // 白で塗りつぶす
}

function saveImg() {
  saveCanvas('paint.png'); // キャンバス保存
}

function mouseReleased() {
  console.log('マウスを放しました。');
  let code = encodePixels(); // キャンバスを符号化
  console.log(code);
  storeItem('paint', code); // 符号化データをブラウザに保存
}
