/// <reference path="https://unpkg.com/@types/p5/global.d.ts" />

let qrData; // QRコードデータを入れる変数
let url;
let input; // 入力欄
let colorInput;
let bgInput;
let button;

function setup() {
	createCanvas(400, 400);
	frameRate(15);
	input = select('#url'); // HTMLタグを取得する（id は url）
	colorInput = select('#color');
	bgInput = select('#bg');
  button = select('#save'); // 保存ボタンを取得
  button.mousePressed(saveQR); // （予約）ボタンを押すと saveQR を呼ぶ
}

function draw() {
	background(bgInput.value());

	// 入力欄の値を表示する
	textSize(20);
	//   text(colorInput.value(), 50, 350);

	let gap = 13;

	// QRコードの生成
	qrData = qr.encodeQR(input.value(), 'raw');

	noStroke();
	fill(colorInput.value()); // 塗りの色

  let w = gap * qrData.length; // 幅の px
  let h = w;                   // 高さの px

  // キャンバスの基準位置をずらす
  translate(200 - w/2 + gap/2, 200 - h/2 + gap/2);
	for (let y = 0; y < qrData.length; y++) {
		let line = qrData[y]; // y 番目の列
		for (let x = 0; x < line.length; x++) {
			let cell = line[x]; // 列の中の x 番目のセル
			if (cell) { // セルが true なら
				circle(x * gap, y * gap, gap); // セルを塗る
				// text(ceil(random(0, 9)), x * gap, y * gap);
			}

		}
	}
}

// QR コード画像として保存する
function saveQR() {
  saveCanvas('qr.png');
}
