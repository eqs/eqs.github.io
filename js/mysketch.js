
var BG_COLOR = 240;
var FPS = 30;

var nObjects = 10;
var rects = [];

var loopCount = 0;

function setup() {
    // https://nathan.exchange/posts/p5js-background-for-hugo/
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.class('backgroundsketch');

    frameRate(FPS);

    for (var k = 0; k < nObjects; k++) {
        var x = randomGaussian(0.0, windowWidth / 16.0);

        var halfh = windowHeight / 2.0;
        var interval = windowHeight / nObjects;
        var y = random(-halfh+interval*k, -halfh+interval*(k+1));

        rects.push(new Rect(x, y, interval*1.5));
    }

    background(BG_COLOR);
}

function draw() {
    background(BG_COLOR);
    translate(windowWidth / 2.0,  windowHeight / 2.0);

    for (var k = 0; k < rects.length; k++) {
        rects[k].run();
    }

    if (loopCount > FPS*5) {
        noLoop();
    }

    loopCount = loopCount + 1

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    for (var k = 0; k < rects.length; k++) {
        rects[k].init();
    }

    loopCount = 0;
    loop();
}


class Rect {
    constructor(x, y, r) {
        this.position = createVector(x, y);
        this.r = r;

        this.angle = random(TWO_PI);
        this.startAngle = this.angle;
        this.endAngle = this.startAngle + random(-4*PI, 4*PI)

        this.position.x += windowWidth / 2.0;
        this.borders();

        if (this.position.x >= 0)
            this.offset = createVector(windowWidth / 2.0, 0);
        else
            this.offset = createVector(-windowWidth / 2.0, 0);

        this.endPosition = this.position.copy();
        this.startPosition = p5.Vector.add(this.position, this.offset);
        this.position = this.startPosition.copy();

        this.lr = random(0.01, 0.1);
    }

    init() {
        this.angle = random(TWO_PI);
        this.startAngle = this.angle;
        this.endAngle = this.startAngle + random(-4*PI, 4*PI)

        this.endPosition = createVector(randomGaussian(0.0, windowWidth / 2.0),
                                        randomGaussian(0.0, windowHeight / 2.0));
    }

    run() {
        this.update();
        this.render();
    }

    update() {
        this.position = p5.Vector.lerp(this.position, this.endPosition, this.lr);
        this.angle = lerp(this.angle, this.endAngle, this.lr);
    }

    borders() {
        if (this.position.x < -windowWidth/2.0)
            this.position.x += windowWidth;

        if (this.position.y < -windowHeight/2.0)
            this.position.y += windowHeight;

        if (this.position.x > windowWidth/2.0)
            this.position.x -= windowWidth;

        if (this.position.y > windowHeight/2.0)
            this.position.y -= windowHeight;
    }

    render() {
        rectMode(CENTER);
        noFill();
        stroke(BG_COLOR*0.9);

        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        rect(0, 0, this.r, this.r);
        pop();
    }
}

