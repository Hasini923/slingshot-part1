const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

var ball;
var world, engine;
var mConstraint;
var slingshot;
var bgImg;
var ballImg;
var ground;
var box;
var boxImg;

function preload() {
  ballImg = loadImage("ball.png");
  bgImg = loadImage("bg.png");
boxImg = loadImage("box.png");
}

function setup() {
  createCanvas(800,400);
 
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height - 10, width, 20);
  
    box = new Box(450, 300, 75, 84, 100);
  
  ball = new Ball(150, 300, 25);

  slingshot = new SlingShot(150, 300, ball.body);

  const mouse = Mouse.create(canvas.elt);
  var options = {
    mouse: mouse,
  }
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, Constraint);
}

function draw() {
  background(bgImg);
  
  Matter.Engine.update(engine);

  ground.display();
    box.display();
  slingshot.display();
  ball.display();

  drawSprites();
}


function mouseDragged() {
  Matter.Body.setPosition(ball.body,{x:mouseX,y:mouseY});
}

function mouseReleased() {
  slingshot.fly()
}