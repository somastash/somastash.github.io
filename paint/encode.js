
/**
 * 現在のキャンバスのピクセル配列を文字列 (Base64) に変換する。
 */
function encodePixels() {
	loadPixels();
	let bin = '';
	for (let i = 0; i < pixels.length; i += 4) {
		let r = pixels[i];
		let g = pixels[i+1];
		let b = pixels[i+2];
		bin += String.fromCharCode(r);
		bin += String.fromCharCode(g);
		bin += String.fromCharCode(b);
	}
	return btoa(bin);
}

/**
 * 文字列をキャンバスのピクセル配列に戻す。
 */
function decodePixels(data) {
	loadPixels();
	let bin = atob(data);
	let j = 0;
	for (let i = 0; i < pixels.length; i += 4) {
		let r = bin.charCodeAt(j++);
		let g = bin.charCodeAt(j++);
		let b = bin.charCodeAt(j++);
		pixels[i]   = r;
		pixels[i+1] = g;
		pixels[i+2] = b;
		pixels[i+3] = 255;
	}
	updatePixels();
}

