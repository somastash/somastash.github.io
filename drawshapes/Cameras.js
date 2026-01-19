export class Cameras {
	constructor(cams) {
		this._map = new Map();
	}
	add(key, def) {
		this._map.set(key, new Camera(def));
	}
	activate(key) {
	}
}

export class Camera {
	constructor(opts = {}) {
		let {
			x = 0,
			y = 0,
			zoom = 1,
			canvas = undefined,
		} = opts;
		this.pos = [x, y];
		this.zoom = zoom;
		this._cnv = canvas;
	}
	get x() {
		return this.pos[0];
	}
	set x(value) {
		this.pos[0] = value;
	}
	get y() {
		return this.pos[1];
	}
	set y(value) {
		this.pos[1] = value;
	}
	get width() {
		return this._cnv ? this._cnv.width : width;
	}
	get height() {
		return this._cnv ? this._cnv.height : height;
	}
	set() {
		resetMatrix();
		translate(this.width / 2, this.height / 2);
		scale(this.zoom);
		translate(-this.pos[0], -this.pos[1]);
	}
	unset() {
		resetMatrix();
	}
	/**
	 * 1. subtract camera position
	 * 2. multiply by zoom
	 * 3. add screen center
	 */
	worldToScreen(x, y) {
		return [this.worldToScreenX(x), this.worldToScreenY(y)];
	}
	worldToScreenX(x) {
		return (x - this.pos[0]) * this.zoom + this.width / 2;
	}
	worldToScreenY(y) {
		return (y - this.pos[1]) * this.zoom + this.height / 2;
	}
	/**
	 * 1. subtract screen center
	 * 2. divide by zoom
	 * 3. add camera position
	 */
	screenToWorld(x, y) {
		return [this.screenToWorldX(x), this.screenToWorldY(y)];
	}
	screenToWorldX(x) {
		return (x - this.width / 2) / this.zoom + this.pos[0];
	}
	screenToWorldY(y) {
		return (y - this.height / 2) / this.zoom + this.pos[1];
	}
}
