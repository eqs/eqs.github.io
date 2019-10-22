
var BG_COLOR = 240;

var boids = [];

function setup() {
    // https://nathan.exchange/posts/p5js-background-for-hugo/
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.class('backgroundsketch');

    createCanvas(windowWidth, windowHeight);

    for (var k = 0; k < 3; k++) {
        boids.push(new Boid());
    }

    background(BG_COLOR);
}

function draw() {
    background(BG_COLOR);

    for (var k = 0; k < boids.length; k++) {
        boids[k].run(boids)
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Boid {
    constructor() {
        this.pos = createVector(random(windowWidth, windowHeight));

        var angle = random(TWO_PI);
        this.vel = createVector(cos(angle), sin(angle));
        this.acc = createVector(0, 0);

        this.r = 8.0;
        this.maxSpeed = 2.0;
        this.maxForce = 0.03;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    run(boids) {
        this.flock(boids);

        this.update();
        this.borders();
        this.render();
    }

    flock(boids) {
        var coh = this.cohesion(boids);

        coh.mult(1.0);

        this.applyForce(coh);
    }

    // A meethod that calculates and applies a steering force towards a target
    seek(target) {
        // A vector pointing from the position to the target
        var desired = p5.Vector.sub(target, this.pos);
        desired.normalize();
        desired.mult(this.maxSpeed);

        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer
    }

    // Cohesion
    // For the average position of all nearby boids,
    // calculate steering vector towards that position
    cohesion(boids) {
        var neighbordist = 50;
        var count = 0;
        var sumVector = createVector(0, 0);

        boids.forEach(function (e, k) {
            var d = p5.Vector.dist(this.pos, boids[k].pos);
            if (0 < d && d < neighbordist) {
                sumVector.add(boids[k].pos);
                count++;
            }
        }, this);

        if (count > 0) {
            sumVector.div(count);
            return this.seek(sumVector);
        } else {
            return createVector(0, 0);
        }
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    borders() {
        if (this.pos.x < -this.r) this.pos.x = windowWidth + this.r;
        if (this.pos.y < -this.r) this.pos.y = windowHeight + this.r;
        if (this.pos.x > windowWidth+this.r) this.pos.x = -this.r;
        if (this.pos.y > windowHeight+this.r) this.pos.y = -this.r;
    }

    render() {
        // Compute the direction of velocity as angle (radians).
        var theta = this.vel.heading() + radians(90);

        fill(BG_COLOR * 0.95);
        noStroke();

        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        beginShape(TRIANGLES);
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape();
        pop();
    }
}
