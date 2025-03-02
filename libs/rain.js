let canvas = document.getElementsByClassName('rain')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

function randomNum(max, min) {
  return Math.floor(Math.random() * max) + min;
}

function RainDrops(x, y, endy, velocity, opacity) {

  this.x = x;
  this.y = y;
  this.endy = endy;
  this.velocity = velocity;
  this.opacity = opacity;

  this.draw = function() {
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x, this.y - this.endy);
    c.lineWidth = 1.5;

    // Gradient for yellow-red rain
    let gradient = c.createLinearGradient(this.x, this.y, this.x, this.y - this.endy);
    gradient.addColorStop(0, "rgba(255, 255, 0, " + this.opacity + ")");  // Yellow at the top
    gradient.addColorStop(1, "rgba(255, 0, 0, " + this.opacity + ")");    // Red at the bottom

    c.strokeStyle = gradient;
    c.stroke();
  }

  this.update = function() {
    let rainEnd = window.innerHeight + 100;
    if (this.y >= rainEnd) {
      this.y = this.endy - 100;
    } else {
      this.y = this.y + this.velocity;
    }
    this.draw();
  }

}

let rainArray = [];

for (let i = 0; i < 140; i++) {
  let rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
  let rainYLocation = Math.random() * -500;
  let randomRainHeight = randomNum(30, 10);
  let randomSpeed = randomNum(20, .2);
  let randomOpacity = Math.random() * .55;
  rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
}

function animateRain() {

  requestAnimationFrame(animateRain);
  c.clearRect(0,0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < rainArray.length; i++) {
    rainArray[i].update();
  }

}

animateRain();

