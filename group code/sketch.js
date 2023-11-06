let curves = [];
let colOffset = 0;
let moveSpeed = 0;
let moveOffset = 0;
let ghostLayer;

function setup() {
  createCanvas(1280, 720);
  backgroundCurve();
  ghostLayer = createGraphics(width, height); // this ghostLayer object has referenced Chatgpt solution.
  drawGhostBodyWaves();
}

function draw() {
  background(220);
  noStroke();
  drawCurves();
  drawBridge();
  drawPerson1();
  drawPerson2();
  drawGhost();

  image(ghostLayer, 0, 0);

  // draw rains
  noStroke();
  fill(255);
  let x = random(width);
  let y = random(height);
  let w = 1;
  let h = 20;

  for(let i = 0; i < 800; i++) {
    ellipse(x, y, w, h);
  }
}

//draw the background curves and the side curve(set the color of it)
function drawCurves(){
  for (let i = 0; i < curves.length; i++) {
    curves[i].display();
  }
  for (let sidexoff = 1100; sidexoff < width * 1.3; sidexoff += 60) {
    let change = map(sidexoff, 1200, width * 1.2, 15, 50);
    fill(15, change + 10, change + 20);
    sideCurve(sidexoff);
  }
}

// set the background curves
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

  noStroke();
  //background orange curves
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
  
  //background black blue curves
  curves[12] = new Curve(0,deepblue,110,60,0.07);
  curves[13] = new Curve(2,midblue,170,80,0.06);
  curves[14] = new Curve(2,blackblue,200,70,0.06);
  curves[15] = new Curve(4,midblue,290,60,0.1);
  curves[16] = new Curve(3.5,blackblue,300,60,0.1);
  curves[17] = new Curve(2.4,midblue,370,60,0.1);
  curves[18] = new Curve(2.6,blackblue,380,60,0.1);
  curves[19] = new Curve(2.5,deepblue,400,60,0.1);
  curves[20] = new Curve(2,blackblue,420,70,0.1);
  curves[21] = new Curve(0,midblue,520,60,0.09);
  curves[22] = new Curve(0.5,blackblue,530,60,0.09);
}

//set the side curve
function sideCurve(offset) {
  beginShape();
  for (let y = height / 3; y < height * 3; y += 10) {
    vertex(offset + 200 * sin(y * 0.009 - PI / 6), y);
  }
  vertex(width * 4 + offset, height * 1.1);
  vertex(width * 4 + offset, height / 2);
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
    let xoff = this.start;
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
  fill(0);
  noStroke();
  ellipse(120, 150, 10, 9); // head
  ellipse(116, 147, 5, 4); // left part of the hat
  ellipse(124, 147, 7, 4);// right part of the hat
  ellipse(120, 168, 16, 33);// body
  
  // left arm 
  push(); 
  translate(117, 168); // Move the origin to the centre of arm ellipse
  rotate(radians(35)); // Apply the rotation
  ellipse(0, 0, 15, 24); // Draw the rotated ellipse
  pop();

  // right arm
  push();
  translate(122, 168);
  rotate(radians(135)); 
  ellipse(0, 0, 17, 15);
  pop();

  // left leg
  push();
  translate(118, 178);
  rotate(radians(10)); 
  ellipse(0, 0, 11, 42);
  pop(); 

  // right leg
  push();
  translate(121, 178);
  rotate(radians(-10)); 
  ellipse(0, 0, 11, 42);
  pop(); 
}

