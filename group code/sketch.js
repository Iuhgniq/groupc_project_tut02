let curves = [];
let colOffset = 0;
let moveSpeed = 0;
let moveOffset = 0;

function setup() {
  createCanvas(1280, 720);
  let col1 = color(255, 165, 0);
  let col2 = color(255, 255, 0);
  //need more colour here
  noStroke();
  curves[0] = new Curve(0, col1, 0, 30);
  curves[1] = new Curve(0.1, col2, 50, 40);
  curves[2] = new Curve(-0.1, col1, 60, 30);
  curves[3] = new Curve(0.4, col2, 80, 60);
  // Add more curves here
}


function draw() {
  background(220);
  moveOffset += moveSpeed;

  for (let i = 0; i < curves.length; i++) {
    curves[i].display();
  }

  for (let xoff1 = 1200; xoff1 < width * 1.2; xoff1 += 50) {
    let v = map(xoff1, 1200, width * 1.2, 0, 255);
    fill(v, colOffset % 255, 200 - v);
    curve1(xoff1);
  }
}

//this is the side curve
function curve1(offset) {
  beginShape();
  for (let y = height / 2; y < height * 1.1; y += 10) {
    vertex(offset + 200 * sin(y * 0.01 - PI / 6), y);
  }
  vertex(width * 3.5 + offset, height * 1.1);
  vertex(width * 3.5 + offset, height / 2);
  endShape(CLOSE);
}

//this is the class of the curve
class Curve {
  constructor(start, fillColor, yOffset, amplitude) {
    this.start = start;
    this.time = 0;
    this.fillColor = fillColor;
    this.yOffset = yOffset;
    this.amplitude = amplitude;
  }

  display() {
    fill(
      this.fillColor.levels[0],
      this.fillColor.levels[1],
      this.fillColor.levels[2]
    );
    let xoff = moveOffset + this.start;
    beginShape();
    for (let x = -width; x <= 2 * width; x += 10) {
      let y = map(sin(xoff), -1, 1, 0, this.amplitude);
      vertex(x, y + this.yOffset);
      xoff += 0.1;
    }
    vertex(width, height + this.yOffset);
    vertex(0, height + this.yOffset);
    endShape(CLOSE);
  }
}
