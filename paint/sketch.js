// 1フレーム前のマウスの位置
let px = 0;
let py = 0;

let colorInput; // カラーピッカーを入れる変数
let dataInput; // テキストエリアを入れる変数

function setup() {
	createCanvas(512, 512);
	pixelDensity(1); // ピクセル深度
	background(255); // 背景白

	let data = getItem('paint');
	console.log('ロードしました', data);
	decodePixels(data);

	noFill();

	colorInput = select('#color'); // カラーピッカーを取得
	dataInput = select('#data'); // テキストエリアを取得
}

function draw() {
	strokeWeight(10); // 線の太さ

	// マウスボタンを押している間
	if (mouseIsPressed) {
		stroke(colorInput.value()); // 線の色を変える
		line(px, py, mouseX, mouseY);
		px = mouseX;
		py = mouseY;
	}
}

// クリックした瞬間に実行される関数
function mousePressed() {
	point(mouseX, mouseY);
	px = mouseX;
	py = mouseY;
}

// マウスボタンを放した時に実行される関数
function mouseReleased() {
	console.log('放しましたね？');
	let data = encodePixels(); // 絵を文字列に変換
	console.log(data);
	storeItem('paint', data); // 文字列を保存
}

function encodeInput() {
	console.log('エンコード！');
	let data = encodePixels(); // 絵を文字列に変換
	dataInput.value(data); // テキストエリアに文字列を入れる
}

function decodeInput() {
	console.log('デコード！');
	decodePixels(dataInput.value());
}