function drawPerson2() {
  fill(0);
  ellipse(142, 151, 9, 8); // head
  ellipse(142, 148, 16, 4); // hat bottom
  ellipse(142.5, 147, 7, 8); // hat top
  ellipse(142.5, 168, 15, 28); // body

  // left leg 1
  push(); 
  translate(140, 177); // move the origin to the centre of leg ellipse
  rotate(radians(5)); // apply the rotation
  ellipse(0, 0, 9, 33); // draw the rotated ellipse
  pop();

  // left leg 2
  push(); 
  translate(138, 190);
  rotate(radians(4)); 
  ellipse(0, 0, 7, 26);
  pop();

  // right leg 1
  push(); 
  translate(145, 177);
  rotate(radians(-5));
  ellipse(0, 0, 9, 33); 
  pop(); 

  // left leg 2
  push(); 
  translate(146, 190);
  rotate(radians(-3));
  ellipse(0, 0, 7, 26); 
  pop();   

  ellipse(137, 199, 8, 6); // left shoe
  ellipse(147, 199, 8, 6); // right shoe
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
  
}

// draw colour fills between every two curves on ghost body
function drawGhostBodyWaves() {
  let colours = [];
  let numWaves = 12;
  let spacing = 16;

  for (let i = 0; i < numWaves - 1; i++) {
    let waveWidth = i * spacing;
    let nextX = (i + 1) * spacing;
    let fillColor = color(random(70, 100), 70, 50); 
    colours.push(fillColor);
    drawGhostBody(waveWidth, 1030, 440, 500, fillColor, nextX, ghostLayer); 
  }
}

// draw curves of ghost body, by adding a new layer for the body
// This function references the code in chatgpt
function drawGhostBody(waveWidth, startX, startY, h, fillColor, nextX, ghostLayer) {
  let amplitude = 8;
  let frequency = 0.06;

  ghostLayer.noStroke();
  ghostLayer.fill(fillColor);

  ghostLayer.beginShape();
  // start point 
  ghostLayer.vertex(waveWidth, startY); 

  for (let i = 0; i <= h; i += 10) {
    let yOffset = i;
    let xOffset = sin(frequency * yOffset) * amplitude;
    ghostLayer.vertex(waveWidth + startX / 2 + xOffset, startY + yOffset);
  }

  ghostLayer.vertex(waveWidth + startX, startY + h); // end point
  ghostLayer.vertex(nextX + startX, startY + h); // connect to next curve
  for (let i = h; i >= 0; i -= 10) {
    let yOffset = i;
    let xOffset = sin(frequency * yOffset) * amplitude;
    ghostLayer.vertex(nextX + startX / 2 + xOffset, startY + yOffset);
  }

  ghostLayer.endShape(CLOSE);
}


  function drawBridge() {
    fill(120, 88, 24); 
    stroke(0);
    strokeWeight(3);

    // draw three horizontal railings on the left
    // quad1
    fill(70, 50, 10); 
    quad(73, 197, 0, 380, 0, 480, 80, 199);

    // quad2
    quad(69.5, 197, 0, 290, 0, 310, 82.5, 198.5);

    // quad3
    quad(60, 197, 0, 230, 0, 250, 72, 197);
  
    // the desk of the bridge
    fill(120, 88, 24);
    quad(82, 197, -68, 720, 477, 720, 147, 197);

     // shadows of right railings
    fill(0); 
    quad(147, 197, 477, 720, 597, 720, 154, 197);
    quad(157, 197, 667, 720, 797, 720, 162, 197);
    quad(167, 197, 947, 720, 1077, 720, 170, 197);

    // horizontal railings on the right
    fill(120, 88, 24); 
    quad(154, 197, 557, 720, 597, 720, 160, 197);
    quad(162, 197, 777, 720, 837, 720, 168, 197);
    quad(170, 197, 1037, 720, 1107, 720, 178, 197);

    // vertical railing on the left
    fill(70, 50, 10); 
    quad(20, 232, 20, 338, 30, 330, 30, 226);

    // vertical railings on the right
    fill(0); 
    quad(220, 232, 220, 290, 230, 302, 230, 238);
    quad(320, 288.5, 320, 420, 340, 440, 340, 305);
    quad(470, 380, 470, 620, 500, 650, 500, 400);
    quad(760, 560, 760, 720, 810, 720, 810, 590);
}