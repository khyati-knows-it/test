var goomba,goombaImg;
var gameState;
var PLAY=1,END=0;
var backGround,backGroundImg

var Boss,Boss2,Boss1
var BossGroup;

var bullet,bulletGroup,bulletImage;

function preload()
{
	backGroundImg=loadImage("Background.jpg");

  goombaImg=loadImage("goombWalk.png");
  bulletImage=loadImage("bullet.png");

  Boss1=loadImage("boss101.png");
  Boss2=loadImage("boss102.png");

  BossGroup=new Group();
  bulletGroup= new Group();

  gameState=PLAY;
}

function setup() {
	createCanvas(500,500);

  backGround=createSprite(250,250,500,500);
  backGround.addImage("backGround",backGroundImg);
  backGround.scale=1.6
  backGround.x=width/2;

  goomba=createSprite(260,455,27,69);
  goomba.addImage("goombaWalk",goombaImg);
  goomba.scale=0.3
  goomba.velocityX=-2;
	//Create the Bodies Here.
}


function draw() {
  
  background("yellow");
  drawSprites();
  text(mouseX+" "+mouseY,mouseX,mouseY);
  if(gameState===PLAY){
     backGround.velocityX=-1;

    if(goomba.x<50 || goomba.x>455){
      goomba.velocityX*=-1;
    }
    console.log(backGround.x); 

    if(backGround.x<50){
      //backGround.x=250
      backGround.x=backGround.width/2;
    }
    generateBosses();

    if(goomba.isTouching(BossGroup)){
      gameState=END;
    }
    if(keyDown("space")){
      generateBullets();
    }
    if(bulletGroup.isTouching(BossGroup)){
        BossGroup.destroyEach();
        bulletGroup.destroyEach();
        console.log("in if")
    }
  }
  if(gameState===END){
    gameOver();
  }
}

function generateBullets(){
  bullet=createSprite(goomba.x-20,goomba.y,5,15);
  bullet.addImage("bullet",bulletImage);
  bullet.scale=0.1;
  bullet.velocityY=-3;
  bulletGroup.add(bullet);
}
function generateBosses() {
  if(frameCount % 200===0) {
    Boss=createSprite(Math.round(random(20,400)),0,10,40);
    Boss.velocityY=1;
    var R=Math.round(random(1,2))
    switch(R){
      case 1:
        Boss.addImage("Boss1",Boss1)
       break;
      case 2:
        Boss.addImage("Boss2",Boss2)
        break;
      default:
        break;
    }
    Boss.scale=0.03
    BossGroup.add(Boss);
  }

}
function gameOver(){
  backGround.velocityX=0;
  goomba.velocityX=0;
  BossGroup.setVelocityYEach(0);
}


