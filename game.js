let mapY = 240; //Yposition of everything in the map
let mapX = 300; //Xposition of everything in the map
let gameRunning = true; //medans man kör är denna true.

let playerRadius = 15; //used late for detecting collision

let walls = []; //array for all the walls

function setup() 
{
  createCanvas(600, 480);

  walls.push({ x: 100, y: 0, w: 200, h: 120 });
}

function player()
{
  fill(0);
  ellipse(300, 240, playerRadius * 2, playerRadius * 2);
}

function drawMap(x, y)
{
  fill (50);
  for (let wall of walls)
  {
    rect(x + wall.x, y + wall.y, wall.w, wall.h);
  }
}

function draw()
{
  background(100);
  
  let moveX = 0;
  let moveY = 0;
  
  drawMap(mapX, mapY);
  player();

  //key input for movement
  if (keyIsDown(87)) moveY += 4; //"W" key moves the map up
  if (keyIsDown(65)) moveX += 4; //"A" key moves the map left
  if (keyIsDown(83)) moveY -= 4; //"S" key moves the map down
  if (keyIsDown(68)) moveX -= 4; //"D" key moves the map right

  //allows the player to move if theres no collision
  if (!isColliding(moveX, moveY)) {
    mapX += moveX;
    mapY += moveY;
  }


}

//function to check collision with all walls whenever the player moves
function isColliding(moveX, moveY) {
  let playerX = 300;
  let playerY = 240;

  //triggers once for every wall, checks every wall of the map for collision with the player
  for (let wall of walls) {
    //calculate the wall's new position after movement
    let newWallX = mapX + moveX + wall.x;
    let newWallY = mapY + moveY + wall.y;

    //check collision with this wall
    let closestX = constrain(playerX, newWallX, newWallX + wall.w);
    let closestY = constrain(playerY, newWallY, newWallY + wall.h);

    let distanceX = playerX - closestX;
    let distanceY = playerY - closestY;

    if (sqrt(distanceX * distanceX + distanceY * distanceY) < playerRadius) {
      return true; //collision detected
    }
  }

  return false; //no collision with any wall
}