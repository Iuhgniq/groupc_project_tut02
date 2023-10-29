let curves = [];
let colOffset = 0;
let moveSpeed = 0;
let moveOffset = 0;

function setup() {
  createCanvas(1280, 720);
  let colororange1 = color(199,69,18);//orange1
  let colororange2 = color(195,95,55);//orange2
  let colororange3 = color(220,159,117);//orange3
  let colororange4 = color(221,139,45);//orange4
  let colororange5 = color(181,124,79);//orange5
  let colorgreen1 = color(106,128,107);//green1
  let colorblue1 = color(17,23,32);//blackblue
  let colorblue2 = color(35,64,67);//blue1
  let colorblue3 = color(54,83,90);//blue2
  let colorblue4 = color(97,126,129);//blue3
  let colorblue5 = color(22,43,62);//blue4
  
  //need more colour here
  //curve = new flat/highCurve(横向位移，color，y，振幅数字越大振幅越大, 周期宽度数字越小周期越长)；

  noStroke();
  curves[0] = new Curve(0.5, colororange1, 0, 50, 0.05);

  //curves[0] = new Curve(0, col1, 0, 30);
  //curves[1] = new Curve(0.1, col2, 50, 40);
  //curves[2] = new Curve(-0.1, col1, 60, 30);
  //curves[3] = new Curve(0.4, col2, 80, 60);

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
