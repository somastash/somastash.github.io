import {States} from './States.js';
import {Camera} from './Cameras.js';
import {keyCodes} from './keys.util.js';

let cnv;
let cStroke;
let cFill;

let shapes = [];

let mouse = [0, 0];
let cam = new Camera();
let iShapes;
let isOneline = false;

let modes = new States({
	$common: {
		showMode() {
			noStroke();
			fill(0, 0, 0);
			textAlign(RIGHT);
			text(`Mode: ${this.$curr.id.toUpperCase()}`, width - 20, 30);
		},
		controlCamera(spd = 5) {
			if (isKey('s')) {
				cam.pos[0] -= spd;
			} else if (isKey('f')) {
				cam.pos[0] += spd;
			}
			if (isKey('e')) {
				cam.pos[1] -= spd;
			} else if (isKey('d')) {
				cam.pos[1] += spd;
			}

			let zoomMin = .25;
			let zoomMax = 3;
			if (isKey('r')) {
				cam.zoom = min(cam.zoom + spd / 100, zoomMax);
			} else if (isKey('w')) {
				cam.zoom = max(cam.zoom - spd / 100, zoomMin);
			}
		},
		drawShapes() {
			for (let i = 0; i < shapes.length; i++) {
				let s = shapes[i];
				drawShape(s);
			}
		},
	},
	normal: {
		_createShape(x, y) {
			this.$goto('insert', x, y);
		},
		onMouse(ev) {
			let x = cam.screenToWorldX(mouse[0]);
			let y = cam.screenToWorldY(mouse[1]);
			switch (ev) {
			case 'pressed':
				this._createShape(x, y);
				break;
			}
		},
		draw() {
			this.controlCamera();
			cam.set();
			this.drawShapes();
			cam.unset();
			this.showMode();
		},
	},
	insert: {
		setup() {
			this._clear();
		},
		_clear() {
			this.openShape = [];
		},
		_add(x, y) {
			this.openShape.push(x, y);
		},
		_close() {
			if (!this.openShape.length) return;
			shapes.push(this.openShape);
			updateTextarea();
			this._clear();
		},
		onEnter(from, x, y) {
			this._add(x, y);
		},
		onLeave() {
			this._clear();
		},
		onMouse(ev) {
			let x = cam.screenToWorldX(mouse[0]);
			let y = cam.screenToWorldY(mouse[1]);
			switch (ev) {
			case 'pressed':
				this._add(x, y);
				break;
			}
		},
		onKey(ev, key) {
			switch (ev) {
			case 'typed':
				switch (key) {
				case 'g':
					this._close();
					break;
				}
				break;
			}
		},
		draw() {
			this.controlCamera();
			cam.set();
			this.drawShapes();
			drawShape(this.openShape, true);
			cam.unset();

			noStroke();
			fill(0, 0, 0);
			textAlign(LEFT);
			text(`G: close shape`, 20, 30);

			this.showMode();
		},
	},
});

function setup() {
	cnv = createCanvas(400, 400);

	cStroke = color(0, 0, 0);
	cFill = color(255, 255, 255, 127);

	iShapes = select('#shapes');

	select('#oneline').changed(ev => {
		isOneline = ev.target.checked;
		updateTextarea();
	});

	select('#reset-camera').mousePressed(ev => {
		resetCamera();
	});

	select('#clear').mousePressed(ev => {
		if (!confirm(`Clear all shapes?`)) return;
		clearShapes();
		resetCamera();
	});

	let iWidth = select('#width');
	iWidth.value(width);
	iWidth.changed(ev => {
		let w = parseInt(iWidth.value());
		if (!isNaN(w)) {
			w = constrain(ceil(w), 240, 1028);
			cnv.resize(w, height);
		}
		iWidth.value(width);
	});

	let iHeight = select('#height');
	iHeight.value(height);
	iHeight.changed(ev => {
		let h = parseInt(iHeight.value());
		if (!isNaN(h)) {
			h = constrain(ceil(h), 240, 1028);
			cnv.resize(width, h);
		}
		iHeight.value(height);
	});

	modes.setup();
}

function draw() {
	background(220);
	drawGrid();

	modes.curr.draw();
	modes.update();

	fill(0, 0, 0); noStroke();
	textAlign(RIGHT);
	text(`By Satoshi Soma (github.com/amekusa)`, width - 20, height - 20);
}

function drawGrid() {
	noFill();
	stroke(190);
	let x = cam.worldToScreenX(0);
	let y = cam.worldToScreenY(0);
	line(x, 0, x, height);
	line(0, y, width, y);
}

function drawShape(verts, isCurrent = false) {
	beginShape();
	for (let i = 0; i < verts.length; i += 2) {
		let x = verts[i];
		let y = verts[i+1];
		vertex(x, y);
		noStroke();
		fill(cStroke);
		circle(x, y, 5);
	}
	stroke(cStroke);
	fill(cFill);
	endShape(isCurrent ? undefined : CLOSE);
}

function updateMouse() {
	let margin = 15;
	let x = mouseX;
	let y = mouseY;
	if (x < -margin || x > width + margin || y < -margin || y > height + margin) return false; // off limits
	mouse[0] = constrain(x, 0, width);
	mouse[1] = constrain(y, 0, height);
	return mouse;
}

function mousePressed() {
	if (!updateMouse()) return;
	modes.curr.onMouse('pressed');
}

function keyTyped() {
	modes.curr.onKey('typed', key);
}

function isKey(name) {
	return keyIsDown(keyCodes[name]);
}

function resetCamera() {
	cam.pos[0] = 0;
	cam.pos[1] = 0;
	cam.zoom = 1;
}

function clearShapes() {
	modes.setNext('normal');
	shapes.length = 0;
	updateTextarea();
}

function shapesToText(shapes, opts = {}) {
	if (!shapes.length) return '';

	let {
		oneline = false,
	} = opts;

	let ind, sp, br;
	if (oneline) {
		ind = '';
		sp = '';
		br = '';
	} else {
		ind = '  ';
		sp = ' ';
		br = '\n';
	}

	let lines = [];
	lines.push(`[`);
	for (let i = 0; i < shapes.length; i++) {
		let verts = shapes[i];
		lines.push(`${ind}[`);
		for (let j = 0; j < verts.length; j += 2) {
			lines.push(`${ind}${ind}{${sp}x:${sp}${verts[j]},${sp}y:${sp}${verts[j+1]}${sp}},`);
		}
		lines.push(`${ind}],`)
	}
	lines.push(`]`);
	return lines.join(br);
}

function updateTextarea() {
	iShapes.value(shapesToText(shapes, {
		oneline: isOneline,
	}));
}

Object.assign(globalThis, {
	setup,
	draw,
	keyTyped,
	mousePressed,
});
