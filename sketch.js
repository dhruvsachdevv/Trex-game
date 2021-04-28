var score=0
var trexc
var jumpSound
var gameoverSound
var gameove,gameoverimage
var restart,restartimage
var cloud,cloudimage
var play=1
var end=0
var gamestate=play
var cloudg
var obstacleg
var trex ,trex_running;
var ground,groundimage
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
groundimage=loadImage("ground2.png")
jumpSound=loadSound("smb_jump-super.wav")
gameoverSound=loadSound("smb_gameover.wav")
cloudimage=loadImage("cloud.png")
 obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexc=loadAnimation("trex_collided.png");
  restartimage=loadImage("download (1).jpg")
  gameoverimage=loadImage("gameOver.png")
}

function setup(){
  createCanvas(600,200)
  ground=createSprite(0,180,800,10)
  ground.addImage(groundimage)
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexc)
  trex.scale=0.7
  obstacleg=new Group()
  cloudg=new Group()
  trex.setCollider("circle",0,0,30)
  trex.debug=false
  restart=createSprite(300,100,20,20)
  restart.addImage(restartimage)
  restart.scale=0.2
  restart.visible=false
  gameover=createSprite(250,50,20,20)
  gameover.addImage(gameoverimage)
  gameover.visible=false
}

function draw(){
  background("red")
  drawSprites();
text("your score is "+score,500,30)
if(gamestate===play){
ground.velocityX=-6
  if(keyDown("space")&&trex.y>130){
    
    trex.velocityY=-21
 jumpSound.play()
  }
  trex.velocityY=trex.velocityY+2  
  
  if(ground.x<0){
  ground.x=ground.width/2  
    
  }
  clouds()
  spawnObstacles() 
  score=score+Math.round(getFrameRate()/60)
  if(trex.isTouching(obstacleg)){ 
  gamestate=end
  gameoverSound.play()
  }
  
}
  else if(gamestate===end){
    
  ground.velocityX=0
  trex.velocityY=0
  obstacleg.setVelocityXEach(0)
  cloudg.setVelocityXEach(0)
  obstacleg.setLifetimeEach(-1)
  cloudg.setLifetimeEach(-1)
  trex.changeAnimation("collided",trexc)
  gameover.visible=true
  restart.visible=true
  }
  if(mousePressedOver(restart)){
  reset()   
     
}
trex.collide(ground)
}

function clouds(){
  if(frameCount%60===0){
   
  cloud=createSprite(600,50,10,10)
  cloud.velocityX=-6
  cloud.addImage(cloudimage) 
  cloud.scale=random(0.5,1.2) 
  cloud.y=Math.round(random(20,100)) 
  cloud.depth=trex.depth
  trex.depth=trex.depth+2
  cloudg.add(cloud)
  cloud.lifetime=150
  }
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   //obstaclesGroup.add(obstacle);
   obstacleg.add(obstacle)
 }
}
function reset(){
gamestate=play
obstacleg.destroyEach() 
cloudg.destroyEach()
trex.changeAnimation("running", trex_running);
gameover.visible=false
restart.visible=false
}