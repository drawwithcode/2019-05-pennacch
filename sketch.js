circleDimension = 10;
xA = 300;
yA = 0;
inclination = 0;
speed = 20;
var speedX;
var speedY;
numberOfCircles = 300;
allTheCircles = [];
var circles;
var currentCircle;
var onVar = true;

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn();
  mic.start();

  for (var i = 0; i < 10000; i++) {
    circles = new createRain(random() * width, -1000 + random() * 2000, 1 + random() * 3);
    allTheCircles.push(circles)
  }



}

function draw() {

  micLevel = mic.getLevel();
  var col1 = color(0);
  var col2 = color(255)
  bkgCol = lerpColor(col1, col2, micLevel * 5);
  background(bkgCol);




  for (var i = 0; i < numberOfCircles; i++) {
    currentCircle = allTheCircles[i];

    inclination = map(mouseX, 0, width, -speed, speed);
    speedX = inclination;
    speedY = random()
    speedY = map(speedY, 0, 1, speed - (speed / 7), speed + (speed / 7))

    //--------------------
    if (currentCircle.y > height) {
      x = random();
      x = map(x, 0, 1, -500, width + 500);
      currentCircle.x = x;
      y = random();
      y = map(y, 0, 1, 30, -300);
      currentCircle.y = y;
    }
    currentCircle.move();
    currentCircle.display();


  }


  //----INSTRUCTION SECTION---------------------
  var myText = "A rainy sunday";
  var mySecondLine = "*move mouse to change the direction of the wind";
  var myThirdLine = "*click and make noise to create lightnings";
  var myFourthLine = "*up & down arrows to change the speed of the rain";
  var myFifthLine = "*left & right arrows to change the intensity of the rain"
  var mySixthLine = "- spacebar to toggle these instructions -"



  textFont("Patrick Hand");
  textAlign(CENTER);
  textSize(50);
  fill(255);
  if (frameCount < 127) {
    fill(255, 255, 255, frameCount * 2)
  }
  if (frameCount > 128) {
    if (onVar == true) {
      fill(255)
    } else if (onVar == false) {
      fill(255, 255, 255, 0)
    }
  }
  text(myText, width / 2, height / 2);
  textSize(30);
  text(mySecondLine, width / 2, height / 2 + 40);
  text(myThirdLine, width / 2, height / 2 + 75);
  text(myFourthLine, width / 2, height / 2 + 110);
  text(myFifthLine, width / 2, height / 2 + 145);
  text(mySixthLine, width / 2, height / 2 + 180);





}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    speed += 5;
  } else if (keyCode === DOWN_ARROW) {
    speed -= 5;
  }
  if (keyCode === LEFT_ARROW) {
    numberOfCircles -= 100;
  } else if (keyCode === RIGHT_ARROW) {
    numberOfCircles += 100;
  }
  if (keyCode === 32 && onVar == false) {
    onVar = true;
  } else if (keyCode === 32 && onVar == true) {
    onVar = false;
    console.log(onVar);
  }


}

function createRain(_x, _y, _width) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.move = function() {
    this.x += speedX;
    this.y += speedY;
  }
  this.display = function() {
    noStroke();
    fill("teal");
    circle(this.x, this.y, this.width);
  }

}
