var monkey, tiger, banana, monkeyImg, tigerImg, bananaImg, jungle, jungleImg, tigers, bananas, ground, restart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
  monkeyImg = loadImage("monkey.PNG");
  tigerImg = loadImage("tiger.PNG");
  bananaImg = loadImage("banana.png");
  
  jungleImg = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(800, 400);
  jungle = createSprite(200,200,1,1);
  jungle.addImage("jungle",jungleImg);
  
  monkey = createSprite(50,350,1,1);
  monkey.addImage("monkey",monkeyImg);
  monkey.scale = 0.1;
  
  ground = createSprite(200,398,400,5);
  ground.visible = false;
  
  restart = createSprite(200,200,50,50);
  restart.visible = false;
  
  bananas = new Group();
  tigers = new Group();
  
}

function draw() {
  background("white");
  drawSprites();
  
  monkey.collide(ground);
  
  if(gameState === PLAY){
    text("Score: " + score, 200,50);
    
  if(keyDown("space")){
    monkey.velocityY = -10;
  }
  
  if(monkey.isTouching(bananas)){
    bananas.destroyEach();
    monkey.scale = monkey.scale + 0.01;
    score = score + 10;
  }
  if(monkey.isTouching(tigers)){
    gameState = END;
    monkey.scale = 0.1;
  }
  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  spawnTiger();
  spawnBanana();
    
  }
  else if(gameState === END){
    tigers.destroyEach();
    bananas.destroyEach();
    monkey.scale = 0.1;
    
    restart.visible = true;
    if(mousePressedOver(restart)){
      gameState = PLAY;
      restart.visible = false;
    }
  }
  

}

function spawnTiger(){
  if(frameCount%120 == 0){
    tiger = createSprite(701,375,1,1);
    tiger.addImage("tiger",tigerImg);
    tiger.velocityX = -5;
    tiger.lifetime = 400;
    tiger.scale = 0.35;
    tigers.add(tiger);
  }
}

function spawnBanana(){
  if(frameCount%40 == 0){
    banana = createSprite(701,random(275,325),1,1);
    banana.addImage("banana", bananaImg);
    banana.velocityX = -3;
    banana.lifetime = 800;
    banana.scale = 0.05;
    bananas.add(banana);
  }
  
}