var bg;
var score = 0; 
var laser ;
var asteroid;
var AlienSpaceship;
var playerSpaceship;
var asteroidGroup;
var alienGroup;
var laserGroup;

function preload(){
  bg = loadImage("backGround.png")
  earthsSpaceship = loadImage("earths-spaceship-better.png");
  asteroidImg = loadImage ("asteroid.png")
  AlienSpaceshipImg = loadImage("Alien-spaceship.png");
  laserImg = loadImage("laser.png");
  
}

function setup() {
 // background("red")
  createCanvas(1000,500);
  playerSpaceship = createSprite(70, 200, 50, 50);
  playerSpaceship.addImage(earthsSpaceship)
  playerSpaceship.scale = 0.5;

  asteroidGroup = createGroup();
  alienGroup = createGroup();

  laserGroup = createGroup();

}

function draw() {
  background(bg);
    
  if(keyDown("DOWN_ARROW")){
    playerSpaceship.y = playerSpaceship.y+10
  }

  if(keyDown("UP_ARROW")){
    playerSpaceship.y = playerSpaceship.y-10
  }
  if(keyDown("space")&& frameCount % 15 === 0 ){
    createLasers();
  }

 // if(asteroidGroup.isTouching(laserGroup)){
    //asteroidGroup.destroyEach();
    //laserGroup.destroyEach();
    getHitAsteroid();
  //  score = score+1;
 // }

  if(alienGroup.isTouching(laserGroup)){
    alienGroup.destroyEach();
    laserGroup.destroyEach();
    score = score+2;
  }


 spawnAstroids()
 spawnAlien()

drawSprites();
}

function spawnAstroids(){
if(frameCount % 140 === 0){
  asteroid = createSprite(1000,random(10,400));
  asteroid.addImage(asteroidImg)
  asteroid.scale = 0.3
  asteroid.velocityX = -6 
  asteroid.lifetime = 250
  asteroidGroup.add(asteroid);
}
}
//this function is creating lasers. Line 69 is creating the sprite and line 70 is adding the images 
function createLasers(){
  laser = createSprite(78,220,50,50)
  laser.addImage(laserImg)
  laser.y = playerSpaceship.y;
  laser.velocityX = 6
  laser.lifetime = 250;
  laser.scale = 0.3  
  laserGroup.add(laser)
}

function spawnAlien(){
  if(frameCount % 190 === 0){
  alien = createSprite(1000,random(10,400));
  alien.addImage(AlienSpaceshipImg);
  alien.scale = 0.1;
  alien.velocityX = -4;
  alien.lifetime = 250;
  alienGroup.add(alien);
  }
}

function  getHitAsteroid(){
  for (var i=0;i<asteroidGroup.length;i++){
    if(asteroidGroup.get(i).isTouching(laserGroup)){
      console.log(asteroidGroup.get(i));
      asteroidGroup.get(i).destroy();
      score = score+1;
    }

  }
}