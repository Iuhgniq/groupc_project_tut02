let curves = [];
let colOffset = 0;
let moveSpeed = 0;
let moveOffset = 0;

function setup() {
  createCanvas(1280, 720);
  backgroundCurve();

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

  drawPerson1();
  drawPerson2();
  drawGhost();
}

// put all background curves together
function backgroundCurve() {
  //background color
  let deeporange = color(163,44,12);
  let redorange = color(204,66,11);
  let midorange = color(212,89,20);
  let yelloworange = color(215,114,22);
  let backgreen = color(133,130,95);
  let backyellow = color(215,173,108);

  let blackblue = color(9,25,35);
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

function drawPerson1() {
  fill(36, 39, 43);
  noStroke();
  ellipse(120, 150, 10, 9); // head
  ellipse(116, 147, 5, 4); // left part of the hate
  ellipse(124, 147, 7, 4);// right part of the hate
  ellipse(120, 168, 13, 30);// body
  
  // left arm 
  push(); 
  translate(117, 168); // Move the origin to the centre of arm ellipse
  rotate(radians(35)); // Apply the rotation
  ellipse(0, 0, 13, 22); // Draw the rotated ellipse
  pop();

  // right arm
  push();
  translate(122, 168);
  rotate(radians(135)); 
  ellipse(0, 0, 15, 14);
  pop();

  // left leg
  push();
  translate(118, 178);
  rotate(radians(10)); 
  ellipse(0, 0, 9, 30);
  pop(); 

  // right leg
  push();
  translate(121, 178);
  rotate(radians(-10)); 
  ellipse(0, 0, 9, 30);
  pop(); 
}

function drawPerson2() {
  fill(0);
  ellipse(142, 151, 9, 8); // head
  ellipse(142, 148, 16, 4); // hate bottom
  ellipse(142.5, 147, 7, 8); // hate top
  ellipse(142.5, 168, 15, 28); // body

  // left leg 1
  push(); 
  translate(140, 177); // move the origin to the centre of leg ellipse
  rotate(radians(5)); // apply the rotation
  ellipse(0, 0, 7, 30); // draw the rotated ellipse
  pop();

  // left leg 2
  push(); 
  translate(138, 190);
  rotate(radians(4)); 
  ellipse(0, 0, 6, 20);
  pop();

  // right leg 1
  push(); 
  translate(145, 177);
  rotate(radians(-5));
  ellipse(0, 0, 7, 30); 
  pop(); 

  // left leg 2
  push(); 
  translate(146, 190);
  rotate(radians(-3));
  ellipse(0, 0, 6, 20); 
  pop();   

  ellipse(137, 197, 6, 6); // left shoe
  ellipse(147, 197, 6, 6); // right shoe
}

function drawGhost() {
  // neck
  fill(199, 170, 113);
  noStroke();
  rect(592, 395, 40, 45);

  // head：large ellipse
  fill(217, 186, 124);
  noStroke();
  ellipse(610, 300, 143, 145);
  // small ellipse on the buttom
  ellipse(610, 374, 70, 68);

  // left eye
  fill(219, 204, 175);
  ellipse(580, 290, 35, 32);
  // right eye
  ellipse(640, 290, 35, 32);

  // left eyeball
  fill(0);
  ellipse(573, 286, 7, 6);
  // right eyeball
  ellipse(633, 288, 7, 6);

  // nose: two dots
  fill(0);
  ellipse(606, 316, 4, 3);
  ellipse(612, 315, 4, 3);

  // mouse
  stroke(150, 140, 122);
  strokeWeight(3);
  fill(240, 220, 185);

  push(); // make rotated ellipse
  translate(607, 362);
  rotate(radians(-13)); 
  ellipse(0, 0, 25, 42);
  pop();

  // t-shirt
  fill(87, 76, 56);
  noStroke();
  rect(528, 430, 160, 340, 32);

  // left arm

  // right arm


  // t-shirt corner

  

}


