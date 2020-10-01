
var BG_COLOR = 240;
var FPS = 30;

var N = 5;

var cnt = 0;

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.class('backgroundsketch');

    frameRate(FPS);
    background(BG_COLOR);

    cnt = 0;
}

function draw() {
    translate(width / 2.0, height / 2.0);
    rotate(radians(cnt * 2.0));
    scale(2, 2);

    if (cnt < 360) {
        var r = windowHeight / 8.0 + 10 * sin(radians(cnt * 8.0)) + cnt * 0.25;
        noFill();
        stroke(128, 4);
        strokeWeight(5.0);

        drawShape(N, r);
    } else {
        noLoop();
    }

    cnt = cnt + 1;
}

function drawShape(n, r) {
    beginShape();
    for (var k = 0; k < n; k++) {
        var t = k * TWO_PI / N;
        var x = r * cos(t);
        var y = r * sin(t);
        vertex(x, y);
    }
    endShape(CLOSE);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    loop();
    cnt = 0;
}
