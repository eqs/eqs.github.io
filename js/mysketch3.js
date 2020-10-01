
var BG_COLOR = 240;
var FPS = 30;

var circles = [];
var colorList = [];

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.class('backgroundsketch');

    colorList = [color('#95ECD71E'),
                 color('#6BB8Fa1E'),
                 color('#EC889a1E'),
                 color('#FBC52a1E')]

    for (var k = 0; k < 32; k++) {
        circles.push(new Circle());
    }

    frameRate(FPS);
}

function draw() {
    background(BG_COLOR);
    translate(width / 2.0, height / 2.0);

    for (var k = 0; k < circles.length; k++) {
        if (circles[k].alive) {
            circles[k].draw();
        } else {
            initCircle(k);
        }
    }
}

function initCircle(k) {
    var rw = 50;
    var ri = (int(frameCount) % int(width * 0.6)) / rw;
    var r = random(ri * rw, (ri + 1) * rw);
    var a = random(TWO_PI);
    var x = r * cos(a);
    var y = r * sin(a);
    var p = createVector(x, y);
    circles[k].init(p);
}

function radius(t, r) {
    var f = r * (exp(-t) - exp(-3*t)) / (pow(3, -1.0/2.0) - pow(3, -3.0/2.0));
    return max(f, 0);

}
function drawShape(n, r) {
    beginShape();
    for (var k = 0; k < n; k++) {
        var t = k * TWO_PI / n;
        var x = r * cos(t);
        var y = r * sin(t);
        vertex(x, y);
    }
    endShape(CLOSE);
}

class Circle {
    constructor() {
        this.alive = false;
    }

    init(position) {
        this.position = position;
        this.lifetime = 0.0;
        this.timestep = random(0.025, 0.075);
        this.r = random(80, 100);
        this.alive = true;
        this.n = int(random(3, 8));
        this.rot = random(TWO_PI);
        this.pen = colorList[int(random(colorList.length))];
    }

    draw() {
        var s = radius(this.lifetime, this.r);

        noFill();
        stroke(this.pen);
        strokeWeight(4.0);

        push();
        translate(this.position.x, this.position.y);
        rotate(this.rot);
        if (this.n == 7) {
            ellipse(this.position.x, this.position.y, s, s);
        } else {
            drawShape(this.n, s);
        }
        pop();

        this.lifetime += this.timestep;

        if (this.lifetime >= 6.0) {
            this.alive = false;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    for (var k = 0; k < circles.length; k++) {
        initCircle(k);
    }
}
