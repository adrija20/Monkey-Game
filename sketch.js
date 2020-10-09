var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime=0;
var score=0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
 
}



function setup() {
 createCanvas(600,500); 
  monkey=createSprite(80,310,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
 ground=createSprite(400,350,10000,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
monkey.debug = false;
  

  
}


function draw() {
  background("#b3e6ff");
if(gameState===PLAY){
  if (keyDown("space")&& monkey.y>=200) {
      monkey.velocityY = -10;
}

  monkey.velocityY = monkey.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
}
  monkey.collide(ground);
  stroke("green");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+ survivalTime,100,50);
  stroke("green");
  textSize(20);
  fill("yellow");
  text("Score:"+score,450,50)
if(FoodGroup.isTouching(monkey)){
  score=score+2;
  FoodGroup.destroyEach();
}
  if(monkey.collide(obstacleGroup)){
  gameState=END;
  }
food();
obstacle();
}
else if(gameState===END){
obstacleGroup.destroyEach();
FoodGroup.destroyEach(); 
  background("black");
  stroke("white");
  fill("red");
  textSize(50);
  text("GAME OVER!!!!",100,250);
 
  
}
  if(keyDown("r")&&gameState===END){
 reset();   
  }
  
drawSprites();
}



function food(){
  if(frameCount%80===0){
  banana=createSprite(600,210,10,10);
  banana.addImage("food",bananaImage);
    banana.scale=0.09;
  banana.y=Math.round(random(120,210));
    banana.velocityX = -6;
    banana.lifeTime=50;
    FoodGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}
function obstacle(){
  if(frameCount%300===0){
  var obstacle=createSprite(600,320,10,10);
  obstacle.addImage("enemy",obstacleImage);
    obstacle.scale=0.09;
    obstacle.velocityX = -7;
    obstacle.lifeTime=50;
    obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}




