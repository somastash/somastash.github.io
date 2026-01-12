let cnv;
let cStroke;
let cFill;

let shapes = [];
let currShape;

let mode = 'idle';

let iWidth, iHeight, iShape, iClear;

function setup() {
  cnv = createCanvas(400, 400);
  cStroke = color(0, 0, 0);
  cFill = color(255, 255, 255, 127);

  // canvas resizer
  iWidth = select('#width');
  iWidth.value(width);
  iWidth.changed(ev => {
    let w = parseInt(iWidth.value());
    if (!isNaN(w)) {
      w = constrain(ceil(w), 240, 1028);
      cnv.resize(w, height);
    }
    iWidth.value(width);
  });
  iHeight = select('#height');
  iHeight.value(height);
  iHeight.changed(ev => {
    let h = parseInt(iHeight.value());
    if (!isNaN(h)) {
      h = constrain(ceil(h), 240, 1028);
      cnv.resize(width, h);
    }
    iHeight.value(height);
  });

  iShape = select('#shapes');

  iClear = select('#clear');
  iClear.mousePressed(clearShapes);
}

function draw() {
  background(220);

  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    drawShape(shape);
  }
  if (currShape) drawShape(currShape, true);

  fill(0, 0, 0);
  noStroke();
  textAlign(RIGHT);
  text(`By Satoshi Soma (github.com/amekusa)`, width - 20, height - 20);
}

function drawShape(dots, isCurrent = false) {
  beginShape();
  for (let i = 0; i < dots.length; i++) {
    let [x, y] = dots[i];
    vertex(x, y);
    noStroke();
    fill(cStroke);
    circle(x, y, 5);
  }
  stroke(cStroke);
  fill(cFill);
  endShape(isCurrent ? undefined : CLOSE);
}

function mousePressed() {
  let offset = 20;
  let x = mouseX;
  let y = mouseY;
  if (
    x < -offset || x > width+offset ||
    y < -offset || y > height+offset
  ) return;

  x = constrain(x, 0, width);
  y = constrain(y, 0, height);

  switch (mode) {
  case 'idle':
    mode = 'shaping';
    currShape = [];
    break;
  }
  currShape.push([x, y]);
}

function keyTyped() {
  switch (key) {
  case 's':
    switch (mode) {
    case 'shaping':
      closeShape();
      break;
    }
    break;
  }
}

function closeShape() {
  mode = 'idle';
  shapes.push(currShape);
  currShape = undefined;
  updateTextarea();
}


function clearShapes() {
  mode = 'idle';
  shapes.length = 0;
  currShape = undefined;
  updateTextarea();
}

function updateTextarea() {
  let lines = [];
  lines.push(`[`);
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    lines.push(`  [`);
    for (let j = 0; j < shape.length; j++) {
      let [x, y] = shape[j];
      lines.push(`    {x:${x},y:${y}},`);
    }
    lines.push(`  ],`)
  }
  lines.push(`]`);
  iShape.value(lines.join('\n'));
}
