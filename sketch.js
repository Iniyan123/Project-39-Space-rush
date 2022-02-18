var rocket, rocketImg1, rocketImg2;
var asteroidImg,asteroidG;
var bg, bgImg;
var gameover, gameoveImg;
var restart, restartImg;
var gameState = 1;
var PLAY = 1;
var END = 0;
var score = 0;

function preload() {
  rocketImg1 = loadImage("rocket.png");
  rocketImg2 = loadImage("blast.png");
  asteroidImg = loadImage("asteroid.png");
  bgImg = loadImage("space.png");
  gameoverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");

}

function setup() {
  createCanvas(600,600);
  bg = createSprite(250,300,20,20);
  bg.addImage(bgImg);
  bg.scale = 3;
  bg.velocityY = 3;
  
  rocket = createSprite(250,500,20,20);
  rocket.addImage(rocketImg1);
  
  gameover = createSprite(300,300,20,20);
  gameover.addImage(gameoverImg);
  gameover.visible = false;
  
  restart = createSprite(300,380,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.8;
  restart.visible = false;
  
  asteroidG = new Group();
  
  score = 0;
}

function draw() {
  background("black");
  
    
  if(gameState === PLAY){
  rocket.x = World.mouseX
  if(bg.y > 600){
    bg.y = bg.height/2;
  }
  score = score + Math.round(getFrameRate()/60);
  spawnAsteroids();
  //rocket.debug = true;
  rocket.setCollider("rectangle",0,0,60,120);
    if(rocket.isTouching(asteroidG)){
      gameState = END;
      rocket.addImage(rocketImg2);
    }
  }
  else if(gameState === END){
    gameover.visible = true;
    restart.visible = true;
    
    bg.velocityY = 0;
    
    asteroidG.setVelocityYEach(0);
    asteroidG.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      reset();
    }  
  }
 drawSprites();
  textSize(25)
  fill("white");
  text("Score: "+ score, 300,25);
}
function spawnAsteroids(){
  if(frameCount%100 === 0){
var asteroid = createSprite(Math.round(random(10,600)),0,20,20);
    asteroid.addImage(asteroidImg);
    asteroid.velocityY = 3;
    asteroid.setLifetime = 170;
    asteroid.scale = 0.8;
    asteroidG.add(asteroid)
    gameover.depth = asteroid.depth;
    gameover.depth = gameover.depth + 1;
    
    restart.depth = asteroid.depth;
    restart.depth = restart.depth + 1;
  }
}
function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  rocket.addImage(rocketImg1);
  asteroidG.destroyEach();
  bg.velocityY = 3;
  score = 0;
}