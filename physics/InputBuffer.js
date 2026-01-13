/**
 * Input Buffer
 * @author Satoshi Soma (github.com/amekusa)
 */
export class InputBuffer {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.nextRow = 0;
    this.buf = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.buf[i] = new Array(cols).fill(0);
    }
  }
  add(type, ...data) {
    if (this.nextRow >= this.rows) {
      console.error(`InputBuffer: row exceeded`);
      return;
    }
    let row = this.buf[this.nextRow];
    this.nextRow++;
    row[0] = typeCode[type];
    for (let i = 0; i < data.length; i++) {
      row[i+1] = data[i];
    }
  }
  clear() {
    for (let i = 0; i < this.rows; i++) {
      this.buf[i].fill(0);
    }
    this.nextRow = 0;
  }
  get(type) {
    type = typeCode[type];
    for (let i = 0; i < this.nextRow; i++) {
      if (this.buf[i][0] == type) return this.buf[i];
    }
  }
}

const types = [
  'mousePressed',
  'mouseReleased',
  'mouseClicked',
  'keyPressed',
  'keyReleased',
  'keyTyped',
];

const typeCode = {}
for (let i = 0; i < types.length; i++) {
  typeCode[types[i]] = i + 1;
}

