var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImage
var restart,restartImage
var runner;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var coin,coinGroup;

var score
var count


function preload(){
  cubeImage = loadImage("Cube.png");
  groundImage = loadImage("ground2.png");
  
  coinImage = loadImage("Coin.png")

  obstacleImage = loadImage("cone.png");
  cloudImage = loadImage("cloud.png");
  
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  
  
}

function setup() {
  createCanvas(600, 200);
  
  runner = createSprite(50,180,50,50);
  runner.addImage("runner",cubeImage);
  runner.scale = 0.1;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  coinGroup = new Group();
  
  score = 0;
  
   
  gameOver = createSprite(300,50);
  restart = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  restart.addImage(restartImage);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;


}

function draw() {
  background(300);
  
  if(gameState === PLAY){
     ground.velocityX = -4;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && runner.y>150) {
      runner.velocityY = -12;
    }
    if(score==1000){
      gameState=END;
    }
    

    runner.velocityY = runner.velocityY + 0.8
    
    spawnClouds();
    spawnObstacles();
    coins();
    
   
    
    
    if(obstaclesGroup.isTouching(runner)){
      count++;
    }
  }

  
  
     
   else if(gameState === END) {
    ground.velocityX = 0;
    //set velcity of each game object to 0
    runner.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    gameOver.visible = true;
    restart.visible = true;
    
    
    if(mousePressedOver(restart)) {
    reset();
   }
    }
  
  text("Score: "+ score, 500,50);
 
  
  if(coinGroup.isTouching(runner)){
    score++;
  }
  
  
  
  
  runner.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = runner.depth;
    runner.depth = runner.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % (100) === 0) {
    var obstacle = createSprite(600,165,10,60);
    
    obstacle.addImage("obstacle",obstacleImage);
    //generate random obstacles
    obstacle.scale = 0.15;
    obstacle.velocityX = -8;
    }
    
    //assign scale and lifetime to the obstacle           
  
    
    //add each obstacle to the group
   
  }


function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
 
  
  score = 0;
  
}

function coins(){
  if (frameCount % 60 === 0) {
    var coin = createSprite(600,120,20,20);
    coin.y = Math.round(random(100,180));
    coin.addImage("coin",coinImage)
    coin.scale=0.1;
    coin.velocityX = -6;
    
     //assign lifetime to the variable
    coin.lifetime = 200;
    
    //adjust the depth
    
    
    //add each cloud to the group
    coinGroup.add(coin);
  }
  

}
