let curves = [];
let colOffset = 0;
let moveSpeed = 0;
let moveOffset = 0;

function setup() {
  createCanvas(1280, 720);
  let colororange1 = color(199,69,18);//orange1
  let colororange2 = color(195, 96, 39);//orange2
  let colororange3 = color(209,122,53);//orange3
  let colororange4 = color(221,139,45);//orange4
  let colororange5 = color(207,104,27);//orange5
  let coloryellow1 = color(196,161,111);//lightyellow1
  let coloryellow2 = color(220,174,104);//lightyellow2
  let coloryellow3 = color(231,149,67);//yellow
  let colorgreen1 = color(106,128,107);//green1
  let colorblue1 = color(17,23,32);//blackblue
  let colorblue2 = color(35,64,67);//blue1
  
  //need more colour here
  //curve = new flat/highCurve(横向位移，color，y，振幅数字越大振幅越大, 周期宽度数字越小周期越长)；

  noStroke();
  curves[0] = new Curve(0,coloryellow1,0,0,0);
  curves[1] = new Curve(0,colororange2,-100,130,0.05);
  curves[2] = new Curve(0,colorgreen1,0,70,0.08);
  curves[3] = new Curve(0,colororange1,0,70,0.05);
  curves[4] = new Curve(0,colororange4,30,70,0.05);
  curves[5] = new Curve(0,coloryellow2,55,60,0.05);
  curves[6] = new Curve(0,colororange3,70,130,0.05);
  curves[7] = new Curve(0,colororange1,80,80,0.07);
  curves[8] = new Curve(0,colororange5,100,90,0.07);
  curves[9] = new Curve(0,coloryellow3,110,90,0.07);
  curves[10] = new Curve(0,colorblue1,120,90,0.07);
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
