// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine;
var world;
var boxes = [];
var ground;

function setup() {
    createCanvas(window.innerWidth * 0.5, window.innerHeight * 0.5);
    engine = Engine.create();
    world = engine.world;
    Runner.run(engine);
    ground = Bodies.rectangle(width / 2, height, width, 20, { isStatic: true });
    Composite.add(world, ground);
}

const colors = ["cyan", "magenta", "yellow"];

function mousePressed() {
    let newBox = new CustomBox(mouseX, mouseY, random(20, 100), random(20, 100), colors[Math.floor(random(0, colors.length))]);
    boxes.push(newBox);
}

function draw() {
    background(0);
    for (let customBox of boxes) {
        customBox.show();
    }
}

class CustomBox {
    constructor(x, y, width, height, color) {
        this.body = Bodies.rectangle(x, y, width, height, { friction: 0.5, restitution: 1, airFriction: 0 });
        this.width = width;
        this.height = height;
        this.color = color;
        Composite.add(world, this.body);
    }
    show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        fill(this.color);
        stroke(255);
        strokeWeight(2);
        rect(0, 0, this.width, this.height);
        pop();

    }
}