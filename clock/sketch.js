// 天気のデータ
let data;

// 空の色スケール
let sky;

// 各曜日の名前の配列
let week = [
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat',
];

function setup() {
	createCanvas(windowWidth, windowHeight);

	// 空の画像読み込み
	loadImage('sky.png', newImg => {
		sky = newImg;
	});

	getData(); // 天気の取得開始
}

// ウィンドウのサイズが変わったら
function windowResized() {
	resizeCanvas(windowWidth, windowHeight); // キャンバスのサイズも変える
}

function draw() {
	let cx = width / 2;  // 中心の x
	let cy = height / 2; // 中心の y

	let date = new Date(); // Date オブジェクトを取得
	let year = date.getFullYear(); // 現在の西暦を取得
	let month = date.getMonth() + 1; // 現在の月
	let day = date.getDate(); // 現在の日
	let dow = date.getDay(); // 現在の曜日

	let h = date.getHours(); // 時
	let m = date.getMinutes(); // 分
	let s = date.getSeconds(); // 秒

	// 空の色
	if (sky) {
		let skyColor = sky.get(h * 10, 10);
		background(skyColor);
	}

	translate(0, -40); // キャンバスの位置をずらす
	textAlign(CENTER); // 中央寄せ
	textFont('Futura');
	textSize(30);
	textStyle(BOLD);
	text(year + '/' + month + '/' + day + ' (' + week[dow] + ')', cx, cy);
	text(h + ':' + m + ':' + s, cx, cy + 60);

	if (data) { // data が取得済みなら
		// 温度
		text(data.current.temperature_2m + ' °C', cx, cy + 100);
	}
}

// 天気情報を取得する
function getData() {
	loadJSON('https://api.open-meteo.com/v1/forecast?latitude=36.5667&longitude=139.8833&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,rain,weather_code&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,precipitation,rain,weather_code&timezone=Asia%2FTokyo&forecast_days=1', newData => {
		data = newData; // データ取得完了
		console.log(data);
	});
}
