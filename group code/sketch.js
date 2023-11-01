let curves = [];
let colOffset = 0;
let moveSpeed = 0;
let moveOffset = 0;

function setup() {
  createCanvas(1280, 720);
  
  //background color
  let deeporange = color(163,44,12);
  let redorange = color(204,66,11);
  let midorange = color(212,89,20);
  let yelloworange = color(215,114,22);
  let backgreen = color(133,130,95);
  let backyellow = color(215,173,108);

  let blackblue = color(14,26,20);
  let deepblue = color(31,46,49);
  let midblue = color(49,83,85);
  let lightblue = color(97,125,129);

  //need more colour here
  //curve = new flat/highCurve(横向位移，color，y，振幅数字越大振幅越大, 周期宽度数字越小周期越长)；

  noStroke();
  //background orange
  curves[0] = new Curve(0,backyellow,0,0,0);
  curves[1] = new Curve(0,midorange,-110,130,0.05);
  curves[2] = new Curve(0,backgreen,15,70,0.08);
  curves[3] = new Curve(0,redorange,-20,70,0.05);
  curves[4] = new Curve(0,midorange,15,70,0.05);
  curves[5] = new Curve(0,backyellow,35,60,0.05);
  curves[6] = new Curve(4.9,redorange,55,110,0.06);
  curves[7] = new Curve(4.9,yelloworange,80,110,0.06);
  curves[8] = new Curve(4.8,deeporange,50,70,0.08);
  curves[9] = new Curve(4.8,redorange,65,70,0.08);
  curves[10] = new Curve(4.8,midorange,90,70,0.08);
  curves[11] = new Curve(4.8,yelloworange,105,70,0.08);
  
  //background black blue
  curves[12] = new Curve(0,deepblue,110,60,0.07);
  curves[13] = new Curve(2,midblue,170,80,0.06);
  curves[14] = new Curve(2,blackblue,200,70,0.06);
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
  constructor(start, fillColor, yOffset, amplitude, xIncrement) {
    this.start = start;
    this.time = 0;
    this.fillColor = fillColor;
    this.yOffset = yOffset;
    this.amplitude = amplitude;
    this.xIncrement = xIncrement;
  }

  display() {
    fill(
      this.fillColor.levels[0],
      this.fillColor.levels[1],
      this.fillColor.levels[2]
    );
    let xoff = moveOffset + this.start;
    let currentxIncrement = this.xIncrement;

    beginShape();
    for (let x = -width; x <= 2 * width; x += 10) {
      let y = map(sin(xoff), -1, 1, 0, this.amplitude);
      vertex(x, y + this.yOffset);
      xoff += currentxIncrement;
    }
    vertex(width, height + this.yOffset);
    vertex(0, height + this.yOffset);
    endShape(CLOSE);
  }
}
