var nowTime;
var targetTime;

var seconds = document.getElementById('seconds');
var minutes = document.getElementById('minutes');
var hours = document.getElementById('hours');
var days = document.getElementById('days');

var fireworks = [];
var gravity;

var buildings = [];
var trees = [];

/*
function setup() {
  //createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  background(20, 20, 20);
  setTime();
  gravity = createVector(0, GRAVITY);
  strokeWeight(3);
  setBuildings();
  setTrees();
  background(0);
  frameRate(FPS);
}


function draw() {
  if (secondsRemain >= 0) {
    showTime();
  } else {
    background(0, 0, 0);
    stroke(255);
    drawSea();
    drawBuildings();
    drawTrees();
    showFireworks();
  }
}
*/

function updateTimeLeft() {
  let nowTime = new Date();
  targetTime = new Date(
    TARGET_TIME.year,
    TARGET_TIME.month,
    TARGET_TIME.day,
    TARGET_TIME.hour,
    TARGET_TIME.minute,
    TARGET_TIME.second
  );

  let microsecRemain = targetTime - nowTime;
  let secondsRemain = Math.floor(microsecRemain / 1000);

  let daysRemain = Math.floor(secondsRemain / SECONDS_IN_DAY);
  let sec = secondsRemain % SECONDS_IN_DAY;

  let hoursRemain = Math.floor(sec / SECONDS_IN_HOUR);
  sec = sec % SECONDS_IN_HOUR;

  let minutesRemain = Math.floor(sec / SECONDS_IN_MINUTE);
  sec = sec % SECONDS_IN_MINUTE;

  days.innerHTML = daysRemain < 10 ? '0' + daysRemain : daysRemain;
  hours.innerHTML = hoursRemain < 10 ? '0' + hoursRemain : hoursRemain;
  minutes.innerHTML = minutesRemain < 10 ? '0' + minutesRemain : minutesRemain;
  seconds.innerHTML = sec < 10 ? '0' + sec : sec;
}

function showFireworks() {
  if (random(1) < DENSITY) {
    fireworks.push(new Firework(random(255), random(255), random(255)));
  }
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

function setBuildings() {
  for (var i = 0; i < 200; i++) {
    let w = random(10, 50);
    let h = random(10, 100);
    let hasRoof = random(1) < 0.3;
    let roofHeight = random(5, 10);
    buildings.push([(i * w) / 2, height - h - 20, w, h, hasRoof, roofHeight]);
  }
}

function setTrees() {
  for (var i = 0; i < 400; i++) {
    let w = random(2, 5);
    let h = random(5, 10);
    trees.push([(i * w) / 2, height - h - 20, w, h]);
  }
}

function drawTrees() {
  strokeWeight(0.5);
  fill(10, 240, 20);
  for (var t of trees) {
    ellipse(t[0], t[1], t[2], t[3]);
  }
}

function drawSea() {
  strokeWeight(0.5);
  fill(5, 50, 50);
  rect(0, height - 20, width, height - 20);
}

function drawBuildings() {
  strokeWeight(0.5);
  // stroke(10);
  fill(80);
  for (var b of buildings) {
    rect(b[0], b[1], b[2], b[3]);
  }
  // fill(240, 10, 20);
  // for (var b of buildings) {
  // 	if (b[4]){
  // 		triangle(b[0], b[1], b[0] + b[2], b[1], b[0] + b[2] / 2, b[1] - b[5]);
  // 	}
  // }
}

setInterval(updateTimeLeft, 1000);
