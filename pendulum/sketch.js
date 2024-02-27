// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine;
var world;
let suspensionBox;
let circleHanger;
var ground;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    suspensionBox = new StaticBox(200, 100, 20, 20);
    Runner.run(engine);
}

function draw() {
    background(220);
    suspensionBox.draw();
}

class StaticBox {
    constructor(x, y, width, height) {
        this.body = Bodies.rectangle(x, y, width, height, { isStatic: true });
        this.width = width;
        this.height = height;
        Composite.add(world, this.body)
    }
    draw() {
        push();
        rectMode(CENTER);
        noStroke();
        fill(0);
        translate(this.body.position.x, this.body.position.y)
        rect(0, 0, this.width, this.height);
        pop();
    }
}

class LineConstraint{
    constructor(){
        
    }
}