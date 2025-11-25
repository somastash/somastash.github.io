// 天気のデータ
let data;

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

async function preload() {
	getData();
}

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);

	let date = new Date(); // Date オブジェクトを取得
	let year = date.getFullYear(); // 現在の西暦を取得
	let month = date.getMonth() + 1; // 現在の月
	let day = date.getDate(); // 現在の日
	let dow = date.getDay(); // 現在の曜日

	let h = date.getHours(); // 時
	let m = date.getMinutes(); // 分
	let s = date.getSeconds(); // 秒

	translate(0, -40); // キャンバスの位置をずらす
	textAlign(CENTER); // 中央寄せ
	textFont('Futura');
	textSize(30);
	textStyle(BOLD);
	text(year + '/' + month + '/' + day + ' (' + week[dow] + ')', 200, 200);
	text(h + ':' + m + ':' + s, 200, 260);

	// 温度
	text(data.current.temperature_2m + ' °C', 200, 300);
}

// 天気情報を取得する
async function getData() {
	data = await loadJSON('https://api.open-meteo.com/v1/forecast?latitude=36.5667&longitude=139.8833&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,rain,weather_code&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,precipitation,rain,weather_code&timezone=Asia%2FTokyo&forecast_days=1');
	console.log(data);
}
